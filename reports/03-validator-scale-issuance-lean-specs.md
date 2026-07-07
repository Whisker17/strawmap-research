# 03 验证者规模、发行策略与 Lean Specs

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
1M attestations per slot、heartbeat committee、Horn、LMD GHOST + fast-following finality、dynamic availability、Orbit SSF、snail issuance、issuance policy、beacon & lean specs merge、tech debt reset。

## 一页结论
这组优化解决的是“验证者越多，安全越强，但每 slot 通信越贵”的矛盾。Fable 对 Horn 的修正成立：Horn 是“让全验证者集每 slot attest 的两层 BLS 聚合拓扑”，与小 heartbeat committee + trailing finality 是两条不同分支，不应混成同一路线。发行策略与 validator-set 管理则是经济层面的配套：让安全预算、solo staking、验证者数量和通信成本保持可持续。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| 1M attestations per slot / Horn | 全量验证者每 slot 投票/聚合不可扩展 | Horn 通过两层 BLS aggregation 试图让全验证者集每 slot attest，甚至可能需要更长 slot。[Horn](https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219) | 保留全量投票语义，但网络/验证开销仍重 |
| Heartbeat committee | 大委员会带宽和聚合轮次太重 | 约数百验证者的 heartbeat 维持 liveness，finality 并行处理。[LMD GHOST + FFFG](https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856) | 更适合短 slot、PQ 签名和动态参与 |
| Dynamic availability / trailing finality | fast path 若要求全量投票，会阻塞短 slot 和 PQ heartbeat | 小 committee heartbeat 保活，再由较慢 finality path 补足全安全权重。[dynamic availability](https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418) | fast path 低延迟，full security 不挤占 slot critical path |
| Orbit SSF | validator set 太大时 SSF 成本高，小 committee 又可能安全权重不足 | stable core + rotating periphery，按 balance sampling 管理 active set。[Orbit SSF](https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928) | 限制 active load，同时保持 stake-proportional rewards |
| Snail issuance | exact phrase 无 protocol-grade 来源；真实问题是发行曲线与验证者数量 | 用 tempered/low issuance、validator-set policy 研究讨论边际安全收益。[issuance endgame](https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747) | 可能降低长期通信/发行压力，但影响 solo staking、MEV 与安全预算 |
| Lean specs / tech debt reset | 当前 specs、客户端和 timing 假设复杂度累积 | Lean Ethereum / leanSpec / runtime-configurable timing 改善规格工程。[Lean Ethereum](https://blog.ethereum.org/2025/07/31/lean-ethereum), [leanSpec](https://github.com/leanEthereum/leanSpec) | 为 PQ、短 slot、proof-heavy consensus 降低规格债务 |

## 深入机制拆解
### Horn vs heartbeat committee
- Horn 试图保留“全验证者每 slot attest”的语义，通过两层 BLS aggregation 收集大规模签名；它追求的是全量参与，不是小委员会 fast path。[Horn](https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219)
- Heartbeat committee 路线反过来：用小委员会维持链活性和低延迟，把更大安全权重放到 trailing finality path 上。[LMD GHOST + FFFG](https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856)
- 这两条路线的取舍点不同：Horn 保留全量投票语义但网络重，heartbeat 更适合短 slot 和 PQ 签名但需要抽样安全假设。

### Dynamic availability / Orbit / issuance
- Dynamic availability 的核心是不要让全量 finality 卡住 fast path：链先保持 available 和及时，再用较慢 finality 层补经济安全。[dynamic availability](https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418)
- Orbit SSF 用 stable core + rotating periphery 管理 active validator set，目标是在 solo-staker 友好和通信成本之间找平衡。[Orbit SSF](https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928)
- Issuance policy 不是单纯“少发 ETH”，而是在边际安全收益、验证者数量、solo staking 收益、MEV 和通信开销之间重新定价安全预算。[issuance endgame](https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747)

### Lean specs / PQ readiness
- Lean Consensus 的价值不是把 BLS 直接替换成某个 PQ 签名，而是为 fast finality、PQ consensus、ZK-verified consensus 和更小规格债务提供统一工程线。[Ethereum Protocol Studies 2026](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26)
- 官方 PQ 路线也把 leanXMSS、leanVM、leanSpec、leanSig/leanMultisig 写成阶段性研究组件：直接使用大 PQ 签名会更慢更贵，必须靠证明/聚合重新压缩。[quantum resistance](https://ethereum.org/roadmap/future-proofing/quantum-resistance/)
- 对报告写法来说，`snail issuance` 应保留为 Strawmap shorthand，而不是协议功能名；Lean Ethereum 应写成长期规格工程和密码敏捷性路线。

## 当前瓶颈
- 验证者规模带来经济安全，也带来 attestations、aggregation、subnet、client CPU/bandwidth 的压力。
- 如果把 SSF 简单做成全验证者每 slot 投票，通信成本会成为核心瓶颈。
- 发行策略、active validator set、solo-staker 收益和 MEV 激励会共同决定“更多验证者”到底是安全收益还是通信负担。
- PQ 签名难以像 BLS 一样高效聚合，会进一步放大 validator-scale 问题。

## 优化机制
- Horn 代表“加强聚合以容纳全验证者集每 slot 投票”的路线。
- Heartbeat committee / dynamic availability 代表“fast path 保活、finality path 补安全”的路线。
- Orbit SSF 通过 active set 管理，限制每 slot 负担，同时尽量保持 stake-proportional rewards。
- Issuance policy 通过经济激励限制验证者数量无限增长的副作用。
- Lean specs / Lean Consensus 通过规格瘦身、runtime 参数化和 PQ/proof-friendly 实现降低长期工程债务。

## 未来效果
- Ethereum 可以支持更大的经济安全集合，同时不让每 slot 负担全量验证者通信。
- Fast confirmation 和 finality 可以按不同路径演进，不再被同一个委员会规模硬性绑定。
- PQ heartbeat 可能早于 full PQ finality 落地，为后续 validator PQ migration 降低风险。
- 新瓶颈会转向 committee sampling 安全、发行治理、solo-staking 可持续性和规格迁移成本。

## 依赖与先后关系
本方向与 Fast L1/SSF 强关联，也是 PQ consensus 的前置。Lean specs 是技术债务治理，不是单独用户功能；Lean Ethereum 博文应定性为 Justin Drake 的个人愿景，规格债务和短 slot 的工程依据应主要挂到 leanSpec / modernized beacon specs。issuance policy 是经济治理，不应和协议功能混写。`snail issuance` 是 Strawmap 官方图上的非正式速记，但仍不是 protocol-grade 功能名。

## 风险与未决问题
小 committee 带来抽样安全与活性假设；发行降低可能影响 staking participation、solo-staker 收益与 MEV incentives；lean specs 与 current consensus specs 的关系仍是长期工程。不要把 256 committee 或 1M attestations 当最终参数。

## 对 Mantle 的影响
- Mantle 的结算安全继承 L1 validator set 与 finality 模型，因此 validator-scale 和 issuance 改动会改变其底层安全预算叙事。
- 更快 heartbeat 会改善 L1 confirmation UX，但 Mantle 仍需尊重 L1 reorg/finality 和自身 proof window。
- 如果 Ethereum 采用 PQ heartbeat first、full PQ finality later，Mantle 的安全文案也要分层更新，而不能写成单一“L1 已 PQ-ready”。
- Lean specs 若降低轻验证和共识证明成本，会利好 Mantle bridge、watchdog、light-client proof 和长期证明基础设施。

## 建议 Mantle 关注
- 风险模型里区分 heartbeat confirmation 与 full finality。
- 跟踪 Orbit/issuance policy 是否改变 validator decentralization 假设。
- 跟踪 PQ heartbeat 对 bridge/finality 文案的影响。
- 不把 `snail issuance` 写成已定义协议功能。

## Sources
- https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856
- https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928
- https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747
- https://ethresear.ch/t/faq-ethereum-issuance-reduction/19675
- https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26
- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanSpec
- https://docs.google.com/document/d/e/2PACX-1vRtpbntq45GCTG3srzetWDkjsF1d-60iXL1rVeumnJW-Gbm343oV5Xvm3O6rALKJjXgr4mpL1a0uT4t/pub
