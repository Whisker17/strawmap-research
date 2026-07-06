# 12 State Growth、Statelessness 与 Purges

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
validity-only partial statelessness / VOPS、decentralized state、endgame state、hyper-scaling state、new state forms、Pureth purges、partial binary tree、Verkle vs binary tree、state expiry、history/state purges。

## 一页结论
State 是扩容路线里最难的一层：DA 有 blobs/PeerDAS，execution 有 proofs/BALs，但 state 没有单一 magic bullet。路线更可能是 partial statelessness、tiered state、新 state forms、expiry/purge、binary-tree/PQ-friendly commitments、verifiable RPC 的组合。Fable 对 Verkle/binary 的修正成立：EIP-6800 Verkle 现为 Stagnant，EIP-7864 unified binary tree 是更活跃的 Draft 方向；ethereum.org Verkle 页面若继续被引用，应标注它滞后于当前研究/fork meta。对 Mantle 来说，重点是 RPC/archive/witness/prover input 可用性，而不是“L1 stateless 后 L2 就轻松了”。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| VOPS | weak statelessness 会破坏 public mempool validity | 保留足够账户状态验证 pending tx。[VOPS](https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236) | 降低本地状态，同时保留 censorship-resistance/mempool health |
| Hyper-scaling state | state growth 没有 DAS/ZK 式单解 | permanent/temporary/UTXO-like/tiered state。[hyper-scaling state](https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052) | 不同状态资源不同价格和可用性 |
| State expiry | absent-state proof / resurrection 难 | leaf expiry 仍是研究方向；EIP-7736 依赖 Verkle 且当前 Stagnant。[EIP-7736](https://eips.ethereum.org/EIPS/eip-7736) | 可删除旧 state，但需证明/恢复机制 |
| Binary tree direction | Verkle witness 小但 curve-based；binary 更 PQ-friendly | EIP-6800 Verkle 已 Stagnant；EIP-7864 unified binary tree 是活跃 Draft，方向性更强。[EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) | PQ-friendly state commitment 的确定性上升，但迁移路径仍未定 |
| Pureth / purges | RPC/data correctness 和 historical bloat 是不同问题 | EIP-7919 是 Pureth Meta 且当前 Stagnant；purge 处理 history/state/feature bloat。[EIP-7919](https://eips.ethereum.org/EIPS/eip-7919), [The Purge](https://vitalik.eth.limo/general/2024/10/26/futures5.html) | 降低 RPC trust 与客户端负担，但不是单一 state-expiry 功能 |
| Partial binary tree | exact label 非 canonical | 映射到 unified binary tree / binary Merkle tree。[EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) | 作为 PQ-friendly state commitment 方向 caveat |

## 当前瓶颈
全状态存储、历史数据、RPC correctness、witness generation、proof of inexistence、mempool validation 都相互耦合。删除状态容易，安全恢复和验证“不存在”很难。

## 优化机制
VOPS 走 partial state retention；hyper-scaling state 走资源分层；state commitment 方向从 Verkle 明显转向 binary/hash-based；Pureth 改 verifiable data access；Purge 做历史/状态/功能复杂度清理。

## 未来效果
节点负担下降，轻客户端/RPC trust 降低，state access 更可证明。但 RPC、archive、state provider、Portal/witness 服务会变得更关键，L2/prover 也更依赖可重放输入。

## 依赖与先后关系
BALs 和 Block-in-Blobs 为 proof-heavy execution 的 state/payload 可用性打基础；state expiry 依赖 commitment structure；Pureth 与 state expiry 不同，应放在 verifiable data/RPC 轨道。

## 风险与未决问题
Strong statelessness 不是当前官方预期；EIP-6800/7736/7919/7503 均为 Stagnant，应避免写成活跃工作流；`Pureth purges` 在 Strawmap 链接到 EIP-7919，可写 confirmed label，但正文仍要把 Pureth data/RPC verification 与 purge/state expiry 分开；partial binary tree 不是 EIP title；state expiry 的 UX 和恢复成本仍高。

## 对 Mantle 的影响
Mantle 的 proving、bridge、indexing、explorer、RPC 都依赖可重放 state/input。即使 Ethereum validators 不重执行，Mantle 仍需要 archive access、witness construction、DA bridge、prover input derivation 的 SLO。RPC outage 可能是 proof-availability incident，而不只是前端问题。

## 建议 Mantle 关注
- 将 archive/replay/prover-input derivation 纳入核心 SLO。
- 为 witness/state proof API 设计内部抽象。
- 重点跟踪 binary/hash-based state commitment，因为 PQ 与 proof compatibility 会影响长期路线；Verkle 页面引用需带滞后 caveat。
- 在报告中把 Pureth、purges、state expiry 三者拆开。

## Sources
- https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236
- https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052
- https://ethereum.org/roadmap/statelessness/
- https://ethereum.org/roadmap/verkle-trees/
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7736
- https://eips.ethereum.org/EIPS/eip-7919
- https://vitalik.eth.limo/general/2024/10/26/futures5.html
