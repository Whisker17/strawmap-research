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
| UPIL / EIP-8046 | 满块时 IL 交易可被高费普通交易经济性挤出 | 对 inclusion-list 交易做统一价格拍卖，约束普通交易与 IL 的相对排序激励。[EIP-8046](https://eips.ethereum.org/EIPS/eip-8046) | 让 forced inclusion 不只是“能进块”，也更难被费用结构绕过 |
| Attester-includer separation | inclusion 与 state execution 混在同一路径，激励和费用不清晰 | 把 inclusion tx 与 state tx、includer 与 proposer/builder 角色拆开。[attester-includer](https://ethresear.ch/t/towards-attester-includer-separation/21306) | public inclusion 路径更清楚，给 privacy/MEV-sensitive flow 留出独立 lane |
| Distributed block building / MPBC | 单一 builder 是 chokepoint，orderflow 捕获集中 | 多方贡献 block 内容，扩大交易来源和构建参与者。[MPBC](https://ethresear.ch/t/building-towards-multi-party-block-construction/24975) | 降低单点控制，但协调、latency 与激励复杂度上升 |
| LUCID relation | FOCIL 只能强制公开传播交易，不能保护 encrypted MEV-sensitive flow | encrypted tx 依赖 FOCIL inclusion backbone，再延迟 reveal。[EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | 抗审查与隐私/MEV 保护开始组合，而非替代 |

## 深入机制拆解
### ePBS / EIP-7732
- ePBS 把区块拆成共识可先处理的部分和 execution payload 部分，让 consensus proposer 选择 execution proposer，并由 Payload Timeliness Committee 检查 payload 是否及时。[EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)
- 它降低 relay 托管信任，但不等于消灭 builder；builder 仍可能通过时序、订单流和 payload withholding 获得 free option。
- 对短 slot、FOCIL、Block-in-Blobs 和 proof-heavy execution 来说，ePBS 的价值是把 execution validation 从共识热路径中拆出来。

### FOCIL / UPIL
- FOCIL 是 committee-based inclusion list：委员会观察公共 mempool 并生成 IL，fork choice 要求区块满足这些包含约束。[EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- 它强化的是 public mempool forced inclusion，不保证私有 orderflow、公平排序或 MEV 最优性。
- UPIL 处理经济绕行：如果满块时 builder 可用高费普通交易挤掉 IL 交易，inclusion list 的抗审查效果会被费用结构削弱。[EIP-8046](https://eips.ethereum.org/EIPS/eip-8046)

### Attester-includer / MPBC / LUCID
- Attester-includer separation 把 inclusion 与 state execution 拆开，给“先保证进入公共路径，再做执行/揭示”的交易形态留出空间。
- MPBC 目前更像协议外构建层策略：多方贡献 block 内容，给未进入 base block 的交易第二条进入路径；它不要求 Ethereum 协议本身改动。[MPBC](https://ethresear.ch/t/building-towards-multi-party-block-construction/24975)
- LUCID 不是 FOCIL 的替代品，而是把 encrypted transaction 接到 forced-inclusion backbone 上：先承诺、后揭示，降低 MEV-sensitive orderflow 暴露。[EIP-8184](https://eips.ethereum.org/EIPS/eip-8184)

## 当前瓶颈
- PBS 已经让 builder/relay 成为实际出块中心，relay trust、builder concentration、private orderflow 和 censorship risk 叠加。
- 即便 L1 共识本身去中心化，用户交易是否及时进入 block 仍可能被少数专业参与者影响。
- 满块、高 MEV 和私有 orderflow 场景会削弱普通公共 mempool 交易的进入概率。
- 隐私 orderflow 如果完全走私有通道，会进一步强化 builder/orderflow 集中。

## 优化机制
- EIP-7732 把 proposer-builder separation 协议化，用 commitment 和 PTC 约束 payload timeliness。
- FOCIL 让 committee 维护 inclusion list，并通过 fork-choice enforcement 让 block 不能随意忽略公共交易。
- UPIL 把 inclusion-list 交易的经济约束补上，避免“理论上要包含、实际上被高费交易挤出”。
- Role separation / MPBC 继续拆出 includer、builder、proposer 等责任边界。
- LUCID 将 sealed transaction、commit-before-reveal 与 inclusion-list 语义组合，服务 MEV-sensitive flow。

## 未来效果
- 未来出块路径会更像多 lane 系统：public forced inclusion lane、builder/private MEV lane、encrypted lane、state execution lane。
- Ethereum 抗审查性会更可验证，但 MEV 不会消失，而是转向更复杂的费用、时序和订单流竞争。
- Builder 集中化压力会从 relay trust 转向多主体协调、key release、IL spam、payload withholding 和隐私交易揭示时机。
- 隐私/抗 MEV flow 有机会从私有 relay 迁回公开但延迟揭示的协议路径。

## 依赖与先后关系
ePBS 是基础结构，FOCIL 是 inclusion enforcement，LUCID/加密 mempool 依赖 FOCIL 但不被 FOCIL 替代。Fork meta 本身已经给出顺序关系：ePBS 在 Glamsterdam scheduled，FOCIL 在 Hegotá scheduled；二者不宜被写成同一阶段的承诺。短 slot 与更高 gas/blob throughput 会放大出块传播压力，所以本报告应与 Fast L1、Blob propagation、BALs 一起读。

## 风险与未决问题
主要风险包括 builder withholding / free option、relay 继续存在、MEV concentration 未消失、inclusion-list spam/DoS、以及多角色系统的激励复杂性。EIP-7732 和 EIP-7805 均仍需按 fork meta 谨慎表述：EIP-7732 scheduled for Glamsterdam，EIP-7805 scheduled for Hegotá。[EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## 对 Mantle 的影响
- L1 forced inclusion 变强后，Mantle 的 sequencer censorship-resistance 叙事也会被重新比较。
- 若 L1 有协议级 inclusion list，而 L2 仍依赖单 sequencer 或弱 forced-tx UX，用户会自然追问 Mantle 的 escape hatch 是否同样清晰。
- Mantle 的 fair sequencing、forced transaction、sequencer failover 和 private orderflow 策略需要和 L1 新 baseline 对齐。
- 如果 Mantle 未来引入私密交易入口，LUCID/FOCIL 组合说明“隐私”和“公共可强制进入”可以并存，但会引入 key publisher、揭示时序和 mempool policy 风险。

## 建议 Mantle 关注
- 建立 sequencer downtime / forced transaction 的用户可见流程。
- 内部区分“公平排序”“抗审查”“隐私”“MEV 捕获”，不要混成一个承诺。
- 监控 ePBS/FOCIL/LUCID 在 Glamsterdam/Hegotá 的状态变化。
- 评估 Mantle 是否需要 role separation 或 multi-operator sequencing 设计预案。

## Sources
- https://eips.ethereum.org/EIPS/eip-7732
- https://eips.ethereum.org/EIPS/eip-7805
- https://eips.ethereum.org/EIPS/eip-8046
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://ethresear.ch/t/building-towards-multi-party-block-construction/24975
- https://ethresear.ch/t/trustless-payments-and-relays/25125
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081
