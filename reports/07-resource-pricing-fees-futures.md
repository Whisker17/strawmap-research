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
