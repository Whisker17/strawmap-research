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

## 深入机制拆解
### Blob fee floor / EIP-7918
- EIP-7918 的问题意识是：当 blob 使用者的真实成本来自执行验证、ZK 证明或优先费时，blob base fee 可能过低，甚至失去需求信号。[EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- 它给 blob fee 加 execution-cost anchor，让 blob 的 reserve price 不再只跟 blob 使用率单独漂移。
- 对 L2 来说，这会减少极端低价期的错配，但也意味着“blob 永远便宜”的假设更不可靠。

### Byte floors: calldata, access list, tx content, BAL
- EIP-7976 抬高 calldata floor，目标是压缩 pure calldata worst-case block size。[EIP-7976](https://eips.ethereum.org/EIPS/eip-7976)
- EIP-7981 把 access list 的数据 footprint 纳入 byte cost，避免通过 access list 绕过 calldata floor。[EIP-7981](https://eips.ethereum.org/EIPS/eip-7981)
- EIP-8131 进一步把 calldata、access lists、EIP-7702 authorizations、blob versioned hashes 等用户可控 tx content 放进统一 byte floor。[EIP-8131](https://eips.ethereum.org/EIPS/eip-8131)
- EIP-8279 则补上 BAL runtime bytes，避免 BAL 成为新的 cheap-byte channel。[EIP-8279](https://eips.ethereum.org/EIPS/eip-8279)

### Multidimensional fees / state repricing / futures
- EIP-7999 试图用单一 aggregate `max_fee` 覆盖多维 gas/blob/calldata 预算，缓解用户在各资源上分别过度预留的问题。[EIP-7999](https://eips.ethereum.org/EIPS/eip-7999)
- EIP-8037/8038 是状态线：8037 管 state creation bytes，8038 管 cold state/account access；它们让 gas-limit growth 不再把 state bloat 外部化。[EIP-8037](https://eips.ethereum.org/EIPS/eip-8037), [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)
- Gas/blob futures 仍主要是 treasury/research 工具，不应写成近期协议功能；它的现实用途是帮助 L2 预算未来 DA 和 execution fee 风险。[gas advance](https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069)

## 当前瓶颈
- Ethereum 资源不是单一 gas 能准确表示的：execution、bytes、state growth、blob DA、BALs、KZG/proof 负载都不同。
- 扩容前若不重定价，攻击者会选择最便宜资源打满真实瓶颈。
- Rollup calldata fallback、access lists、authorization lists、BAL bytes 都可能成为 cheap-byte bypass。
- 多资源 fee caps 分裂会让用户和钱包过度预留，或在某一维度少配一点就失败。

## 优化机制
- 短期通过 blob floor、calldata/access-list floor、BAL byte floor、state creation/access repricing 修补具体 bypass。
- 中期 EIP-7999 尝试把多维资源预算统一成一个 aggregate `max_fee`。
- 长期 futures/advance-purchase 研究尝试把未来费用变成可规划或可对冲资产。
- Calldata/byte floor 时间线应按 7976/7981、8131、8311 递进讲，而不是只拿单个未排期 EIP 讲叙事。
- Strawmap 的 `data repricing` 方块可作为跨 EIP 入口，不应被写成单独机制。

## 未来效果
- Mantle 面对的 L1 成本会更真实也更可预测，但“便宜 DA 永远存在”的假设会被削弱。
- 极端拥堵和错价攻击会减少，用户 fee 估算可能更稳定。
- 高 byte、高 state、calldata fallback 和 access-list-heavy workload 成本会提高。
- Treasury 能更好做压力测试，但需要同时建模 MNT gas demand、blob fee、calldata fallback 和 batch compression。

## 依赖与先后关系
EIP-7918 已 Final；EIP-7976/7981/8037 是 Glamsterdam SFI；EIP-8038 是 Glamsterdam CFI；EIP-7999 依赖 EIP-7918 等基础；EIP-8279 依赖 BALs；EIP-8131 是 Hegotá PFI；futures 仍主要是研究层，不应写入近期 roadmap。

## 风险与未决问题
主要争议是 fee market recoupling、多维 packing builder centralization、repricing 对应用的破坏、复杂性是否超过收益、以及 futures 与 EIP-1559 burn 机制的张力。[in-protocol futures](https://ethresear.ch/t/on-in-protocol-gas-futures/23698)

## 对 Mantle 的影响
- Mantle 的主 DA 成本会受 blob floor、blob base fee 与 multidimensional pricing 影响。
- Calldata fallback 会直接暴露在 EIP-7976/7981/8131/8311 这条 byte-floor 线上。
- MNT 是 Mantle 原生 gas token，因此 L1 posting 支出、用户 gas UX、MNT 流动性和 treasury exposure 需要放在同一个模型里。
- Mantle 应在 Arsia L1 data fee model 下联合建模 blob cost、calldata fallback、batch compression、posting cadence、MNT gas demand。

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
