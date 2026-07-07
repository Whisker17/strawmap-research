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
| slot duration decreases | 12 秒 slot 是 inclusion latency 的底线，并且大量客户端假设写死 12 秒 | 缩短 slot，同时重新调整 proposal、attestation、aggregation deadline；EIP-8198 先把 slot duration 变成配置项。[EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | 提高 inclusion cadence / 降低 inclusion latency，但提高网络传播、硬件与边缘节点压力 |
| Quick slots / EIP-8198 | 直接改 slot 时长会触碰大量实现假设 | 引入 `SLOT_DURATION_MS` 等 runtime consensus 配置，并要求相关 blob/gas/churn 参数联动。[EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | 把“短 slot”从一次性硬分叉风险变成可阶段化参数工程 |
| SSF / one-round finality | 当前 Casper FFG finality 不是单 slot 完成；全验证者每 slot 投票又太重 | 研究单槽/单轮 finality gadget、聚合与委员会设计；近期 one-round notes 可作为 Alpenglow/Kudzu/Hydrangea/Minimmit 谱系入口。[ethereum.org SSF](https://ethereum.org/roadmap/single-slot-finality/), [one-round notes](https://notes.ethereum.org/@yannvon/S1wIxIDqbe) | 缩短不可逆结算等待，但实现难度集中在 validator set、aggregation 与网络同步 |
| Decoupled consensus | 快 slot 与快 finality 被同一投票/传播预算耦合 | 把 block production heartbeat 和 trailing finality gadget 解耦。[decoupled consensus](https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527) | 小委员会保持活性，大 finality 层并行补安全性，避免“slot 快了 finality 更慢” |

## 深入机制拆解
### FCR / fast confirmation
- FCR 不是新的 finality gadget，而是一个客户端/基础设施可消费的 head-confidence 信号：它利用 attestation 观察给当前 head 打上 fast-confirmed 状态，并在异常时回退到 finalized head。[fastconfirm.it](https://fastconfirm.it/)
- 它解决的是产品和运营层的“我能不能先展示已确认”问题，不解决“这笔交易是否不可逆”的经济终局性问题。
- 对桥和交易所来说，正确用法是把 FCR 当作低风险提示层，而不是替代提款、挑战期、证明验证或 L1 finalized checkpoint。

### Slot duration decreases / EIP-8198
- EIP-8198 的关键不是直接宣布 8 秒或 6 秒 slot，而是先把 `SLOT_DURATION_MS` 等 timing 假设从客户端硬编码改成 runtime consensus 配置。[EIP-8198](https://eips.ethereum.org/EIPS/eip-8198)
- 短 slot 会同步压缩 proposal、attestation、aggregation、blob propagation、builder payload delivery 的时间预算，所以它会放大 ePBS free option、空块率、弱连接节点掉队和 based rollup preconfirmation 的复杂度。
- 真正的工程路线应是参数化、压测、客户端性能画像、再逐步下调 slot，而不是一次性把 slot 改短。

### SSF / one-round finality / decoupled consensus
- SSF 的目标是让区块在同一个 slot 内完成最终确定，但安全语义仍是 finality：改写 finalized block 需要破坏大量 slashable stake。[ethereum.org SSF](https://ethereum.org/roadmap/single-slot-finality/)
- One-round finality 继续压缩投票轮次，但会把压力集中到验证者集合大小、签名聚合、网络同步和 adverse-network 下的及时性判断。[one-round notes](https://notes.ethereum.org/@yannvon/S1wIxIDqbe)
- Decoupled consensus 把“快速出块 heartbeat”和“较慢但更强的 finality gadget”拆开，避免委员会越小 slot 越快、finality 越慢的结构性权衡。[decoupled consensus](https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527)

## 当前瓶颈
- 用户需要低延迟确认，但 finalized checkpoint 仍是更慢、更强的安全边界。
- 12 秒 slot 是 inclusion latency 的协议节拍；缩短后会压缩 proposal、attestation、aggregation、blob propagation 和 payload validation 窗口。
- Finality 需要足够多验证者参与；若每 slot 都要求大规模投票，带宽、签名聚合和弱网络节点压力会迅速上升。
- 当前最大权衡是：小委员会利于快 slot 和可用性，大委员会利于经济安全和快速 finality。

## 优化机制
- FCR 先在客户端/基础设施层提供 fast-confirmed head，不改变 finality 规则。
- EIP-8198 把 slot timing 变成可配置协议参数，让客户端先消除硬编码和性能盲区。
- SSF/one-round finality 压缩 finality 轮次，但需要新的聚合、委员会和 validator-set 管理方案。
- Decoupled consensus 把 block-production heartbeat 与 trailing finality 分离，让快路径保活、慢路径补足经济安全。

## 未来效果
- 钱包、桥、交易所可以更早展示“高置信确认”，但仍应标出它弱于 finality。
- 短 slot 会提高正常情况下的 inclusion cadence / 降低 inclusion latency，并把 L1 节拍传导给 based rollups 和 L2 互操作。
- 若 SSF/decoupled consensus 成熟，不可逆结算等待也可能下降。
- 新瓶颈会转向网络边缘节点、payload/attestation propagation、builder timing 和错误确认的 UX 风险。

## 依赖与先后关系
FCR 可先行，因为无需 hard fork。EIP-8198 是短 slot 的基础设施。短 slot 会加剧 ePBS、FOCIL、blob propagation 与 p2p 的压力，所以不能孤立推进。SSF/decoupled consensus 依赖 validator-scale、aggregation、dynamic availability 和网络同步研究。

## 风险与未决问题
主要风险是 adverse network 下的误确认、弱客户端掉队、builder free option 被短 slot 放大、以及“用户以为 fast-confirmed 等于 finalized”。EIP-8198 仍是 draft；SSF/decoupled consensus 是研究路线，不应写成确定上线。

## 对 Mantle 的影响
- Mantle 可以把 FCR 类信号用于充值、桥接和 explorer 提示，但提款和安全关键路径仍要区分 L1 finalized、L2 proven、withdrawal ready。
- 更短 slot 会压缩 batch posting、proof submission、forced inclusion、watchdog 响应的时间预算。
- 如果 Ethereum 最终降低 finality latency，Mantle 的跨域 UX 会受益，但不能直接等同于提款即时化。
- 产品上应明确展示四种状态：`L1 fast-confirmed`、`L1 finalized`、`L2 proven`、`withdrawal ready`。

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
