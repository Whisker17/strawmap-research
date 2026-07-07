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

## 深入机制拆解
### VOPS：为什么不是“全 stateless”
- Strong statelessness 会让普通节点不保留 state，并要求交易携带完整 witness；这会显著改变 public mempool validity、witness distribution 和 DoS 边界。
- VOPS 的现实路径更保守：节点只保留验证 pending tx 和近期执行所需的状态，让 mempool 仍能做基本 validity checks。
- 它牺牲了一部分“完全无状态”的纯度，换来 censorship resistance、permissionless mempool 和客户端实现复杂度的可控性。

### Binary tree vs Verkle：承诺结构的路线切换
- Verkle 的优势是 witness 小，但依赖更复杂的曲线/承诺假设，且 EIP-6800 当前不是活跃 fork item。
- EIP-7864 unified binary tree 代表更活跃的 hash-based/PQ-friendly 方向，代价是 witness size 和迁移工程仍需优化。
- 因此报告里引用 ethereum.org Verkle 页面时必须标注滞后 caveat，避免把旧路线误读成当前主线。

### New state forms：把不同状态资源拆开定价
- hyper-scaling state 的关键不是只“删旧状态”，而是引入 permanent、temporary、UTXO-like、application-specific 等不同可用性/恢复语义。
- 这样可以让低价值临时状态不永久占用全网存储，同时让高价值状态支付更接近真实长期成本。
- 对 rollup 来说，这会影响桥合约、message queues、L1 anchors、withdrawal records 这类“必须长期可验证”的状态设计。

### Pureth / Purge：RPC trust、历史数据、状态膨胀是三件事
- Pureth 更偏 verifiable data access/RPC correctness，解决“我从 RPC 拿到的数据是否可信”。
- The Purge 处理历史数据、旧功能、状态和协议复杂度清理，目标是降低客户端长期负担。
- State expiry 是其中一个可能方向，但难点在不存在性证明、状态复活、用户 UX 和应用对旧状态的依赖。

## 当前瓶颈
- 存储压力：全节点长期承担全状态增长，archive/RPC 的成本更高。
- 验证压力：stateless 或 partial stateless 需要 witness、proof of inexistence 和 state availability。
- UX 压力：state expiry 会让“恢复旧账户/旧合约状态”变成用户或服务商必须处理的问题。
- 生态压力：L2 prover、indexer、bridge 和 explorer 都依赖可重放状态，不能只看 validator 存储下降。

## 优化机制
- VOPS 用 partial state retention 保留 public mempool validity 所需的状态面。
- Hyper-scaling state 把状态按生命周期、恢复语义和可用性分层。
- Binary/hash-based commitment 提高 PQ-friendly 和长期证明兼容性。
- Pureth 和 Purge 分别从 RPC/data verification 与历史/功能清理降低客户端负担。

## 未来效果
- Validators：本地状态和历史负担可能下降，运行节点更容易。
- RPC/light clients：可验证数据路径增强，减少对中心化 RPC 的盲信任。
- Provers：witness/state input 会更标准化，但也更依赖可用的 state provider。
- Applications：需要明确哪些状态必须永久可恢复，哪些可以迁移到 temporary/tiered state。

## 依赖与先后关系
BALs 和 Block-in-Blobs 为 proof-heavy execution 的 state/payload 可用性打基础；state expiry 依赖 commitment structure；Pureth 与 state expiry 不同，应放在 verifiable data/RPC 轨道。

## 风险与未决问题
Strong statelessness 不是当前官方预期；EIP-6800/7736/7919/7503 均为 Stagnant，应避免写成活跃工作流；`Pureth purges` 在 Strawmap 链接到 EIP-7919，可写 confirmed label，但正文仍要把 Pureth data/RPC verification 与 purge/state expiry 分开；partial binary tree 不是 EIP title；state expiry 的 UX 和恢复成本仍高。

## 对 Mantle 的影响
- Prover SLO：Mantle 需要把 archive/replay/witness/prover-input derivation 当成核心生产系统，而不是普通 RPC 依赖。
- Bridge safety：L1 bridge/message queue 状态若进入 expiry/tiered model，必须保证提款、challenge、证明重放的长期可验证性。
- Data services：explorer、indexer、analytics 和 compliance 需要适配更强的 verifiable data/RPC model。
- 长期设计：Mantle 合约应避免无边界 state growth，尤其是长期不清理的 mappings、queues、receipts 和 per-user records。

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
