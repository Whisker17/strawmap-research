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
