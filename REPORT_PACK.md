# Ethereum Strawmap 详细分报告包

> 本文件为总包，包含 INDEX、14 篇分报告、2 个附录、source ledger 与 claim ledger。

# Ethereum Strawmap 详细分报告包索引

> 面向 Mantle dev team / researcher handoff。生成日期：2026-07-06。

## 怎么读

这套材料把上一版总报告拆成 14 篇方向报告和 2 个附录。每篇报告都按同一结构回答：瓶颈是什么、怎么优化、未来效果、依赖与先后关系、风险/未决问题、对 Mantle 的影响、建议 Mantle 关注。

推荐阅读顺序：先读 Appendix A/B，避免误读状态和模糊标签；再按共识层、数据层、执行层、账户/隐私层阅读；最后回到 Mantle 影响矩阵。

## 报告清单

| # | 报告 | Layer | 用途 |
|---|---|---|---|
| 1 | [Fast L1：快速确认、短 slot 与快速终局性](reports/01-fast-l1-confirmation-finality.md) | 共识层 | 独立深挖报告 |
| 2 | [出块生产与抗审查：ePBS、FOCIL 与角色拆分](reports/02-block-production-censorship-resistance.md) | 共识/执行边界 | 独立深挖报告 |
| 3 | [验证者规模、发行策略与 Lean Specs](reports/03-validator-scale-issuance-lean-specs.md) | 共识层 | 独立深挖报告 |
| 4 | [共识层韧性与 Post-Quantum CL](reports/04-consensus-resilience-pq-cl.md) | 共识/密码学 | 独立深挖报告 |
| 5 | [Teragas L2：PeerDAS 与 DA 容量增长](reports/05-peerdas-da-capacity.md) | 数据层 | 独立深挖报告 |
| 6 | [Blob 传播、Custody 与 Streaming](reports/06-blob-propagation-custody-streaming.md) | 数据/网络 | 独立深挖报告 |
| 7 | [资源定价：Blob、Byte Floors、多维 Fee 与 Futures](reports/07-resource-pricing-fees-futures.md) | 数据/执行经济 | 独立深挖报告 |
| 8 | [Gigagas L1：Gas Limit 与 P2P Throughput](reports/08-gigagas-l1-p2p-throughput.md) | 执行/网络 | 独立深挖报告 |
| 9 | [BALs：显式 State Access 与 Block-Level Access Lists](reports/09-bals-explicit-state-access.md) | 执行/状态 | 独立深挖报告 |
| 10 | [Proof-Heavy Execution 与 Native Rollups](reports/10-proof-heavy-execution-native-rollups.md) | 执行/数据边界 | 独立深挖报告 |
| 11 | [EVM Hardening 与 Proving Substrates](reports/11-evm-hardening-proving-substrates.md) | 执行/证明 | 独立深挖报告 |
| 12 | [State Growth、Statelessness 与 Purges](reports/12-state-growth-statelessness-purges.md) | 执行/状态 | 独立深挖报告 |
| 13 | [Frame Transactions 与 Account/Auth Modernization](reports/13-frame-transactions-account-auth.md) | 账户/交易 | 独立深挖报告 |
| 14 | [Private L1：Encrypted Mempool、Shielded Transfers 与 Privacy Roadmap](reports/14-private-l1-encrypted-mempool.md) | 隐私/交易 | 独立深挖报告 |
| 15 | [Appendix A：Fork Status、North-Star 与时间线 Caveats](reports/A-fork-status-and-north-star-caveats.md) | 附录 | 状态/标签校准 |
| 16 | [Appendix B：模糊 Strawmap 标签 Crosswalk](reports/B-ambiguous-label-crosswalk.md) | 附录 | 状态/标签校准 |

## 关键依赖关系

| 上游能力 | 解锁/影响 | 相关报告 |
|---|---|---|
| FCR / quick slots / decoupled consensus | 更快 L1 确认与终局性语义，但不自动缩短 L2 proof finality | 01, 03 |
| ePBS | 把 execution payload 从共识 hot path 中拆开，为 FOCIL、Block-in-Blobs（BiB）、shorter slots 创造空间 | 02, 10 |
| FOCIL | 强化 public forced inclusion，是 LUCID/encrypted mempool 的 inclusion backbone | 02, 14 |
| PeerDAS/Fusaka/BPO | 提高 Ethereum blob DA headroom，是 Mantle 当前 blob 主路径和 EIP-8142 payload-data DA 的基础 | 05, 06, 10 |
| BALs | 显式 state access，支撑 parallel validation、proof-heavy execution、state sync 和 witness planning | 09, 10, 12 |
| Repricing / multidimensional fees | 防止扩容后 cheap bytes/state 成为新瓶颈，影响 blob 主路径与 calldata fallback 成本 | 07, 08, 09 |
| Proof-heavy execution | 从 universal re-execution 转向 proof verification + explicit DA/BAL availability | 10, 11, 12 |
| Frame tx / keyed nonces / recent roots | 为 AA、PQ auth、privacy validation、relayers 提供交易格式基础 | 13, 14 |
| PQ / lean stack | 长期影响 CL attestations、user auth、proof substrates 和 DA commitments | 04, 11, 13 |

## Mantle 最重要的阅读线索

- DA：先读 05/06/07，按 Mantle 当前 Ethereum blobs 主 DA、calldata fallback、Arsia L1 data fee model、batch posting 策略来读。
- Proof：先读 09/10/11/12，重点看已上线的 OP Succinct/SP1 validity proofs、native-rollup compatibility、BAL/payload availability、witness SLO。
- Sequencer/MEV：先读 02/13/14，重点看 forced inclusion、fair sequencing、encrypted mempool 是否要做 parity。
- Product/UX：先读 01/10/13，重点把 confirmation/finality/proof/withdrawal 状态拆开。

## 状态修正

- PeerDAS/Fusaka/BPO1/BPO2 在本日期应写成已上主网/已激活，而非待部署。
- EIP-7928 和 EIP-7732 是 Glamsterdam scheduled，但 Glamsterdam 仍在开发。
- EIP-7805 是 Hegotá scheduled；EIP-8141 只是 Hegotá considered。
- EIP-8184、EIP-8079、EIP-8142 等仍是 Draft / research，不应写成 fork commitment。
- `snail issuance`、`leanDA`、`partial binary tree`、`lean privacy wormholes` 等需要使用 Appendix B 的 confirmed/inferred/unresolved caveat。



---

# 01 Fast L1：快速确认、短 slot 与快速终局性

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
fast L1、finality in seconds、fast confirmation / FCR、slot duration decreases、quick slots / EIP-8198、SSF / one-round finality、decoupled consensus。

## 一页结论
这组优化解决的是 L1 延迟的三个层级：用户先看到的 head confirmation、协议 slot cadence、以及经济终局性。FCR 是最快能落地的“确认信号”，但不是 finality；EIP-8198 先把 12 秒 slot 的硬编码改成 runtime 参数；SSF / one-round finality / decoupled consensus 才是把 finality 本身变快的长期路线。对 Mantle 来说，最大的影响不是“提款立刻变快”，而是需要把 L1 head confirmation、L1 finality、L2 proof finality、withdrawal readiness 四个状态拆开表达。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| FCR / fast confirmation | Ethereum 当前 finalized checkpoint 对交易所、充值、桥接 UX 来说太慢；head 又缺少可解释的安全等级 | 基于 attestations 给出单 slot 级 fast-confirmed head，假设破坏时回退到 finalized head。[fastconfirm.it](https://fastconfirm.it/) | 常态下把“可展示确认”压到约一个 slot 量级，但不可当作不可逆 finality |
| slot duration decreases | 12 秒 slot 是 inclusion latency 的底线，并且大量客户端假设写死 12 秒 | 缩短 slot，同时重新调整 proposal、attestation、aggregation deadline；EIP-8198 先把 slot duration 变成配置项。[EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | 降低 inclusion cadence，但提高网络传播、硬件与边缘节点压力 |
| Quick slots / EIP-8198 | 直接改 slot 时长会触碰大量实现假设 | 引入 `SLOT_DURATION_MS` 等 runtime consensus 配置，并要求相关 blob/gas/churn 参数联动。[EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | 把“短 slot”从一次性硬分叉风险变成可阶段化参数工程 |
| SSF / one-round finality | 当前 Casper FFG finality 不是单 slot 完成；全验证者每 slot 投票又太重 | 研究单槽/单轮 finality gadget、聚合与委员会设计；近期 one-round notes 可作为 Alpenglow/Kudzu/Hydrangea/Minimmit 谱系入口。[ethereum.org SSF](https://ethereum.org/roadmap/single-slot-finality/), [one-round notes](https://notes.ethereum.org/@yannvon/S1wIxIDqbe) | 缩短不可逆结算等待，但实现难度集中在 validator set、aggregation 与网络同步 |
| Decoupled consensus | 快 slot 与快 finality 被同一投票/传播预算耦合 | 把 block production heartbeat 和 trailing finality gadget 解耦。[decoupled consensus](https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527) | 小委员会保持活性，大 finality 层并行补安全性，避免“slot 快了 finality 更慢” |

## 当前瓶颈
瓶颈不是一个数，而是三层耦合。第一，用户需要低延迟确认，但 finalized finality 太慢。第二，12 秒 slot 限制 inclusion cadence，缩短后又会压缩传播和验证窗口。第三，finality 需要足够多验证者参与，若每 slot 都拉满全量投票，网络与聚合成本会迅速上升。

## 优化机制
短期机制是 FCR：客户端给出安全弱于 finality 的 fast-confirmed 状态。中期机制是 EIP-8198：把 slot timing 参数化，为 8 秒、6 秒或其它实验留下工程空间。长期机制是 SSF/one-round/decoupled consensus：把最终确认从 epoch 级压到 slot 级或更少轮次，并让 fast path 与 finality path 分离。

## 未来效果
如果路线成功，用户会更早看到可靠确认，交易所/桥/钱包可以缩短展示等待；协议侧 inclusion cadence 更快；最终经济 finality 也可能下降。但这些不是同一个安全等级：fast confirmation 可回滚，finality 才是强安全边界。

## 依赖与先后关系
FCR 可先行，因为无需 hard fork。EIP-8198 是短 slot 的基础设施。短 slot 会加剧 ePBS、FOCIL、blob propagation 与 p2p 的压力，所以不能孤立推进。SSF/decoupled consensus 依赖 validator-scale、aggregation、dynamic availability 和网络同步研究。

## 风险与未决问题
主要风险是 adverse network 下的误确认、弱客户端掉队、builder free option 被短 slot 放大、以及“用户以为 fast-confirmed 等于 finalized”。EIP-8198 仍是 draft；SSF/decoupled consensus 是研究路线，不应写成确定上线。

## 对 Mantle 的影响
Mantle 可以用 fast-confirmation 类信号改善充值/桥接 UX，但安全关键路径仍应等待 L1 finality 和 L2 proof/withdrawal 条件。产品文案要避免“Ethereum 变快，所以 Mantle 提款天然变快”的误导。工程上，watchdog、batch posting、proof submission、forced inclusion 逻辑都要为更短 L1 deadline 做压测。

## 建议 Mantle 关注
- 在 bridge/explorer/API 中区分 `L1 fast-confirmed`、`L1 finalized`、`L2 proven`、`withdrawal ready`。
- 跟踪 FCR 是否进入主流 client / exchange / bridge policy。
- 跟踪 EIP-8198 和 consensus-call 对 slot 目标的变化。
- 对 shorter-slot 情境下的 batch posting、proof posting、L1 fallback 做延迟预算。

## Sources
- https://fastconfirm.it/
- https://eips.ethereum.org/EIPS/eip-8198
- https://ethereum.org/roadmap/single-slot-finality/
- https://notes.ethereum.org/%40vbuterin/single_slot_finality
- https://notes.ethereum.org/@yannvon/S1wIxIDqbe
- https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527



---

# 02 出块生产与抗审查：ePBS、FOCIL 与角色拆分

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
ePBS / EIP-7732、FOCIL / EIP-7805、attester-proposer separation、attester-includer separation、distributed block building / MPBC、PBS relay trust、inclusion lists。

## 一页结论
这组优化把 Ethereum 从“少数 builder/relay 控制实际出块路径”的结构，推向协议内角色分离和可验证 inclusion。ePBS 先把 PBS 纳入协议并把 execution payload 从共识 hot path 中拆开；FOCIL 再用 inclusion list 强制公共交易被纳入；attester/includer separation 和 multi-party block construction 则进一步把“谁看见交易、谁承诺纳入、谁执行状态”拆得更细。Mantle 应把这组视为 L1 censorship-resistance baseline 的上移。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| ePBS / EIP-7732 | 当前 PBS 依赖 relay 与 off-protocol trust，execution payload 在 critical path | builder commitment + Payload Timeliness Committee，延迟 execution validation。[EIP-7732](https://eips.ethereum.org/EIPS/eip-7732) | 降低 relay 信任，给 proposer/validator 更多时间，但 builder free option 仍存在 |
| FOCIL / EIP-7805 | builder/proposer 可审查公共 mempool 交易 | committee 产生 inclusion list，fork choice 要求 block 满足 IL。[EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) | 公共 forced inclusion 更强，但不解决所有 MEV 排序问题 |
| Attester-includer separation | inclusion 与 state execution 混在同一路径，激励和费用不清晰 | 把 inclusion tx 与 state tx、includer 与 proposer/builder 角色拆开。[attester-includer](https://ethresear.ch/t/towards-attester-includer-separation/21306) | public inclusion 路径更清楚，给 privacy/MEV-sensitive flow 留出独立 lane |
| Distributed block building / MPBC | 单一 builder 是 chokepoint，orderflow 捕获集中 | 多方贡献 block 内容，扩大交易来源和构建参与者。[MPBC](https://ethresear.ch/t/building-towards-multi-party-block-construction/24975) | 降低单点控制，但协调、latency 与激励复杂度上升 |
| LUCID relation | FOCIL 只能强制公开传播交易，不能保护 encrypted MEV-sensitive flow | encrypted tx 依赖 FOCIL inclusion backbone，再延迟 reveal。[EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | 抗审查与隐私/MEV 保护开始组合，而非替代 |

## 当前瓶颈
PBS 已经让 builder/relay 成为实际出块中心，relay trust、builder concentration、private orderflow 和 censorship risk 叠加。即便 L1 共识本身去中心化，用户交易是否及时进入 block 仍可能被少数专业参与者影响。

## 优化机制
EIP-7732 把 proposer-builder separation 协议化，用 commitment 和 PTC 约束 payload timeliness；FOCIL 让 committee 维护 inclusion list 并通过 fork choice enforcement 让 block 不能随意忽略；role separation / MPBC 继续拆出 includer、builder、proposer 等责任边界。

## 未来效果
未来出块路径会更像多 lane 系统：public forced inclusion lane、builder/private MEV lane、encrypted lane、state execution lane。Ethereum 抗审查性会更可验证，但复杂性也会上升，尤其是 ePBS free option、relay residual role、IL spam 与 builder coordination。

## 依赖与先后关系
ePBS 是基础结构，FOCIL 是 inclusion enforcement，LUCID/加密 mempool 依赖 FOCIL 但不被 FOCIL 替代。Fork meta 本身已经给出顺序关系：ePBS 在 Glamsterdam scheduled，FOCIL 在 Hegotá scheduled；二者不宜被写成同一阶段的承诺。短 slot 与更高 gas/blob throughput 会放大出块传播压力，所以本报告应与 Fast L1、Blob propagation、BALs 一起读。

## 风险与未决问题
主要风险包括 builder withholding / free option、relay 继续存在、MEV concentration 未消失、inclusion-list spam/DoS、以及多角色系统的激励复杂性。EIP-7732 和 EIP-7805 均仍需按 fork meta 谨慎表述：EIP-7732 scheduled for Glamsterdam，EIP-7805 scheduled for Hegotá。[EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## 对 Mantle 的影响
L1 forced inclusion 变强后，Mantle 的 sequencer censorship-resistance 叙事也会被重新比较。若 L1 有协议级 inclusion list，而 L2 仍依赖单 sequencer 或弱 forced-tx UX，用户会自然追问 Mantle 的 escape hatch 是否同样清晰。Mantle 的 fair sequencing、forced transaction、sequencer failover 和 private orderflow 策略需要和 L1 新 baseline 对齐。

## 建议 Mantle 关注
- 建立 sequencer downtime / forced transaction 的用户可见流程。
- 内部区分“公平排序”“抗审查”“隐私”“MEV 捕获”，不要混成一个承诺。
- 监控 ePBS/FOCIL/LUCID 在 Glamsterdam/Hegotá 的状态变化。
- 评估 Mantle 是否需要 role separation 或 multi-operator sequencing 设计预案。

## Sources
- https://eips.ethereum.org/EIPS/eip-7732
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://ethresear.ch/t/building-towards-multi-party-block-construction/24975
- https://ethresear.ch/t/trustless-payments-and-relays/25125
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081



---

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

## 当前瓶颈
验证者规模带来经济安全，也带来 attestations、aggregation、subnet、client CPU/bandwidth 的压力。当前 Ethereum 每 slot 已需要大量 attestations；如果把 SSF 简单做成全验证者每 slot 投票，通信成本会成为核心瓶颈。

## 优化机制
技术路线应拆成两支：一支是 Horn 这种“更强聚合以容纳全验证者集每 slot 投票”；另一支是 fast path / finality path 解耦，用小 heartbeat committee 保持链活性和低延迟，重 finality 在并行路径上聚合更大安全权重。经济路线是调整 validator-set active size、发行曲线和 staking incentives，让安全边际收益不无限转化成通信成本。

## 未来效果
成功后，Ethereum 可以支持更大的验证者集合和更快确认，而不让每 slot 负担全量验证者通信。PQ 路线也受益，因为 PQ 签名难以像 BLS 一样高效聚合，小 committee heartbeat 可以先行。

## 依赖与先后关系
本方向与 Fast L1/SSF 强关联，也是 PQ consensus 的前置。Lean specs 是技术债务治理，不是单独用户功能；Lean Ethereum 博文应定性为 Justin Drake 的个人愿景，规格债务和短 slot 的工程依据应主要挂到 leanSpec / modernized beacon specs。issuance policy 是经济治理，不应和协议功能混写。`snail issuance` 是 Strawmap 官方图上的非正式速记，但仍不是 protocol-grade 功能名。

## 风险与未决问题
小 committee 带来抽样安全与活性假设；发行降低可能影响 staking participation、solo-staker 收益与 MEV incentives；lean specs 与 current consensus specs 的关系仍是长期工程。不要把 256 committee 或 1M attestations 当最终参数。

## 对 Mantle 的影响
Mantle 的结算安全继承 L1 validator set 与 finality 模型。更快 heartbeat 会改善 L1 confirmation UX，但 Mantle 仍需尊重 L1 reorg/finality 和自身 proof window。若 Ethereum 采用 PQ heartbeat first、full PQ finality later，Mantle 的安全叙事也要分层更新。

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
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanSpec
- https://docs.google.com/document/d/e/2PACX-1vRtpbntq45GCTG3srzetWDkjsF1d-60iXL1rVeumnJW-Gbm343oV5Xvm3O6rALKJjXgr4mpL1a0uT4t/pub



---

# 04 共识层韧性与 Post-Quantum CL

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
post quantum L1、hash-based signatures、PQ validator pubkey registry、post quantum heartbeat、PQ leanXMSS attestations、real-time CL proofs、specs quantum、VDF randomness、secret proposers / Whisk / SSLE、51% attack auto-recovery。

## 一页结论
这组路线把 Ethereum 的长期安全问题拆成三类：密码学迁移、leader/proposer 抗 DoS、极端攻击后的恢复。PQ 不是一次 fork，而是先有 account/signature agility，再有 validator PQ key registry，再有 PQ heartbeat / attestations，最后才可能进入 full PQ consensus。对 Mantle 来说，这是结算安全的长期迁移风险，也是 prover stack 和桥安全文案需要提前分层的地方。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| PQ pubkey registry | validator 没有平滑登记 PQ key 的路径 | 预先登记/绑定 PQ public keys。[PQ registry](https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040) | 把 key enrollment 和激活分离，降低迁移协调风险 |
| PQ heartbeat | PQ 签名大且缺少 BLS 式聚合 | 小 committee heartbeat 允许拼接 PQ 签名。[dynamic availability](https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418) | fast path 可更早 PQ-friendly，full finality 可后续升级 |
| PQ leanXMSS / leanVM | hash-based signature set 太大，验证/传输成本高 | Strawmap 使用 `leanXMSS` 作为图上标签；公开仓库当前以 leanVM/leanSig 命名，旧 leanMultisig 链接会重定向。[leanVM](https://github.com/leanEthereum/leanVM), [leanSig](https://github.com/leanEthereum/leanSig) | 给 PQ attestations 一个证明压缩路径，但参数仍是研究 |
| Real-time CL proofs | CL 验证和 light-client proof 成本高 | 用 leanVM/recursive proofs 证明 consensus properties。[PQ roadmap](https://pq.ethereum.org/) | 减少轻验证成本，帮助 PQ migration |
| VDF randomness | RANDAO randomness 可被 last revealer bias | RANDAO + VDF 延迟输出随机性。[VDF beacon](https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566) | 提升 proposer/committee randomness 质量，但硬件与 PQ 替代未决 |
| Secret proposers / Whisk | proposer 身份提前暴露，易被 DoS | shuffle-based SSLE 隐藏 proposer。[Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) | 减少 pre-targeting 与 proposer DoS |
| 51% attack auto-recovery | 多数攻击后在线节点难以一致判断及时链 | timeliness detectors 判断 block 是否 timely。[timeliness detectors](https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925) | 攻击后恢复更有协议依据，但依赖 synchrony 假设 |

## 当前瓶颈
长期看，BLS/ECDSA、curve-based proofs、公开 proposer、RANDAO bias、以及多数攻击后的协调恢复都是安全债务。PQ 最大瓶颈不是“找一个签名算法”，而是 validator identity、签名大小、aggregation、proof compression 和迁移顺序。

## 优化机制
PQ 路线采用 staged migration：账户层先通过 AA/Frame tx 获得 signature agility；CL 先做 key registry；fast path 用小 heartbeat；full finality 与 real-time proofs 后续跟进。韧性路线则用 VDF/Whisk/timeliness detectors 保护 randomness、leader privacy 和 attack recovery。

## 未来效果
成功后，Ethereum 可逐步降低量子风险，减少 proposer DoS 面，提升极端攻击后的恢复确定性。最重要的变化是安全语义分层：PQ heartbeat 可能早于 full PQ finality，账户 PQ 可能早于 validator PQ。

## 依赖与先后关系
本报告与 03 validator-scale、13 frame tx、11 proving substrates 强相关。leanVM/leanSig 是研究实现信号，不是生产级协议参数。`specs quantum` 应映射到 PQ roadmap / Lean Ethereum，而非独立 EIP。

## 风险与未决问题
PQ signature statefulness、XMSS key management、proof security parameters、VDF 硬件假设、Whisk anonymity set、timeliness synchrony bounds 都未完全定案。不要把 leanVM benchmark 写成协议保证。

## 对 Mantle 的影响
Mantle 的桥、finality、proof-stack 都会受 L1 PQ migration 影响。若 L1 先有 PQ heartbeat 再有 full PQ finality，Mantle 需要在风险模型里分开描述“快速确认层的 PQ readiness”和“最终结算层的 PQ readiness”。SP1/zkVM 方向也应跟踪 hash-based proof/signature compatibility。

## 建议 Mantle 关注
- 内部安全模型增加 PQ migration timeline watchlist。
- prover 团队跟踪 leanVM、leanSig、hash-based proof compression。
- bridge/explorer 文案避免把 PQ readiness 写成单一布尔值。
- incident response 文档关注 timeliness detector / 51% recovery 研究。

## Sources
- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://pq.ethereum.org/
- https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566
- https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763
- https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925



---

# 05 Teragas L2：PeerDAS 与 DA 容量增长

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
teragas L2、1 Gbyte/sec、data availability increases、PeerDAS / EIP-7594、blob target/max bump / EIP-7691、BPO forks / EIP-7892、FullDAS / danksharding、leanDA / PQ leanDA sampling。

## 一页结论
DA 路线的核心是把 L2 数据容量从“每个节点全量下载”推进到“节点抽样验证可用性”。PeerDAS 已随 Fusaka 进入已上主网语境，BPO1/BPO2 也应写成已激活而不是待部署；但 `teragas L2` 和 `1 Gbyte/sec` 仍是 north-star。对 Mantle 来说，Fable 指出的核心修正成立：Mantle 现应按 Ethereum blobs/calldata 主 DA、OP Succinct/SP1 validity proofs 的 ZK rollup 来分析，而不是按旧的 external-DA-first + blob fallback 叙事来分析。[L2Beat Mantle](https://l2beat.com/scaling/projects/mantle), [Mantle blob transition](https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html)

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| PeerDAS / EIP-7594 | blob 扩容若要求全节点下载，会线性推高带宽 | erasure coding、cells/columns、custody sampling。[EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) | 多数节点只下载部分数据，DA capacity 可扩张 |
| EIP-7691 blob bump | 4844 后 blob supply 仍紧 | Pectra 历史项，把 blob target/max 提到 6/9。[EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) | 已完成的短期 DA headroom 增量，不应再写成未来项 |
| BPO / EIP-7892 | 每次 blob 参数调整都 full hard fork 太重 | Blob-Parameter-Only forks 基于 EIP-7840 配置参数。[EIP-7892](https://eips.ethereum.org/EIPS/eip-7892) | blob capacity 可更频繁调整 |
| FullDAS / danksharding | PeerDAS 仍是一维采样和阶段性扩容 | 2D erasure coding 与更完整 DAS。[danksharding](https://ethereum.org/roadmap/danksharding/) | 长期支持更高 DA north-star，但仍需研究和优化 |
| leanDA / PQ leanDA | exact label 无 canonical source | 映射到 PQ data roadmap / leanVM -> PQ blobs。[pq.ethereum.org](https://pq.ethereum.org/) | 作为长期 PQ DA 方向 caveat，而非确定功能 |

## 当前瓶颈
L2 扩容的实际成本大部分落在 DA 上。若所有节点全量下载所有 blobs，DA 扩容会牺牲节点去中心化。即使 PeerDAS 解决可用性抽样，blob propagation、pricing、calldata fallback policy 仍会影响 L2 成本。2026-07 的基线应写清：EIP-7691/Pectra 已给出 6/9 blob target/max；BPO1 把参数推到 10/15；BPO2 把参数推到 14/21；后续 BPO 需要继续看需求和网络 telemetry，而不是线性外推。

## 优化机制
PeerDAS 把 blob 扩展成 cells/columns，节点按 custody/subnet 抽样；BPO 让参数更新更轻；FullDAS 继续向二维采样推进。状态 freshness 核查显示：截至 2026-07-06，PeerDAS/EIP-7594 为 Final 且已随 Fusaka 上主网，BPO1/BPO2 是已激活参数 fork。[ethereum roadmap](https://ethereum.org/roadmap/), [EIP-8134](https://eips.ethereum.org/EIPS/eip-8134), [EIP-8135](https://eips.ethereum.org/EIPS/eip-8135)

## 未来效果
L2 会获得更大 Ethereum DA headroom，blob congestion 的边际压力下降，Ethereum-DA rollup 的主路径更可运营。但价格不会自动归零；更大供给还会被 pricing、reservation、blobpool 和 demand 吸收。对 Mantle 而言，关键问题从“是否启用外部 DA fallback”变成“blob 主路径、calldata fallback、batch compression、posting cadence 如何共同决定成本和可靠性”。

## 依赖与先后关系
EIP-4844 是基础；EIP-7691/Pectra 是已完成的短期 bump；PeerDAS 是容量扩展核心；BPO 负责后续参数节奏；EIP-8070/8136/8256 等 propagation 层优化在 PeerDAS 之后发挥更大作用。

## 风险与未决问题
DAS 安全依赖足够大的、连接良好的 sampling network。`1 Gbyte/sec` 不应写成参数。`leanDA/PQ leanDA` 目前没有公开 canonical source，应放在模糊标签附录。

## 对 Mantle 的影响
Mantle 的 DA 章节需要从旧的 external-DA-first 叙事改成 Ethereum-DA rollup 运营叙事。L2Beat 当前描述为交易数据发布到 Ethereum blobs、状态转换由 OP Succinct/SP1 validity proofs 链上验证；Mantle 2026-01 公告也把转向 Ethereum blobs 描述为通往 full Ethereum ZK rollup architecture 的一步。EigenDA 仍可作为历史架构和 EigenLayer 生态关系背景，但不应作为当前主 DA 前提。

## 建议 Mantle 关注
- 建立 blob 主路径 runbook：blob fee spike、blob inclusion delay、calldata fallback、batch backlog。
- 在 Arsia 后 L1 data fee model 下比较 blobs vs calldata，不再使用 EigenDA-only / mixed DA 作为主决策矩阵。
- 将 DA bridge verification、data-root API、replayability、batch repost policy 纳入 SLO。
- 不把 teragas/1GB/s 写进近期 capacity 承诺。

## Sources
- https://ethereum.org/roadmap/fusaka/peerdas/
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-7691
- https://eips.ethereum.org/EIPS/eip-7892
- https://eips.ethereum.org/EIPS/eip-7840
- https://eips.ethereum.org/EIPS/eip-8134
- https://eips.ethereum.org/EIPS/eip-8135
- https://ethereum.org/roadmap/danksharding/
- https://pq.ethereum.org/
- https://l2beat.com/scaling/projects/mantle
- https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html



---

# 06 Blob 传播、Custody 与 Streaming

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
sparse blobpool / EIP-8070、cell-level deltas / EIP-8136、local blob reconstruction、proofs of custody、blob streaming / EIP-8256、short-dated blob futures / ticketed AOT / BLOBBASEFEE futures。

## 一页结论
PeerDAS 解决“是否可用”的抽样问题，但不自动解决“数据如何高效传播”。这组优化把 blob 传播从 EL full-replication blobpool 推向 custody-aligned sampling、cell delta、local reconstruction 和 ticketed pre-propagation。对 Mantle 来说，最直接的影响是 batch posting 可靠性与提交窗口管理：未来不只是抢 critical path，而可能提前购买/预传播容量。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| Sparse blobpool / EIP-8070 | EL blobpool 全量复制会成为带宽主导项 | EL 节点按概率 full-fetch，其余按 CL custody columns sampling。[EIP-8070](https://eips.ethereum.org/EIPS/eip-8070) | 平均 blobpool 带宽下降，builders 仍可 full-fetch |
| Cell-level deltas / EIP-8136 | 节点已有多数 cells 时仍重复传输 whole columns | 通过 bitmap/partial messages 只交换 missing cells。[EIP-8136](https://eips.ethereum.org/EIPS/eip-8136) | 降低冗余流量和 CL 等待时间 |
| Local blob reconstruction | DAS 下不是所有节点都有完整 blob | 足够 columns/cells 后本地重构 blob/proofs。[EIP-8070](https://eips.ethereum.org/EIPS/eip-8070) | 提升恢复和验证能力 |
| Proofs/custody alignment | 抽样节点需要证明/履行所 custody 数据 | PeerDAS custody 与 EL sampling 对齐。[EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) | 可用性安全不依赖每节点全量下载 |
| Blob streaming / EIP-8256 | pre-propagation 无上界，JIT blob 留在 critical path | AOT/JIT 分流，AOT 用 ticket 预购买并经 CL gossip 预传播。[EIP-8256](https://eips.ethereum.org/EIPS/eip-8256) | 已知批次可提前准备，降低 critical-path 压力 |
| Short-dated blob futures | 术语有两层：blob fee futures 与 AOT reservation | `BLOBBASEFEE` 支持 blob futures；EIP-8256 支持 ticketed capacity reservation。[EIP-7516](https://eips.ethereum.org/EIPS/eip-7516) | 既可做价格/费用工具，也可做操作性预留，需分开写 |

## 当前瓶颈
Blob 需求上升后，full EL blobpool 会和 block、attestation、DAS traffic 抢带宽。PeerDAS 让节点不用全量下载，但 gossip、missing cells、custody peers、AOT/JIT 分类仍会决定实际可用性。

## 优化机制
EIP-8070 让大多数 EL 节点成为 sampler；EIP-8136 用 partial message 发送缺失 cells；EIP-8256 把部分 blob 从 critical path 前移到 ticketed AOT path。三者分别处理平均带宽、冗余传播、提交窗口。

## 未来效果
Mantle 这类 L2 的 batch posting 会获得更可预测的提交路径：紧急批次走 JIT，计划批次走 AOT；网络拥堵时通过 delta/custody 减少传播失效。但这也带来 ticket inventory、expiry、reorg invalidation、key/signature handling 等新 ops 问题。

## 依赖与先后关系
PeerDAS 是基础；EIP-8136 和 EIP-8070 是 PeerDAS 上的传播优化；EIP-8256 是更高级的 capacity scheduling。Short-dated futures 要在报告中拆成 BLOBBASEFEE fee futures 与 AOT reservation 两条。

## 风险与未决问题
Sparse sampling 可能受 eclipse/peer scoring/RBF 影响；AOT/JIT 分类、ticket front-running、reorg handling、EL mempool 移除都有争议。状态上要分开写：EIP-8070 和 EIP-8136 已进入 Glamsterdam CFI networking 清单；EIP-8256 仍按 draft/research 处理。[EIP-7773](https://eips.ethereum.org/EIPS/eip-7773)

## 对 Mantle 的影响
Mantle 应把 batch posting 从“等 blob slot”升级成“容量库存管理”：提前决定哪些 batch 可 AOT，哪些必须 JIT；监控 ticket、custody health、JIT/AOT ratio、blobpool bandwidth。因为 Mantle 现在应按 Ethereum blobs 主 DA 来看，这组优化的权重上升：EIP-8070/8136 影响常态 blobpool 带宽和传播可靠性，EIP-8256 影响未来是否能把计划批次从 critical path 前移。

## 建议 Mantle 关注
- 设计 batch scheduler：urgent JIT vs planned AOT。
- 建立 ticket inventory / expiry / reorg 风险监控。
- 监控 PeerDAS custody-set 与 EL sampler/provider balance。
- 区分 blob fee hedging 与 blob capacity reservation。

## Sources
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-8256
- https://eips.ethereum.org/EIPS/eip-7516
- https://eips.ethereum.org/EIPS/eip-7773
- https://ethereum-magicians.org/t/eip-8070-sparse-blobpool/26023
- https://ethereum-magicians.org/t/eip-8256-blob-streaming/28586



---

# 07 资源定价：Blob、Byte Floors、多维 Fee 与 Futures

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
EIP-7918 blob fee floor、EIP-7999 unified multidimensional fee market、EIP-8007 repricing meta、Glamsterdam SFI repricing（EIP-7976/7981/8037）与 CFI repricing（EIP-8038）、EIP-8131/8279/8311 byte floors、short/long-dated gas futures。

## 一页结论
扩容如果没有定价修正，会把瓶颈从“容量不足”转成“错误资源太便宜”。这组优化把 blob、calldata、BAL bytes、state creation/access 等资源重新定价，并尝试把多资源预算统一。对 Mantle 来说，这是 Ethereum blobs 主 DA、calldata fallback、MNT gas 经济、用户 fee 稳定性和 treasury hedging 的核心输入。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| EIP-7918 | blob fee 可能相对 execution 成本过低 | blob base-fee floor 绑定 execution cost。[EIP-7918](https://eips.ethereum.org/EIPS/eip-7918) | blob 价格更能反映 L1 资源；已 Final/Fusaka |
| EIP-7999 | gas/blob 等资源 fee caps 分裂，用户过度预留 | 单 aggregate `max_fee` + vectorized accounting。[EIP-7999](https://eips.ethereum.org/EIPS/eip-7999) | fee UX 更统一，但 builder packing 更复杂 |
| EIP-8007 | repricing proposals 分散 | Meta EIP 目录化 Glamsterdam repricings。[EIP-8007](https://eips.ethereum.org/EIPS/eip-8007) | 治理/讨论更清楚，但本身不是 fee rule |
| EIP-7976/7981 | calldata floor、access-list 成本偏低，可能成为 cheap-byte/state-access bypass | Glamsterdam SFI：提高 calldata floor 与 access-list cost。[EIP-7976](https://eips.ethereum.org/EIPS/eip-7976), [EIP-7981](https://eips.ethereum.org/EIPS/eip-7981) | 近期最影响 rollup calldata fallback 和高字节交易的 repricing |
| EIP-8037/8038 | state creation/access 成本低估，gas limit 上升会推高 state bloat | EIP-8037 是 Glamsterdam SFI，EIP-8038 是 Glamsterdam CFI；分别处理 state creation bytes 与 state access/account writes。[EIP-8037](https://eips.ethereum.org/EIPS/eip-8037), [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038) | 更可持续的 gas-limit growth，但应用兼容性受影响 |
| EIP-8131/8279/8311 | calldata、tx content、BAL bytes 可形成 cheap-byte bypass | 8131 延续/统一 7976/7981 的 transaction-content floor；8279 处理 BAL bytes；8311 提出更高 floor。[EIP-8131](https://eips.ethereum.org/EIPS/eip-8131), [EIP-8279](https://eips.ethereum.org/EIPS/eip-8279), [EIP-8311](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md) | 降低 worst-case block bytes，为 gas 扩容留空间 |
| Gas/blob futures | L2/应用难以预算未来 L1 成本 | BASEFEE/BLOBBASEFEE 驱动的 futures/advance purchase 研究。[BASEFEE](https://eips.ethereum.org/EIPS/eip-3198), [gas advance](https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069) | 可能支持 treasury hedge，但多数仍是 research-only |

## 当前瓶颈
Ethereum 资源不是单一 gas 能准确表示的：execution、bytes、state growth、blob DA、BALs、KZG/proof 负载都不同。扩容前若不重定价，攻击者会选择最便宜资源打满瓶颈。

## 优化机制
短期通过 blob floor、Glamsterdam SFI repricing、byte floor、state repricing 修补具体 bypass；中期 EIP-7999 尝试统一多维资源预算；长期 futures/advance-purchase 研究尝试把未来费用变成可规划或可对冲资产。calldata/byte floor 时间线应按 7976/7981（Glamsterdam SFI）-> 8131（Hegotá PFI / 后续统一 floor）-> 8311（更新提案、更高 floor）来讲，而不是只拿未排期 EIP 讲叙事。Strawmap 的 `data repricing` 方块还链接到 Hegotá repricing 目录页，可作为跨 EIP 入口而非单独机制。

## 未来效果
如果落地，Mantle 面对的 L1 成本会更真实也更可预测：便宜 DA 时代可能结束，但极端拥堵和错价攻击会减少。用户 fee 可能更稳定，treasury 能更好预算，但高 byte / high state workload 成本会提高。

## 依赖与先后关系
EIP-7918 已 Final；EIP-7976/7981/8037 是 Glamsterdam SFI；EIP-8038 是 Glamsterdam CFI；EIP-7999 依赖 EIP-7918 等基础；EIP-8279 依赖 BALs；EIP-8131 是 Hegotá PFI；futures 仍主要是研究层，不应写入近期 roadmap。

## 风险与未决问题
主要争议是 fee market recoupling、多维 packing builder centralization、repricing 对应用的破坏、复杂性是否超过收益、以及 futures 与 EIP-1559 burn 机制的张力。[in-protocol futures](https://ethresear.ch/t/on-in-protocol-gas-futures/23698)

## 对 Mantle 的影响
Mantle 的主 DA 成本会受 blob floor、blob base fee 与 multidimensional pricing 影响；calldata fallback 会直接暴露在 EIP-7976/7981/8131/8311 这条 byte-floor 线上。MNT gas token 与 L1 posting 支出形成 treasury exposure。Mantle 应在 Arsia L1 data fee model 下把 blob cost、calldata fallback、batch compression、MNT gas demand 做联合 sensitivity model。

## 建议 Mantle 关注
- 建立 DA fee model：Ethereum blobs 主路径、calldata fallback、batch compression、posting cadence。
- 对 MNT gas token 和 L1 DA 成本做 treasury stress tests。
- 跟踪 EIP-7918/7976/7981/7999/8037/8038/8131/8279/8311 对 batcher 成本的影响。
- 将 futures 视为 treasury research，不作为短期产品承诺。

## Sources
- https://eips.ethereum.org/EIPS/eip-7918
- https://eips.ethereum.org/EIPS/eip-7999
- https://eips.ethereum.org/EIPS/eip-8007
- https://eips.ethereum.org/EIPS/eip-7976
- https://eips.ethereum.org/EIPS/eip-7981
- https://eips.ethereum.org/EIPS/eip-8037
- https://eips.ethereum.org/EIPS/eip-8038
- https://eips.ethereum.org/EIPS/eip-8131
- https://eips.ethereum.org/EIPS/eip-8279
- https://misilva73.github.io/hegota-repricings/
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md
- https://ethresear.ch/t/pricing-gas-fee-derivatives/19898
- https://ethresear.ch/t/on-in-protocol-gas-futures/23698



---

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



---

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



---

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



---

# 11 EVM Hardening 与 Proving Substrates

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
evm-asm canonical guest、state-asm / SAsm、zkzkRISC-V frames、LeanVM、leanSig、EVMify long-tail precompiles / EIP-8200、long-term RISC-V replacement。

## 一页结论
这组路线处理的是 proving substrate 的复杂性：EVM、precompiles、compiler trust 和 zkVM guest 都让 proof-heavy execution 难以标准化。evm-asm 走 Lean-verified RISC-V guest；LeanVM/leanSig 走 hash-based PQ-friendly zkVM/signature aggregation；EIP-8200 把 precompile 特例 EVM 化；RISC-V proposal 则更激进地考虑替换执行 substrate。Mantle 已经使用 SP1/Kona，天然更接近 zkVM-aligned future，但仍需防 precompile、gas semantics、custom STF 兼容风险。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| evm-asm canonical guest | 高级语言编译器在 proof trust boundary 外 | Lean 4 verified macro-assembler 直接生成 RISC-V guest。[evm-asm](https://github.com/Verified-zkEVM/evm-asm) | 降低 zkEVM guest TCB，提高 correctness 信心 |
| state-asm / SAsm | zkEVM guest 有动态 stack/dispatch，难证明 | static frames、named regions、finite indirect-call tables。[SAsm design](https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md) | guest 行为更静态、可界定、可验证 |
| LeanVM | PQ/hash-based proving 需在 proof size、throughput、安全间折中 | minimal hash-based zkVM with WHIR/SuperSpartan/Logup。[leanVM](https://github.com/leanEthereum/leanVM) | 为 PQ signatures/proofs 提供 substrate，但参数仍研究中 |
| leanSig | hash-based signatures state/epoch discipline 复杂 | synchronized hash-based signature tuned for leanVM aggregation。[leanSig](https://github.com/leanEthereum/leanSig) | 为 PQ attestations/auth 提供研究路径 |
| EIP-8200 | precompiles 是 client 与 zkEVM special cases | 在相同地址部署等价 EVM bytecode。[EIP-8200](https://eips.ethereum.org/EIPS/eip-8200) | 减少共识特例，但 gas/perf 改变可能破坏依赖 |
| RISC-V replacement | EVM proving 成本和执行层复杂度高 | dual-VM 或 RISC-V interpreter / direct RISC-V contracts。[RISC-V proposal](https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617) | 可能大幅降低 prover glue，但兼容性和 native 执行性能风险高 |

## 当前瓶颈
zkEVM 不是只要有 circuit 就行。真正难点包括 EVM spec conformance、precompile special cases、compiler trust、guest memory/stack model、RISC-V/native performance gap、PQ hash proof 参数。

## 优化机制
路线分为三层：先减少特例（EIP-8200），再让 guest 更可验证（evm-asm/SAsm），最后考虑执行 substrate 是否从 EVM 走向 RISC-V/LeanVM 类 zkVM-friendly ISA。

## 未来效果
证明系统可移植性更好，precompile 特例减少，guest TCB 更小，PQ/hash-based proof stack 更清晰。长期若 RISC-V 路线推进，应用层可能面对新的兼容/迁移边界。

## 依赖与先后关系
本方向依赖 proof-heavy execution 需求，也服务 PQ consensus/auth。EIP-8200 可较独立推进；evm-asm/LeanVM 是研究实现；RISC-V replacement 是长期架构讨论。

## 风险与未决问题
evm-asm 明确 experimental；leanVM/leanSig security parameters 未 production-grade；EIP-8200 会改变 gas 成本；RISC-V 可能导致 x86/ARM native execution regression；old EVM contracts 的 dual-VM/interpreter 兼容成本很高。

## 对 Mantle 的影响
Mantle 的 OP Succinct/SP1/Kona 方向使其更容易适配 zkVM-aligned prover stack。EIP-8200 可能降低 precompile proof 负担；RISC-V 则可能改变长期 STF/prover portability。Mantle 应把 precompile 使用、custom gas token、custom transaction path 纳入 native/proving compatibility audit。

## 建议 Mantle 关注
- 建立 Mantle contracts/precompiles/prover compatibility inventory。
- 跟踪 EIP-8200 对 gas-sensitive contracts 的影响。
- 关注 evm-asm、LeanVM、RISC-V 的 security parameter 和 production readiness。
- 将 STF 与 prover machinery 解耦成长期架构原则。

## Sources
- https://github.com/Verified-zkEVM/evm-asm
- https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://eips.ethereum.org/EIPS/eip-8200
- https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617
- https://succinctlabs.github.io/op-succinct/
- https://blog.succinct.xyz/case-studies/mantle/



---

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



---

# 13 Frame Transactions 与 Account/Auth Modernization

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
frame transactions / EIP-8141、keyed nonces / EIP-8250、recent roots / EIP-8272、EIP-8202 scheme-agile tx、EIP-8209 commit/reveal frames、ephemeral keys、PQ leanSPHINCS transactions、AA / sponsorship / key rotation。

## 一页结论
这组路线改的是 transaction envelope 和 account validation，不只是钱包 UX。EIP-8141 让 validation/payment/execution frame 化；EIP-8250 解决单 sender nonce 串行；EIP-8272 让验证引用 bounded recent roots；EIP-8202 提供 flat scheme-agile 替代。对 Mantle 来说，它会影响 smart wallet、gas sponsorship、relayer/sequencer mempool policy、PQ auth migration。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| EIP-8141 Frame Tx | 当前 tx 格式限制 AA/PQ/key rotation/sponsorship | validation/payment/user-op frames + APPROVE step。[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | 原生 batching、sponsorship、key rotation、PQ auth 更容易 |
| Public mempool validation | arbitrary validation code 易 DoS 和被 shared-state invalidated | 限定 public propagation 的 validation prefix。[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | 保持 permissionless mempool 但降低 DoS |
| Keyed nonces / EIP-8250 | 单 sender nonce 串行化共享 sender/privacy/relayer flows | `(nonce_keys, nonce_seq)`：最多 16 个严格递增 keys 共享一个 uint64 sequence，存于 `NONCE_MANAGER`；不是 per-key `(key, seq)` pair。[EIP-8250](https://eips.ethereum.org/EIPS/eip-8250) | 同一 sender 可并发多 flow，但只在 disjoint key sets 上解除 replay-ordering dependency |
| Recent roots / EIP-8272 | validation 想读近期状态但 mutable storage 影响 mempool validity | 预声明 `(source_id, slot, root)`，执行前验证。[EIP-8272](https://eips.ethereum.org/EIPS/eip-8272) | bounded state dependency，支持 privacy/wallet roots |
| EIP-8202 | frame recursion 复杂，方案敏捷性不足 | flat envelope + authorization capabilities + scheme IDs。[EIP-8202](https://eips.ethereum.org/EIPS/eip-8202) | 另一条 PQ/AA envelope 路线 |
| PQ leanSPHINCS | exact label 非标准，PQ auth 有签名大小/验证成本问题 | SPHINCS+/SLH-DSA research、AA/frame/scheme agility。[SPHINCS research](https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165) | 给 user auth PQ migration 留路径，但不是定案 |

## 当前瓶颈
当前 EOA/global nonce/tx envelope 对 account abstraction、sponsorship、session keys、privacy relayers、PQ keys 都不友好。公共 mempool 又必须防止任意 validation code 的 DoS。

## 优化机制
Frame tx 将验证、支付和执行拆成 frame；keyed nonces 用共享 `nonce_seq` + 多 key set 拆 replay domain；recent roots 把状态依赖前置声明；scheme-agile tx 给签名方案迁移留接口；PQ auth 通过 AA/frames 或新 envelope 渐进引入。Strawmap 的 `ephemeral keys` 方块有 canonical ethresear.ch 来源，应作为 PQ/account-abstraction 迁移路径补充，而非只靠 SPHINCS/AA 推断。

## 未来效果
钱包体验会更接近原生 AA：batching、gas sponsorship、key rotation、passkey/PQ auth、共享 sender 并发更自然。但 mempool policy 变复杂，relayers/sequencers 需要模拟和约束 validation。

## 依赖与先后关系
EIP-8141 是中心；EIP-8250/8272/8209 是 deltas；EIP-8202 是替代架构。状态核查显示 EIP-8141 是 Draft 且 considered for Hegotá，不是 scheduled。[EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## 风险与未决问题
风险包括 public mempool DoS、deploy frame front-running、ORIGIN semantic drift、paymaster throttling、recent-root storage growth、ephemeral-key mempool exposure、PQ standardization gap。`PQ leanSPHINCS transactions` 应作 inferred label。

## 对 Mantle 的影响
Mantle 已有 AA 教程和 OP Stack AA/P256 生态，Frame tx 会影响钱包、relayer、sponsorship、sequencer mempool。Mantle 若支持更强 AA/PQ auth，应同步制定 public vs private mempool validation policy，避免把 L1 的 DoS 问题搬到 L2。

## 建议 Mantle 关注
- 评估哪些 wallet flows 需要 keyed nonces：session keys、privacy pools、shared senders、relayers。
- 设计 bounded validation / paymaster throttling / stale-state recheck policy。
- 比较 EIP-8141 frame model 与 EIP-8202 flat envelope 对 Mantle 的兼容性。
- 将 PQ auth 分成 now path（AA/scheme agility）和 later path（standardized PQ signatures）。

## Sources
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://eips.ethereum.org/EIPS/eip-8202
- https://eips.ethereum.org/EIPS/eip-8209
- https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://www.mantle.xyz/blog/developers/account-abstraction-mantle-etherspot-prime-sdk



---

# 14 Private L1：Encrypted Mempool、Shielded Transfers 与 Privacy Roadmap

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
private L1、privacy mempool、encrypted mempool / LUCID / EIP-8184、distributed encrypted mempool、GhostPool、shielded transfers、lean privacy wormholes、FOCIL relation、frame tx relation。

## 一页结论
Private L1 不是单一功能，而是三层问题：mempool 内容/意图隐私、admission metadata 隐私、onchain value transfer 隐私。LUCID/EIP-8184 是最接近协议化的 encrypted mempool；GhostPool 隐藏 sender/nonce 等 admission metadata；shielded transfers 隐藏合约内转账信息。对 Mantle 来说，fair sequencing 和 transparent MEV capture 不是 transaction confidentiality；如果 L1 提供 public encrypted mempool，L2 会面临隐私 parity 压力。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| LUCID / EIP-8184 | public mempool 泄露交易内容和排序机会；private orderflow 强化 builder | sealed tx、commit-before-reveal、FOCIL-backed inclusion、delayed key release。[EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | 公开路径也能承载 MEV-sensitive encrypted flow |
| Distributed encrypted mempool | 单一加密方案/relay 依赖不理想 | threshold encryption、proposer commitments、PBS integration。[encrypted mempool](https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717) | 模块化 encrypted inclusion architecture |
| GhostPool | encrypted mempool admission 仍泄露 sender/nonce | root-bound ZK proof + shared nullifier namespace。[GhostPool](https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327) | 隐藏身份关键 metadata，但 gas/fee/network metadata 仍可见 |
| Shielded transfers | L1 合约转账公开 sender/recipient/amount | commitment/nullifier 合约池。[shielded transfers](https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424) | 合约内 value transfer 隐私，不等于 mempool 隐私 |
| FOCIL relation | encrypted tx 若不能强制 inclusion，仍可被审查 | FOCIL 提供 inclusion backbone。[EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) | 抗审查和隐私结合 |
| Lean privacy wormholes | exact label 非 canonical | 映射到 Zero-Knowledge Wormholes / native privacy。[EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) | 长期 privacy primitive，不是已定功能 |

## 当前瓶颈
Public mempool 暴露内容、intent、sender/nonce、timing、gas parameters，让 MEV、copy trading、censorship、account linkability 成为常态。Private orderflow 保护用户但牺牲公共可验证性和去中心化。

## 优化机制
LUCID 把交易密文纳入 inclusion pipeline，先 commitment 后 reveal；GhostPool 用 proofs/nullifiers 保护 admission metadata；shielded transfers 用 commitment tree 隐藏转账内容；FOCIL/frame tx 分别提供 inclusion 与 validation/payment 基础。

## 未来效果
L1 可能拥有可公开传播、抗审查、内容加密的交易 lane。用户不必完全依赖 private relay；但 metadata 泄漏不会归零，key publishers、PTC timing、fee fields、network origin、contract touch patterns 仍可暴露信息。

## 依赖与先后关系
EIP-8184 依赖 EIP-7805/FOCIL；frame tx 增加 arbitrary validation surface，可能需要 recent roots/keyed nonces/validation policy；GhostPool 可横向补 admission privacy；shielded transfers 是应用/合约层而非 mempool 层。

## 风险与未决问题
LUCID 风险包括 reveal optionality、low ToB DoS、key publisher trust、PTC bribery/timing、metadata leakage。GhostPool 留下 fee/network metadata。Shielded pools 有 tree growth、viewing key 和 UX friction。EIP-8184 仍 Draft 且未列入 fork meta。

## 对 Mantle 的影响
Mantle fair sequencing 解决 ordering fairness 和部分 MEV/censorship 问题，但不等于 encrypted mempool；现有公开材料更像 2024-02 研究提案，不能写成已部署隐私能力。若 L1 推进 LUCID，Mantle 需要决定是否提供 L2 encrypted orderflow parity，或明确告诉用户 Mantle 的隐私边界。Fair sequencing、MEV revenue capture、privacy guarantees 必须分开陈述。

## 建议 Mantle 关注
- 对外文案拆分 fairness、MEV resistance、censorship resistance、confidentiality。
- 建立 sandwich/front-run/private-orderflow monitoring。
- 研究 L2 encrypted mempool 是否与 Mantle fair sequencing/MEV capture 兼容。
- 跟踪 EIP-8184、GhostPool、FOCIL/frame tx 组合路线。

## Sources
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717
- https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327
- https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424
- https://eips.ethereum.org/EIPS/eip-7503
- https://www.mantle.xyz/blog/research/fair-sequencing
- https://ethresear.ch/t/fairflow-building-a-transparent-l2-mev-economy/22146



---

# Appendix A：Fork Status、North-Star 与时间线 Caveats

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 为什么需要这个附录
Strawmap 把研究方向、EIP 状态、fork 候选、长期 north-star 和视觉标签放在同一张图里。给 Mantle dev team 同步时，必须把“已生产”“scheduled”“considered”“draft research”“north-star”拆开，否则容易把路线图误读成承诺。

## 状态表（2026-07-06）
| 项目 | 当前状态 | 应如何写 |
|---|---|---|
| Fusaka | In production | 已生产，不要写成 pending |
| PeerDAS / EIP-7594 | Final，已随 Fusaka 上主网 | DA scaling 已进入主网阶段，但后续 FullDAS 仍未来 |
| BPO1 / BPO2 | 已激活 mainnet parameter forks | 已激活，不是待部署 |
| EIP-7918 | Final，Fusaka included | blob fee floor 已 Final |
| Glamsterdam | In development，final devnet / mainnet 预期约 2026 Q3-Q4 | 仍开发中；不要写成已激活 |
| EIP-7732 ePBS | Draft，scheduled for Glamsterdam | 可写 scheduled，但不是 deployed |
| EIP-7928 BALs | Draft，scheduled for Glamsterdam | 可写 scheduled，但不是 deployed |
| EIP-7976 / EIP-7981 / EIP-8037 | Glamsterdam SFI repricing | calldata/access-list/state-creation repricing 是近期成本模型输入 |
| EIP-8038 / EIP-8070 / EIP-8136 / EIP-8159 / EIP-8189 | Glamsterdam CFI | 可写 considered，但不是 scheduled |
| Hegotá | In development，目标 2026 Q4，现实可能滑入 2027；Strawmap 放在 2027 列 | 仍开发中，且依赖 Glamsterdam 进度 |
| EIP-7805 FOCIL | Draft，scheduled for Hegotá | 可写 scheduled，但不是 deployed |
| EIP-8141 Frame Tx | Draft，considered for Hegotá | 只能写 considered，不能写 scheduled |
| EIP-8131 | Hegotá PFI | 可作为后续 tx-content floor 方向，不写 scheduled |
| EIP-8184 LUCID | Draft，未列入 fork meta | 不要写 fork-scheduled |
| EIP-7938 | Stagnant | 不要写 active gas-limit plan |
| EIP-8025 | Stagnant | 可作为 optional proof concept，不作 active fork |
| EIP-6800 / EIP-7736 / EIP-7919 / EIP-7503 | Stagnant | Verkle/state expiry/Pureth/wormholes 相关内容需软化 |
| EIP-7935 | Final，Fusaka | 60M default gas-limit 是当前执行层基线 |

## 2026-07 基线数字
- Blob capacity：EIP-7691/Pectra 为 6/9 target/max；BPO1 为 10/15；BPO2 为 14/21。后续 BPO 应看 demand 与 network telemetry，而非线性承诺。
- Execution gas：EIP-7935 已 Final，Fusaka 默认 gas-limit 目标为 60M；Glamsterdam 的 200M gas 只能写作设计目标/外部报道中的最低可信容量目标，不是 fork 强制参数。
- Fast L1：EIP-8198 把 slot duration 参数化，常见讨论是 12s -> 8s，但 8s 仍是占位/候选目标。
- FOCIL：EIP-7805 的 committee/IL 参数应随 spec 变化跟踪；报告中只把它作为 Hegotá scheduled inclusion-list 方向，不把具体数值写死。

## North-star 标签处理
- `fast L1`、`gigagas L1`、`teragas L2`、`post quantum L1`、`private L1` 是方向性目标，不是 hard-fork 参数。
- `1 Gbyte/sec`、`1 Ggas/sec` 等数字应写作 north-star / benchmark / research target，除非对应 EIP 明确给出参数。
- 图中的年份、I*/J*/K*/L* 等视觉分组不能自动等同于 confirmed schedule。
- Strawmap 图例中的 question-mark 标记表示“是否会 ship 仍不确定”；snail issuance、1M attestations、attester-proposer separation、VDF、secret proposers、proofs of custody、short/long-dated futures、endgame state 等标签需要延续这种不确定性分级。

## 对 Mantle 同步时的推荐写法
- “PeerDAS/Fusaka 已上主网，后续容量增长由 BPO/FullDAS 等继续推进。”
- “ePBS/BALs 是 Glamsterdam scheduled items，但 Glamsterdam 尚未生产。”
- “FOCIL 是 Hegotá scheduled item；Frame Tx 只是 considered。”
- “Private L1 / LUCID / native rollups / PQ CL 大多仍是 draft 或 research，应按长期 watchlist 管理。”

## Sources
- https://ethereum.org/roadmap/
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-7723
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-8134
- https://eips.ethereum.org/EIPS/eip-8135
- https://eips.ethereum.org/EIPS/eip-7918
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-7935
- https://eips.ethereum.org/EIPS/eip-7976
- https://eips.ethereum.org/EIPS/eip-7981
- https://eips.ethereum.org/EIPS/eip-8037
- https://eips.ethereum.org/EIPS/eip-8038
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-8159
- https://eips.ethereum.org/EIPS/eip-8189
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-8184
- https://thedefiant.io/news/blockchains/ethereum-glamsterdam-final-devnet-200m-gas-limit-target



---

# Appendix B：模糊 Strawmap 标签 Crosswalk

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 读法
本附录把没有清晰 canonical EIP/source 的 Strawmap 标签拆成三类：confirmed、inferred、unresolved。`inferred` 可以用于解释路线含义，但必须明确是映射；`unresolved` 不应写成确定功能。

| 标签 | 分类 | 最佳映射 | 写作建议 |
|---|---|---|---|
| snail issuance | unresolved | issuance policy / tempered issuance research | 写成官方 Strawmap 图上的非正式速记，正文只讨论 issuance policy |
| leanDA / PQ leanDA | inferred | PQ data roadmap、leanVM -> PQ blobs | 写成长期 PQ DA shorthand |
| short-dated blob futures | confirmed + dual meaning | BLOBBASEFEE-driven blob futures；另有 EIP-8256 ticketed reservation | 同时区分价格 futures 与容量 reservation |
| long-dated gas futures | confirmed | BASEFEE-driven gas futures / derivatives | 写成 research-only treasury hedge 方向 |
| Pureth purges | confirmed | Strawmap 链接到 EIP-7919 Pureth Meta + misc purges | 把 Pureth data/RPC verification 与 purge/state expiry 分开，并标注 EIP-7919 Stagnant |
| partial binary tree | inferred | unified binary tree / binary Merkle tree / EIP-7864 | 写成 binary-tree state commitment 方向 |
| optional 2-of-3 proofs | confirmed | Strawmap 链接到 EIP-8025；Vitalik Surge 描述 2-of-3 multi-proof framing | 写作 optional proofs + multi-prover threshold research，并标注 EIP-8025 Stagnant/Hegotá PFI |
| mandatory 1-of-1 proofs | confirmed | Strawmap 链接到 EIP-8142 / Block-in-Blobs；mandatory proof regime | 写作 mandatory proof regime + BiB DA binding，不再写成错误标签 |
| attester-proposer separation | confirmed label/link mismatch | Strawmap 标签写 attester-proposer separation，但链接指向 attester-includer separation 研究帖 | 正文可用 attester-includer separation 解释，并提示标签/链接不一致 |
| lean privacy wormholes | inferred | Zero-Knowledge Wormholes / native privacy | 写成 privacy primitive mapping，不写 lean-specific spec |
| specs quantum | inferred | PQ roadmap / Lean Ethereum / cryptographic agility | 写成 PQ spec modernization shorthand |
| PQ leanSPHINCS transactions | inferred | PQ transaction signatures / SPHINCS+ / SLH-DSA / AA | 写成 PQ auth research，不写已标准化交易类型 |

## 对正文的约束
- 如果某个标签是 inferred/unresolved，正文必须显式 caveat。
- 不能把 eth2030/Strawmap gap-analysis 标签等同于 finalized Ethereum roadmap；eth2030 是第三方个人仓库，应标注为非官方辅助材料。
- `short-dated blob futures` 在本次深挖中比上一版更明确：它既可指 BLOBBASEFEE 支持的 blob gas futures，也可能与 EIP-8256 capacity reservation 产生叙事重叠；二者应分开。
- 官方 SVG 中还有一个 Google Doc 链接在当前环境返回 401/不可访问；相关标签只能作为无法复核的官方链接处理。

## Sources
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/GAP_ANALYSIS.md
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/ROADMAP.md
- https://eips.ethereum.org/EIPS/eip-7516
- https://eips.ethereum.org/EIPS/eip-3198
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-8142
- https://vitalik.eth.limo/general/2024/10/17/futures2.html
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://eips.ethereum.org/EIPS/eip-7503
- https://ethresear.ch/t/wormholes-and-the-cost-of-plausible-deniability/23728
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://pq.ethereum.org/



---

# Detailed Report Source Ledger

Total unique URLs: 122

| # | URL |
|---|---|
| D1 | https://fastconfirm.it/ |
| D2 | https://eips.ethereum.org/EIPS/eip-8198 |
| D3 | https://ethereum.org/roadmap/single-slot-finality/ |
| D4 | https://notes.ethereum.org/%40vbuterin/single_slot_finality |
| D5 | https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527 |
| D6 | https://eips.ethereum.org/EIPS/eip-7732 |
| D7 | https://eips.ethereum.org/EIPS/eip-7805 |
| D8 | https://ethresear.ch/t/towards-attester-includer-separation/21306 |
| D9 | https://ethresear.ch/t/building-towards-multi-party-block-construction/24975 |
| D10 | https://eips.ethereum.org/EIPS/eip-8184 |
| D11 | https://eips.ethereum.org/EIPS/eip-7773 |
| D12 | https://eips.ethereum.org/EIPS/eip-8081 |
| D13 | https://ethresear.ch/t/trustless-payments-and-relays/25125 |
| D14 | https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219 |
| D15 | https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418 |
| D16 | https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856 |
| D17 | https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928 |
| D18 | https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747 |
| D19 | https://blog.ethereum.org/2025/07/31/lean-ethereum |
| D20 | https://github.com/leanEthereum/leanSpec |
| D21 | https://ethresear.ch/t/faq-ethereum-issuance-reduction/19675 |
| D22 | https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040 |
| D24 | https://pq.ethereum.org/ |
| D25 | https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566 |
| D26 | https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763 |
| D27 | https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925 |
| D28 | https://ethereum.org/roadmap/future-proofing/quantum-resistance/ |
| D29 | https://eips.ethereum.org/EIPS/eip-7594 |
| D30 | https://eips.ethereum.org/EIPS/eip-7691 |
| D31 | https://eips.ethereum.org/EIPS/eip-7892 |
| D32 | https://ethereum.org/roadmap/danksharding/ |
| D33 | https://ethereum.org/roadmap/ |
| D34 | https://eips.ethereum.org/EIPS/eip-8134 |
| D35 | https://eips.ethereum.org/EIPS/eip-8135 |
| D36 | https://ethereum.org/roadmap/fusaka/peerdas/ |
| D37 | https://eips.ethereum.org/EIPS/eip-7840 |
| D39 | https://eips.ethereum.org/EIPS/eip-8070 |
| D40 | https://eips.ethereum.org/EIPS/eip-8136 |
| D41 | https://eips.ethereum.org/EIPS/eip-8256 |
| D42 | https://eips.ethereum.org/EIPS/eip-7516 |
| D43 | https://ethereum-magicians.org/t/eip-8070-sparse-blobpool/26023 |
| D44 | https://ethereum-magicians.org/t/eip-8256-blob-streaming/28586 |
| D45 | https://eips.ethereum.org/EIPS/eip-7918 |
| D46 | https://eips.ethereum.org/EIPS/eip-7999 |
| D47 | https://eips.ethereum.org/EIPS/eip-8007 |
| D48 | https://eips.ethereum.org/EIPS/eip-8037 |
| D49 | https://eips.ethereum.org/EIPS/eip-8038 |
| D50 | https://eips.ethereum.org/EIPS/eip-8131 |
| D51 | https://eips.ethereum.org/EIPS/eip-8279 |
| D52 | https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md |
| D53 | https://eips.ethereum.org/EIPS/eip-3198 |
| D54 | https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069 |
| D55 | https://ethresear.ch/t/on-in-protocol-gas-futures/23698 |
| D56 | https://ethresear.ch/t/pricing-gas-fee-derivatives/19898 |
| D57 | https://eips.ethereum.org/EIPS/eip-7938 |
| D58 | https://eips.ethereum.org/EIPS/eip-7935 |
| D59 | https://github.com/ethp2p/ethp2p |
| D60 | https://eips.ethereum.org/EIPS/eip-8077 |
| D61 | https://eips.ethereum.org/EIPS/eip-8094 |
| D62 | https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476 |
| D63 | https://ethresear.ch/t/achieving-10gigagas-s-evm-execution-with-bal-and-parallel-execution/23632 |
| D64 | https://ethresear.ch/t/worst-case-block-size-and-calldata-repricing-for-glamsterdam/23895 |
| D65 | https://specs.optimism.io/protocol/configurability.html |
| D66 | https://eips.ethereum.org/EIPS/eip-7928 |
| D67 | https://eips.ethereum.org/EIPS/eip-8159 |
| D68 | https://eips.ethereum.org/EIPS/eip-8189 |
| D69 | https://eips.ethereum.org/EIPS/eip-7862 |
| D70 | https://eips.ethereum.org/EIPS/eip-8268 |
| D71 | https://eips.ethereum.org/EIPS/eip-8142 |
| D72 | https://eips.ethereum.org/EIPS/eip-8025 |
| D73 | https://eips.ethereum.org/EIPS/eip-8079 |
| D74 | https://vitalik.eth.limo/general/2024/10/17/futures2.html |
| D75 | https://ethresear.ch/t/zk-evm-prover-input-standardization/21626 |
| D76 | https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834 |
| D77 | https://github.com/ethereum/consensus-specs/blob/master/specs/_features/eip8025/proof-engine.md |
| D78 | https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517 |
| D79 | https://ethresear.ch/t/a-native-zkevm-scales-bandwidth-not-just-execution/25254 |
| D80 | https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1 |
| D81 | https://github.com/Verified-zkEVM/evm-asm |
| D82 | https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md |
| D83 | https://github.com/leanEthereum/leanVM |
| D84 | https://github.com/leanEthereum/leanSig |
| D85 | https://eips.ethereum.org/EIPS/eip-8200 |
| D86 | https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617 |
| D87 | https://succinctlabs.github.io/op-succinct/ |
| D88 | https://blog.succinct.xyz/case-studies/mantle/ |
| D89 | https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236 |
| D90 | https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052 |
| D91 | https://eips.ethereum.org/EIPS/eip-7736 |
| D92 | https://eips.ethereum.org/EIPS/eip-6800 |
| D93 | https://eips.ethereum.org/EIPS/eip-7864 |
| D94 | https://eips.ethereum.org/EIPS/eip-7919 |
| D95 | https://vitalik.eth.limo/general/2024/10/26/futures5.html |
| D96 | https://ethereum.org/roadmap/statelessness/ |
| D97 | https://ethereum.org/roadmap/verkle-trees/ |
| D98 | https://eips.ethereum.org/EIPS/eip-8141 |
| D99 | https://eips.ethereum.org/EIPS/eip-8250 |
| D100 | https://eips.ethereum.org/EIPS/eip-8272 |
| D101 | https://eips.ethereum.org/EIPS/eip-8202 |
| D102 | https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165 |
| D103 | https://eips.ethereum.org/EIPS/eip-8209 |
| D104 | https://www.mantle.xyz/blog/developers/account-abstraction-mantle-etherspot-prime-sdk |
| D105 | https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717 |
| D106 | https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327 |
| D107 | https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424 |
| D108 | https://eips.ethereum.org/EIPS/eip-7503 |
| D109 | https://www.mantle.xyz/blog/research/fair-sequencing |
| D110 | https://ethresear.ch/t/fairflow-building-a-transparent-l2-mev-economy/22146 |
| D111 | https://eips.ethereum.org/EIPS/eip-7723 |
| D112 | https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/GAP_ANALYSIS.md |
| D113 | https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/ROADMAP.md |
| D114 | https://ethresear.ch/t/wormholes-and-the-cost-of-plausible-deniability/23728 |
| D115 | https://strawmap.org/ |
| D116 | https://l2beat.com/scaling/projects/mantle |
| D117 | https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html |
| D118 | https://eips.ethereum.org/EIPS/eip-7976 |
| D119 | https://eips.ethereum.org/EIPS/eip-7981 |
| D120 | https://notes.ethereum.org/@yannvon/S1wIxIDqbe |
| D121 | https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273 |
| D122 | https://misilva73.github.io/hegota-repricings/ |
| D123 | https://docs.google.com/document/d/e/2PACX-1vRtpbntq45GCTG3srzetWDkjsF1d-60iXL1rVeumnJW-Gbm343oV5Xvm3O6rALKJjXgr4mpL1a0uT4t/pub |
| D124 | https://thedefiant.io/news/blockchains/ethereum-glamsterdam-final-devnet-200m-gas-limit-target |



---

# Claim Ledger

| Claim | Risk | Evidence | Status |
|---|---|---|---|
| Strawmap 是 draft/strawman，不是承诺型 schedule | high | https://strawmap.org/ | verified |
| PeerDAS/EIP-7594 是 Final 且 Fusaka 已上主网 | high | https://eips.ethereum.org/EIPS/eip-7594, https://ethereum.org/roadmap/ | verified |
| BPO1/BPO2 已激活，不是 pending | high | https://eips.ethereum.org/EIPS/eip-8134, https://eips.ethereum.org/EIPS/eip-8135 | verified |
| Mantle 当前应按 Ethereum blobs/calldata 主 DA、OP Succinct/SP1 validity proofs 的 ZK rollup 分析 | high | https://l2beat.com/scaling/projects/mantle, https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html, https://blog.succinct.xyz/case-studies/mantle/ | verified, Fable P0 accepted |
| EIP-7928 scheduled for Glamsterdam | high | https://eips.ethereum.org/EIPS/eip-7773 | verified |
| EIP-7805 scheduled for Hegotá | high | https://eips.ethereum.org/EIPS/eip-8081 | verified |
| EIP-8141 considered for Hegotá only | high | https://eips.ethereum.org/EIPS/eip-8081 | verified |
| EIP-7976/7981/8037 是 Glamsterdam SFI，EIP-8038/8070/8136/8159/8189 是 Glamsterdam CFI | high | https://eips.ethereum.org/EIPS/eip-7773 | verified |
| EIP-8184 draft and not fork-scheduled | high | https://eips.ethereum.org/EIPS/eip-8184, EIP-7773/EIP-8081 absence | verified |
| EIP-7938 stagnant | high | https://eips.ethereum.org/EIPS/eip-7938 | verified |
| EIP-7935 Final sets the Fusaka default gas limit target to 60M | high | https://eips.ethereum.org/EIPS/eip-7935 | verified |
| EIP-7691 is a Pectra historical blob bump to 6/9; BPO1/BPO2 moved blob target/max to 10/15 and 14/21 | high | https://eips.ethereum.org/EIPS/eip-7691, https://eips.ethereum.org/EIPS/eip-8134, https://eips.ethereum.org/EIPS/eip-8135 | verified |
| EIP-8025, EIP-6800, EIP-7736, EIP-7919, EIP-7503 are Stagnant | high | https://eips.ethereum.org/EIPS/eip-8025, https://eips.ethereum.org/EIPS/eip-6800, https://eips.ethereum.org/EIPS/eip-7736, https://eips.ethereum.org/EIPS/eip-7919, https://eips.ethereum.org/EIPS/eip-7503 | verified |
| `snail issuance` has no protocol-grade mapping but is a non-formal shorthand on the Strawmap image | normal | exact-label/link sweep across Strawmap SVG, EIPs/EF/ethresear.ch; Appendix B | unresolved, caveated |
| `leanDA` / `PQ leanDA` are inferred labels | normal | pq.ethereum.org, ethereum.org quantum resistance | inferred, caveated |
| `short-dated blob futures` should include BLOBBASEFEE futures and not only ticketed reservation | normal | EIP-7516, eth2030 gap analysis, EIP-8256 | verified/inferred split |
| Strawmap optional 2-of-3 proofs links to EIP-8025 and can be paired with Vitalik's 2-of-3 multi-proof framing | normal | archive/initial-report/strawmap-assets/strawmap-links-clean.txt, https://eips.ethereum.org/EIPS/eip-8025, https://vitalik.eth.limo/general/2024/10/17/futures2.html | verified/caveated |
| Strawmap mandatory 1-of-1 proofs links to EIP-8142 / Block-in-Blobs | normal | archive/initial-report/strawmap-assets/strawmap-links-clean.txt, https://eips.ethereum.org/EIPS/eip-8142 | verified/caveated |
| Mantle SP1 path is live and compatible with validity-proof future but not automatically native-rollup compatible | high | https://blog.succinct.xyz/case-studies/mantle/, EIP-8079 | verified/inference, caveated |
