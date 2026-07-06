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

## 当前瓶颈
执行吞吐受 CPU、I/O、state access、最长交易 critical path、block propagation、CL gossip size、mempool fetch 效率共同限制。单独增加 gas limit 会把系统推向 worst-case block、state bloat 和 propagation failure。

## 优化机制
技术上需要 BALs 暴露 state access、parallel execution 提高 CPU 利用、ethp2p/8077/8094 提升网络传播、repricing 控制 worst-case bytes/state。EIP-7935 给出了 60M 现实基线；EIP-7938 若未来复活，也只是 client voting path，不是协议强制 capacity guarantee。10 Ggas/s 研究帖里的数字应加 caveat：它是预加载 state、预恢复 sender、跳过 state root 等实验条件下的纯执行上界，不是主网端到端吞吐承诺。

## 未来效果
成熟后，L1 可支持更大 block 和更高 gas throughput，L2 fallback、settlement、forced inclusion 成本可能下降。但 gigagas 数字应视为实验/benchmark north-star，不是主网参数承诺。

## 依赖与先后关系
先 repricing/BAL/p2p，再安全提高 gas limit。PeerDAS/Blob propagation 解决 DA，大 gas 解决 execution envelope，二者互补。EIP-7938 当前 Stagnant，需要附录 A 标注。

## 风险与未决问题
worst-case block 可接近 gossip ceiling；state growth 可能不可持续；RBF/nonce/mempool metadata 改动影响客户端策略；ethp2p 仍是研究/实现栈而非单一 EIP。

## 对 Mantle 的影响
L1 capacity 提升可能降低 fallback 和 settlement 成本，但 Mantle 仍应保留外部 DA/Blob/Calldata 多路径。若 L1 congestion 缓解，用户可能预期更低 bridging/settlement fee；若 repricing 同时提高 bytes/state 成本，实际成本可能不降反升。

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
