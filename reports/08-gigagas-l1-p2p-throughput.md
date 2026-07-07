# 08 Gigagas L1：Gas Limit 与 P2P Throughput

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
gigagas L1、1 Ggas/sec、gas limit increases / EIP-7938、EIP-7935/7783/7790、ethp2p broadcast/unification、sharded mempool、EIP-8077、EIP-8094、worst-case block propagation。

## 一页结论
Gigagas L1 不是“把 gas limit 调大”这么简单。真正路线是 execution parallelism、BALs、repricing、p2p broadcast、blobpool/mempool 优化一起推进。EIP-7935 已 Final，并把 Fusaka 默认 gas limit 目标推进到 60M；EIP-7938 当前应写作 Stagnant；7783/7790 也不能与已落地的 7935 并列成同一现实策略。对 Mantle 来说，这影响 L1 settlement/calldata fallback 成本，但不能被当作“L1 永远便宜”。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| Gas limit increases / EIP-7938 | capacity 受 gas limit 与 client coordination 限制 | client-default exponential voting，不是 consensus enforcement。[EIP-7938](https://eips.ethereum.org/EIPS/eip-7938) | 理论上提高 L1 capacity；当前 Stagnant，不能当 active plan |
| EIP-7935 | 直接上调 gas limit 有 client bug / worst-case 风险 | Final：建议 Fusaka 后 execution clients 默认 gas limit 为 60M。[EIP-7935](https://eips.ethereum.org/EIPS/eip-7935) | 60M 成为现实基线，但仍依赖 client defaults 和监控 |
| ethp2p broadcast | generic gossip 难以支撑大 payload | object-specific / erasure-coded broadcast。[ethp2p](https://github.com/ethp2p/ethp2p) | 大对象传播更高效，支撑 bigger blocks/blobs |
| Sharded mempool | tx/blobpool 传播和 fetch 冗余高 | EIP-8077 用 source/nonce hints 减少无效 fetch；EIP-8094 用 sidecar 分离和 versioned-hash 拉取让 blob tx RBF 更便宜。[EIP-8077](https://eips.ethereum.org/EIPS/eip-8077), [EIP-8094](https://eips.ethereum.org/EIPS/eip-8094) | 降低无效 fetch 与带宽浪费；sampling 属于 EIP-8070，不属于 EIP-8094 |
| Repricing companion | gas limit 上升会放大 cheap bytes/state attack | calldata/BAL/state repricing 与 worst-case block 分析。[state growth](https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476) | 让 gas growth 不等于无约束 state/byte growth |

## 深入机制拆解
### Gas limit：从“投票参数”到“可安全承载的执行 envelope”
- EIP-7935 的实际动作很窄：它不是新增共识规则，而是要求 execution clients 把默认 gas limit 目标改成 60M，并把 devnet/client-health 测试作为安全前提。
- EIP-7938 的想法更激进：让客户端默认投票按指数曲线上调 gas limit，四年内达到 100x 量级；但它当前是 Stagnant，因此更适合作为 Strawmap 的 north-star，而不是 Mantle 成本模型里的已承诺参数。
- gas limit 增长只扩大执行 envelope，不会自动解决 disk I/O、state root、mempool、block propagation 和 worst-case calldata 的上界问题。

### Gigagas benchmark：为什么不能直接等同于主网吞吐
- 10 Ggas/s 研究结果依赖预加载 state、预恢复 sender、并行 execution、跳过 state root 等实验条件，证明的是“局部执行核可以更快”，不是端到端 L1 可以马上达到同等吞吐。
- 真正主网瓶颈是最长 critical path：交易解码、signature recovery、state read、same-slot write conflict、receipt/log generation、state root、payload propagation 都可能重新成为瓶颈。
- 因此 gigagas 路线必须和 BALs、state-root optimization、p2p broadcast、resource repricing 同步推进。

### P2P 与 mempool：大区块时代的传播预算
- 当 block/payload/blob 变大时，节点不只需要“下载更多 bytes”，还需要更少的重复 fetch、更明确的对象边界和更早的 missing-data detection。
- EIP-8077 用 source 与 nonce hint 减少无效交易拉取；EIP-8094 把 blob transaction 的 sidecar 与 versioned hash 拉取拆开，避免 RBF 时反复传播大对象。
- ethp2p 的 object-specific broadcast/erasure-coded 思路，是为更大对象传播设计的网络层前置条件；否则 gas limit 上调可能被 CL gossip limit 或弱节点传播延迟反向约束。

## 当前瓶颈
- CPU：EVM execution 可并行化的部分受交易依赖、same-slot writes 和 signature/recovery pipeline 限制。
- I/O：state access 仍然隐藏在执行过程中，没有 BALs 时客户端很难提前安排读盘和 witness。
- 网络：大 payload 需要在 slot deadline 内广播、验证和重构，generic gossip 容易出现重复 fetch 和尾延迟。
- 资源定价：cheap bytes、cheap state creation、BAL bytes 若不 repricing，会把更高 gas limit 变成攻击预算。

## 优化机制
- BALs 把 block 内 state access 外显化，让节点可提前 prefetch、分配 worker、准备 proof/witness。
- Parallel execution 把可独立交易从单线程 critical path 中拆出来，但仍需要 conflict detection 和 deterministic merge。
- ethp2p、EIP-8077、EIP-8094 降低 payload/tx/blob 传播冗余，避免网络成为更高 gas 的第一瓶颈。
- Repricing 用 byte floors、state access floors、BAL-byte floors 控制 worst-case block，不让扩容变成 cheap-resource subsidy。

## 未来效果
- 现实近端：60M gas limit 让 L1 execution capacity 有可观增量，但仍需以 client health、propagation 和 worst-case block 为边界。
- 中期：BALs + p2p/mempool 优化让更高 gas limit 的安全余量变大，L2 batch/settlement 在拥堵期的尾部成本可能下降。
- 远期：gigagas 目标若成立，L1 可以承载更多 direct execution 和 forced-inclusion 流量，但成本结构会被 repricing 重塑。
- 对用户侧：不应预期所有 L1 操作线性变便宜，因为 bytes/state 相关资源可能被重新定价。

## 依赖与先后关系
先 repricing/BAL/p2p，再安全提高 gas limit。PeerDAS/Blob propagation 解决 DA，大 gas 解决 execution envelope，二者互补。EIP-7938 当前 Stagnant，需要附录 A 标注。

## 风险与未决问题
worst-case block 可接近 gossip ceiling；state growth 可能不可持续；RBF/nonce/mempool metadata 改动影响客户端策略；ethp2p 仍是研究/实现栈而非单一 EIP。

## 对 Mantle 的影响
- 成本模型：Mantle 的 batch posting、settlement、forced inclusion 和 emergency fallback 需要同时模拟 gas-limit growth 与 calldata/blob/state repricing。
- 产品叙事：不要把 gigagas 写成“L1 永久便宜”的假设；它更像容量上限提高，具体费率仍由竞争和 repricing 决定。
- 运维策略：即使 L1 capacity 增长，Mantle 仍应保留 blob、calldata、DA bridge 等多路径，以防单一路径在某次 fork 后成本结构变化。
- 用户预期：如果 L1 拥堵缓解但 byte floors 提高，bridge/withdraw/settlement 费用可能出现非直觉变化，需要提前做 fee explainability。

## 建议 Mantle 关注
- 不把 gigagas 写成产品费率假设。
- 在 fee model 中同时模拟 gas-limit growth 与 repricing。
- 跟踪 OP Stack blob/calldata fallback 在高 L1 capacity 与高 byte floors 下的成本。
- 监控 ethp2p/EIP-8077/EIP-8094 对 forced inclusion 和 batcher propagation 的影响。

## Sources
- https://ethresear.ch/t/achieving-10gigagas-s-evm-execution-with-bal-and-parallel-execution/23632
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-7935
- https://github.com/ethp2p/ethp2p
- https://eips.ethereum.org/EIPS/eip-8077
- https://eips.ethereum.org/EIPS/eip-8094
- https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476
- https://ethresear.ch/t/worst-case-block-size-and-calldata-repricing-for-glamsterdam/23895
- https://specs.optimism.io/protocol/configurability.html
