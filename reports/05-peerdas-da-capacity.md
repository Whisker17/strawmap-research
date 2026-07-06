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
