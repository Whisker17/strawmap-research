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

## 当前瓶颈
今天每个 full validator/client 通过 re-execution 隐式获得 correctness 与 data availability。证明可以降低 correctness 验证成本，但如果没有 payload/BAL availability，RPC、indexer、builders 和后续 provers 仍无法重建链。

## 优化机制
短期 EIP-8025 optional proofs 让网络测试 proof generation/gossip/verification；中期多 prover/market 标准化输入；长期 mandatory proofs 需要 EIP-8142 这类 DA binding；native rollups 则把 rollup STF 变成 L1 可验证 primitive。

## 未来效果
Ethereum validation 可从全员 re-execution 走向 proof verification + explicit DA。Rollups 可能从“外部 bridge/proof stack”走向更原生的 L1 execution-shard 风格。但 prover latency、proof centralization、multi-proof economics 会成为新瓶颈。

## 依赖与先后关系
PeerDAS/EIP-7594 提供 blob DA；BALs/EIP-7928 提供 state access 数据；ePBS/EIP-7732 改善 payload timing；EIP-8142 连接 proof-heavy execution 与 DA；EIP-8079 是 native rollup 架构层。

## 风险与未决问题
未决 fault line 是 one canonical proof path、multi-prover redundancy、proof market/client-choice fallback 之间的选择。Fable 对 Appendix B 的修正成立：Strawmap 上的 `optional 2-of-3 proofs` 可映射到 EIP-8025 optional proofs + Vitalik 的 2-of-3 multi-proof framing；`mandatory 1-of-1 proofs` 可映射到 EIP-8142/mandatory proof regime。但 EIP-8025 当前是 Stagnant 且 Hegotá PFI，不应写成活跃 fork commitment。

## 对 Mantle 的影响
Mantle 已在主网运行 OP Succinct/SP1 validity proofs，这与 proof-heavy future 对齐，但也把 verifier key、fallback mode、prover-input derivation、custom STF 等价性变成生产风险。EIP-8079 native-rollup compatibility 仍要求 Mantle 的 STF、custom gas token、precompiles/tx types、Ethereum blob/calldata DA 路径与 L1 `EXECUTE`/anchoring 模型兼容，不是换 prover就能完成。桥安全叙事必须同时覆盖 proof correctness 和 DA/BAL availability。

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
