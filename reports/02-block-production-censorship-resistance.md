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
