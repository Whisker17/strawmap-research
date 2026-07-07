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

## 深入机制拆解
### PeerDAS / EIP-7594
- PeerDAS 把 blob 数据扩展为 cells/columns，让节点按 custody responsibility 下载和验证部分数据，而不是每个节点全量下载所有 blobs。[EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- Ethereum.org 的 PeerDAS 说明把它表述为从 full download 转向 sampling；当前参数下节点下载量可降到约 `1/8`，未来还可能进一步降低。[ethereum.org PeerDAS](https://ethereum.org/roadmap/fusaka/peerdas/)
- 这类采样不直接让 DA “免费”，而是把扩容压力从每节点线性带宽变成采样网络规模、custody 分布和数据恢复能力。

### Blob bump / BPO
- EIP-7691 是已完成的短期容量 bump，解决 4844 后 blob target/max 仍偏紧的问题。[EIP-7691](https://eips.ethereum.org/EIPS/eip-7691)
- EIP-7892/BPO 的核心是把 blob 参数调整从大型 fork 中拆出来，让 `target`、`max`、`baseFeeUpdateFraction` 能以更轻的参数 fork 调整。[EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)
- BPO 不是无限扩容按钮：后续参数仍要受网络 telemetry、blobpool 传播、pricing 和客户端负载约束。

### FullDAS / leanDA caveat
- FullDAS/danksharding 继续向更完整的数据可用性采样推进，但 PeerDAS 已是当前主线的阶段性落地，而不是“尚未开始”的愿景。[danksharding](https://ethereum.org/roadmap/danksharding/)
- `leanDA / PQ leanDA` 更适合写成长期 PQ data roadmap shorthand；它没有独立 canonical EIP，不能当作确定功能名。[pq.ethereum.org](https://pq.ethereum.org/)

## 当前瓶颈
- L2 扩容的实际成本大部分落在 DA，而不是单纯执行计算。
- 若所有节点全量下载所有 blobs，DA 扩容会线性提高带宽并牺牲节点去中心化。
- PeerDAS 解决的是可用性抽样，但 blob propagation、pricing、calldata fallback policy 仍会影响 L2 成本。
- 2026-07 基线应写清：EIP-7691/Pectra、PeerDAS/Fusaka、BPO1/BPO2 属于已进入主网/激活语境，不能写成待部署愿景。

## 优化机制
- PeerDAS 把 blob 扩展成 cells/columns，节点按 custody/subnet 抽样和证明可用性。
- BPO 让 blob 参数更新更轻，避免每次容量调整都等待完整 hard fork。
- FullDAS 继续向更完整的二维采样推进，但仍是长期扩容线。
- Pricing、sparse blobpool、cell deltas 和 streaming 是 PeerDAS 之后必须补齐的运营层。

## 未来效果
- L2 会获得更大 Ethereum DA headroom，blob congestion 的边际压力下降。
- Ethereum-DA rollup 的主路径更可运营，但价格不会自动归零。
- 更大供给会被 pricing、reservation、blobpool、需求增长和 batch posting 策略共同吸收。
- 对 Mantle 而言，关键问题会从“是否有 DA”转为“blob 主路径、calldata fallback、batch compression、posting cadence 如何共同决定成本和可靠性”。

## 依赖与先后关系
EIP-4844 是基础；EIP-7691/Pectra 是已完成的短期 bump；PeerDAS 是容量扩展核心；BPO 负责后续参数节奏；EIP-8070/8136/8256 等 propagation 层优化在 PeerDAS 之后发挥更大作用。

## 风险与未决问题
DAS 安全依赖足够大的、连接良好的 sampling network。`1 Gbyte/sec` 不应写成参数。`leanDA/PQ leanDA` 目前没有公开 canonical source，应放在模糊标签附录。

## 对 Mantle 的影响
- Mantle 的 DA 章节需要避免单线绝对化：官方资料仍提 EigenDA/DA Bridge 演进，L2Beat 当前也描述 Ethereum blobs/onchain data 口径。
- 更安全的写法是：Mantle DA 架构正处于“外部 DA 降本 + Ethereum blob/onchain 可验证路径增强”的演进中，具体状态以公开资料时间点为准。
- 如果 Mantle 继续大量使用 Ethereum blobs，PeerDAS/BPO 会直接影响 DA 成本、吞吐、batch backlog 和 calldata fallback 策略。
- EigenDA 可作为历史架构、生态关系和可能的 DA 组件背景，但不宜在本报告里写成当前唯一主 DA 前提。

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
