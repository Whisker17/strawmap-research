# 09 BALs：显式 State Access 与 Block-Level Access Lists

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
BALs / EIP-7928、block-level access lists、Glamsterdam execution headliner、EIP-8159 BAL transport、EIP-8189 snap/2 healing、EIP-7862 state root、EIP-8279 BAL-byte repricing、EIP-8268 storage roots。

## 一页结论
BALs 解决的是“执行前不知道会读写哪些状态”的隐藏瓶颈。EIP-7928 把 block 内触达的账户与 storage slots 变成 header-committed 数据结构，让 client 能提前读盘、并行验证、重建 state diff、改进 healing。它不是直接提高 gas 的魔法，但它是高 gas、proof-heavy execution、state sync 的基础 plumbing。对 Mantle 来说，BALs 最重要的价值是 prover witness planning 和状态访问 profiling。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| EIP-7928 BALs | state access 隐藏在执行里，客户端无法提前并行 I/O | block header 承诺 `block_access_list_hash`，EL 验证生成 BAL 与提供 BAL 完全一致。[EIP-7928](https://eips.ethereum.org/EIPS/eip-7928) | 预取状态、并行验证、state-root 计算和 sync/healing 更容易 |
| EIP-8159 | BAL 不在 block body 中时需要 p2p 交换 | eth/71 增加 BAL exchange。[EIP-8159](https://eips.ethereum.org/EIPS/eip-8159) | sync 节点可独立获取 BAL |
| EIP-8189 | snap healing 逐 trie node 请求效率低 | 用 BAL-driven state diffs 改进 healing。[EIP-8189](https://eips.ethereum.org/EIPS/eip-8189) | 状态恢复更直接 |
| EIP-7862 | BAL 只暴露访问，不自动解决 same-slot state-root critical path | 用 BAL 数据移动/加速 state-root computation。[EIP-7862](https://eips.ethereum.org/EIPS/eip-7862) | 执行/验证 critical path 更短 |
| EIP-8279 | BAL bytes 可能绕过 tx-content byte floors | runtime metering BAL bytes 并纳入 floor accumulator。[EIP-8279](https://eips.ethereum.org/EIPS/eip-8279) | 避免 BAL 变成新 cheap-byte channel |
| EIP-8268 | 部分状态节点需要 post-block storage roots | 给 BAL 增加 per-account storage root 信息。[EIP-8268](https://eips.ethereum.org/EIPS/eip-8268) | 更完整的 state reconstruction / verification |

## 当前瓶颈
执行客户端今天常在执行过程中才发现需要哪些 state，导致 disk reads、prefetch、parallel execution 和 root computation 很难提前安排。对高 gas block、proof-heavy execution、statelessness 来说，这个隐藏访问面会成为瓶颈。

## 优化机制
BAL 把访问列表提升到 block 级别，并由 header commitment 绑定。节点可以在执行前拿到访问面，在执行后检查准确性。BAL transport/healing/repricing/storage-root extensions 构成一个小生态，而不是单个 EIP 孤立运行。

## 未来效果
客户端可更好并行读盘、验证和重建状态；proof systems 可用 BAL 预先规划 witnesses；sync/healing 可从 trie-node hunting 走向 block diff。BALs 也是 mandatory proof/BiB 的前提之一，因为 proof-heavy validation 不再默认每个 validator 重执行得到这些数据。

## 依赖与先后关系
EIP-7928 作为 Glamsterdam scheduled item 是基础；EIP-8159 和 EIP-8189 已进入 Glamsterdam CFI networking；EIP-7862/8279/8268 是后续配套。EIP-8279 依赖 EIP-7928，proof-heavy execution / EIP-8142 也依赖 BAL availability。[EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8142](https://eips.ethereum.org/EIPS/eip-8142)

## 风险与未决问题
风险包括 phantom storage reads griefing、BAL size propagation、validation overhead、cheap-byte bypass、以及应用对 gas repricing 的敏感性。BALs 不是无成本 metadata，它会成为新的网络与定价对象。

## 对 Mantle 的影响
Mantle prover 可以用 BAL-like state access profile 提前构建 witness；L2 workload profiling 可用它理解高 storage workload；未来若 L1/rollup proof interface 标准化，BAL/payload 分离 transport 可能成为 Mantle prover/derivation pipeline 的兼容点。

## 建议 Mantle 关注
- 在 prover pipeline 中预留 explicit state access list / witness manifest 抽象。
- 对 Mantle workloads 做 state access profiling，评估未来 EIP-8038/8279 成本冲击。
- 关注 BAL transport 与 Block-in-Blobs 的接口变化。
- 防止把 BALs 误解为直接扩容，而应定位为扩容 plumbing。

## Sources
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8159
- https://eips.ethereum.org/EIPS/eip-8189
- https://eips.ethereum.org/EIPS/eip-7862
- https://eips.ethereum.org/EIPS/eip-8279
- https://eips.ethereum.org/EIPS/eip-8268
- https://eips.ethereum.org/EIPS/eip-8142
