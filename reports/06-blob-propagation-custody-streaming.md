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
