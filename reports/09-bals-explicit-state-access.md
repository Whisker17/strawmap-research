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

## 深入机制拆解
### EIP-7928：把 state access 从隐式执行路径变成 block artifact
- BAL 的核心不是“交易自带 access list”，而是 block producer 对整个 block 触达账户、storage slot、code 和 balance 的声明，并由 header commitment 绑定。
- 验证者仍会执行 block，但可以在执行前知道访问面，提前做 state prefetch、disk scheduling、parallel worker partition 和 witness planning。
- 如果 producer 提供的 BAL 与执行实际访问不一致，block 无效；因此 BAL 是 consensus-critical metadata，不是 RPC 便利索引。

### BAL transport / healing：为什么配套 EIP 很重要
- EIP-8159 处理的是 BAL 如何通过 p2p 获取，否则 header committed 但节点拿不到 BAL，会把 sync/healing 卡在外部数据路径上。
- EIP-8189 把 snap healing 从逐 trie node 追索转向利用 block-level diff，目标是减少“我知道缺状态但不知道该向谁要什么”的恢复成本。
- EIP-8268 补充 storage root 信息，是为了让状态重建和 verification 更完整，尤其对 proof-heavy execution 和 external prover 更重要。

### BAL repricing：metadata 也会成为资源
- 一旦 BAL 成为必需数据，它本身就可能被滥用成 cheap-byte channel，尤其在 gas limit 上升后更明显。
- EIP-8279 将 BAL bytes 纳入 runtime metering/floor accumulator，是为了避免应用把数据从 tx calldata 挪到 BAL 相关路径规避 byte floors。
- 这意味着 BAL 不只是性能优化，也会改变合约访问模式、state-heavy workload 和 prover witness 成本的度量方式。

## 当前瓶颈
- 隐式访问：客户端执行到某条 opcode 时才知道要读哪个 account/slot，I/O 和 witness 无法提前排程。
- 并行困难：没有 block-level dependency map 时，交易间读写冲突只能边执行边发现，worker 利用率不稳定。
- Proof 输入不稳定：prover 需要完整 state/witness，但当前路径更像 execution side effect，不是标准化输入。
- Sync/healing 粗糙：缺状态时常要向 trie 层逐步追索，恢复路径慢且难以验证完整性。

## 优化机制
- EIP-7928 提供 header-committed BAL，让 block 的 state footprint 成为可验证对象。
- EIP-8159 提供网络获取路径，避免 BAL 只存在于 proposer/client 本地。
- EIP-8189 和 EIP-8268 把 BAL 用在 state healing 与重建上，让 sync/prover/RPC 都能复用同一访问面。
- EIP-8279 给 BAL bytes 定价，避免 BAL 成为扩容后的新攻击面。

## 未来效果
- 执行客户端：更稳定地预取状态、拆分并行任务、压缩 state root critical path。
- Prover：可提前生成 witness manifest，减少证明前“重新发现访问面”的工作。
- RPC/indexer：可基于 block-level diff 改善状态重建与可验证服务。
- Protocol：为 mandatory proofs、Block-in-Blobs 和 partial statelessness 提供 state-availability plumbing。

## 依赖与先后关系
EIP-7928 作为 Glamsterdam scheduled item 是基础；EIP-8159 和 EIP-8189 已进入 Glamsterdam CFI networking；EIP-7862/8279/8268 是后续配套。EIP-8279 依赖 EIP-7928，proof-heavy execution / EIP-8142 也依赖 BAL availability。[EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8142](https://eips.ethereum.org/EIPS/eip-8142)

## 风险与未决问题
风险包括 phantom storage reads griefing、BAL size propagation、validation overhead、cheap-byte bypass、以及应用对 gas repricing 的敏感性。BALs 不是无成本 metadata，它会成为新的网络与定价对象。

## 对 Mantle 的影响
- Prover pipeline：Mantle 可以提前抽象 `state access manifest`，把 witness planning 从 prover 内部细节提升为可观测 artifact。
- 成本分析：用 BAL-like profiling 识别高 storage slot churn、高 account touch、高 cold-access 的 workload，提前评估 byte/state repricing 冲击。
- DA/derivation：如果未来 L1 proof-heavy execution 要求 payload 与 BAL availability，Mantle 的 derivation pipeline 也需要明确哪些数据必须可重放。
- 生态沟通：BALs 应被解释成“让高吞吐和证明更可验证的底层结构”，而不是直接降低用户 gas 的功能。

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
