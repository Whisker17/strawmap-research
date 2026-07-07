# 10 Proof-Heavy Execution 与 Native Rollups

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
optional execution proofs / EIP-8025、optional proofs、mandatory proofs、2-of-3 / multi-prover framing、Block-in-Blobs / EIP-8142、native rollups / EIP-8079、native zkEVM、remove blob transaction type、proof market / prover input standardization。

## 一页结论
Proof-heavy execution 不是“把执行换成一个 proof”这么简单。EIP-8025 是 optional proving ground；EIP-8142 处理 mandatory proof 后的 transactions/BAL DA hole；EIP-8079 native rollups 则把 Ethereum STF 暴露为 L1 primitive。真正路线是 proof correctness、payload availability、BAL/state access、prover market、multi-prover safety 的组合栈。Mantle 已在主网运行 OP Succinct/SP1 validity proofs，这让本报告的建议从“未来准备”升级为“生产运营”：prover key lifecycle、fallback mode、DA/payload availability 和 STF 等价性都已经是日常风险面。[Succinct Mantle case study](https://blog.succinct.xyz/case-studies/mantle/)

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| EIP-8025 optional proofs | beacon node 依赖 EL re-execution，验证成本随 gas 增长 | proof-generating nodes gossip execution proofs，stateless validators 验证 proof。[EIP-8025](https://eips.ethereum.org/EIPS/eip-8025) | 先测试 proof plumbing，不让 consensus 立即依赖它 |
| Mandatory proof regime | 若 validator 不下载 payload data，producer 可 proof-withhold-data | EIP-8142 把 execution-payload data 中的 transactions 与 BAL 编码进 blobs，不是把 header/withdrawals/execution requests 全部放进 blobs。[EIP-8142](https://eips.ethereum.org/EIPS/eip-8142) | correctness 靠 proof，availability 靠 blobs/PeerDAS |
| Native rollups / EIP-8079 | Rollups 维护独立 proof games/circuits/bridge trust | L1 `EXECUTE` precompile 暴露 Ethereum STF，rollup 复用 L1 execution semantics。[EIP-8079](https://eips.ethereum.org/EIPS/eip-8079) | 更接近继承 L1 安全和同步组合性，但限制自定义 STF |
| Block-in-Blobs | proof-only validation 不保证 RPC/indexer/builder 有数据 | payload data 与 blob commitments 绑定。[EIP-8142](https://eips.ethereum.org/EIPS/eip-8142) | payload/BAL 可重建，防 proof-without-data |
| Multi-prover / 2-of-3 | 单 prover/circuit bug 是系统性风险 | 多 proof systems + security council / fallback。[Vitalik Surge](https://vitalik.eth.limo/general/2024/10/17/futures2.html) | 降低单实现风险，但提高成本与协调复杂度 |
| Proof market / input standardization | 证明者可能中心化，接口不统一 | 标准化 prover input、市场化 prover supply。[prover input](https://ethresear.ch/t/zk-evm-prover-input-standardization/21626), [prover market](https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834) | 多 prover 可竞争，但需要稳定接口 |

## 深入机制拆解
### Optional proofs：先验证 proof pipeline，而不是立刻替换 re-execution
- EIP-8025 的定位是让 proof-generating nodes 生成并 gossip execution proofs，其他节点可选择验证；它先测试 proof engine、gossip object、verification path 和 client integration。
- 这个阶段 validator 仍可依赖 EL re-execution，因此 proof bug 不会立刻变成 consensus failure，适合暴露 prover latency、proof format、fallback 和 multi-client incompatibility。
- 对 rollup 团队来说，optional proofs 的价值是提前靠近 L1 prover input 标准，而不是等待 mandatory proof 才适配。

### Mandatory proofs + Block-in-Blobs：correctness 和 availability 必须拆开处理
- 证明只能说明“给定输入执行正确”，不能证明交易数据、BAL、receipts、indexer 所需 payload 都长期可得。
- EIP-8142 的关键修正是把 execution-payload data 中的 transactions 与 BAL 编码进 blobs，并用 commitments 绑定，让 proof-heavy validation 仍有可重构数据源。
- 因此未来验证路径更像两条并行约束：proof 负责 state transition correctness，blob/PeerDAS 负责 payload 与 state-access availability。

### Native rollups：从外部 bridge/proof game 走向 L1 STF primitive
- EIP-8079 的 `EXECUTE` precompile 让 L2 可以调用 Ethereum STF，目标是复用 L1 execution semantics、state transition verification 和 eventually native zkEVM。
- 好处是 rollup 不必完整维护独立 execution verifier/bridge semantics；代价是自定义 gas token、precompile、transaction type、derivation rule 都可能变成 native compatibility 风险。
- Native rollup 更像“收窄 STF 自由度来换取 L1 原生安全面”，不是所有 app-chain/alt-VM rollup 都自然适合。

### Multi-prover 与 proof market：去中心化的新瓶颈
- 单一 prover/circuit 是系统性风险：一个 verifier key、compiler bug 或 guest mismatch 可能影响整个 proof-heavy stack。
- 2-of-3 / multi-prover framing 用不同 proof systems 或安全委员会降低单点风险，但会增加 latency、成本、governance 和 emergency fallback 复杂度。
- Prover input standardization 与 proof market 是降低 prover lock-in 的前提；没有稳定输入格式，market 很容易退化成少数集成最深的 prover vendor。

## 当前瓶颈
- Correctness 绑定 re-execution：每个 full validator 重新执行 block，成本随 gas limit 和 state complexity 上升。
- Availability 被隐式获得：重执行时自然拿到 transactions、state access 和 execution side effects，proof-only validation 会失去这个副产物。
- Prover 中心化：生成 proof 的硬件、software stack、verifier key 与 latency 都可能集中在少数实体。
- Rollup fragment：每条 rollup 维护自己的 bridge、proof game、verifier 和 STF 兼容边界，组合性与安全叙事不统一。

## 优化机制
- EIP-8025 先让 proof path 在非强制模式下运行，验证 proof object、engine API、gossip 和 client fallback。
- EIP-8142 用 blob commitments 补上 mandatory proof regime 的 payload/BAL availability hole。
- Multi-prover 和 proof market 把 prover correctness 从单实现信任改成冗余验证与开放供给。
- EIP-8079 将 rollup 执行验证收敛到 L1 STF primitive，减少外部 bridge/proof stack 的自定义信任面。

## 未来效果
- L1 validator：从全员完整重执行逐步走向 proof verification + explicit DA checks，理论上支撑更高 gas envelope。
- Rollup：从外部 verifier/bridge 叙事转向更原生的 execution-shard 风格，但需要牺牲部分自定义执行自由度。
- Infrastructure：prover SLA、input standard、verifier-key upgrade、multi-proof policy 会成为和 client diversity 同级的重要安全面。
- 用户：finality/security 叙事更清晰，但 proof delay、fallback mode 和 emergency upgrade 仍会影响提款和桥体验。

## 依赖与先后关系
PeerDAS/EIP-7594 提供 blob DA；BALs/EIP-7928 提供 state access 数据；ePBS/EIP-7732 改善 payload timing；EIP-8142 连接 proof-heavy execution 与 DA；EIP-8079 是 native rollup 架构层。

## 风险与未决问题
未决 fault line 是 one canonical proof path、multi-prover redundancy、proof market/client-choice fallback 之间的选择。Fable 对 Appendix B 的修正成立：Strawmap 上的 `optional 2-of-3 proofs` 可映射到 EIP-8025 optional proofs + Vitalik 的 2-of-3 multi-proof framing；`mandatory 1-of-1 proofs` 可映射到 EIP-8142/mandatory proof regime。但 EIP-8025 当前是 Stagnant 且 Hegotá PFI，不应写成活跃 fork commitment。

## 对 Mantle 的影响
- 生产现实：Mantle 已运行 OP Succinct/SP1 validity proofs，因此 prover latency、verifier key、fallback routing、proof monitoring 已经不是远期研究项。
- DA 边界：桥安全叙事不能只说 proof correctness，还要解释 batch/payload/BAL 或 derivation input 如何可得、谁能重放、故障时如何恢复。
- Native 兼容：EIP-8079 会放大 Mantle 自定义 STF、MNT gas token、precompile、transaction type、DA path 与 L1 `EXECUTE` 模型之间的差异。
- 去中心化路线：如果 Mantle 长期依赖单一 prover stack，应提前设计 multi-prover input、verification-key governance 和 emergency fallback。

## 建议 Mantle 关注
- 建立 SP1/prover key lifecycle、verifier routing、fallback mode 监控。
- 评估 Mantle STF 是否存在 native-rollup-incompatible custom semantics。
- 跟踪 EIP-8142 对 DA/BAL/payload availability 的要求。
- 把 verification-key hotfix、prover/client 等价性事故作为 multi-prover / input-standardization 风险案例复盘。
- 将 proof market / multi-prover 作为长期 decentralization roadmap 输入。

## Sources
- https://eips.ethereum.org/EIPS/eip-8025
- https://github.com/ethereum/consensus-specs/blob/master/specs/_features/eip8025/proof-engine.md
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8079
- https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517
- https://ethresear.ch/t/a-native-zkevm-scales-bandwidth-not-just-execution/25254
- https://ethresear.ch/t/zk-evm-prover-input-standardization/21626
- https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://blog.succinct.xyz/case-studies/mantle/
