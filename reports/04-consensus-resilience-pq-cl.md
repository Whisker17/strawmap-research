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

## 深入机制拆解
### PQ key registry / PQ heartbeat
- PQ migration 不能等到量子威胁临近时一次性替换 key：validator 需要先有登记、绑定和激活 PQ public key 的路径，避免全网同时迁移。[PQ registry](https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040)
- PQ heartbeat 的现实动机是签名大小和聚合能力：如果 PQ 签名不能像 BLS 一样聚合，小 committee fast path 会比全验证者 PQ finality 更早可行。[dynamic availability](https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418)
- 官方 PQ 路线把 leanXMSS、leanVM、leanSig/leanMultisig 写成证明压缩和聚合方向，而不是最终参数承诺。[quantum resistance](https://ethereum.org/roadmap/future-proofing/quantum-resistance/)

### Whisk / SSLE / randomness
- Whisk/EIP-7441 的目标是 single secret leader election：在 proposer 出块前隐藏其身份，降低攻击者按 slot 顺序定点 DoS 的能力。[EIP-7441](https://eips.ethereum.org/EIPS/eip-7441)
- Ethereum.org 的 secret leader election 页面把 Whisk 描述成 commit secret、shuffle commitments、再映射到 slots 的流程。[secret leader election](https://ethereum.org/roadmap/secret-leader-election)
- 但当前 Whisk 依赖的密码假设并不天然 PQ-safe，EF cryptography research 已把 PQ SSLE 作为单独研究问题处理。[PQ SSLE](https://crypto.ethereum.org/blog/pq-ssle)

### Recovery / timeliness
- VDF randomness 试图降低 RANDAO last-revealer bias，但会引入硬件、延迟和替代方案治理问题。[VDF beacon](https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566)
- Timeliness detectors 处理的是多数攻击或网络扰动后“哪条链及时”的判断依据，让恢复不完全依赖社交协调。[timeliness detectors](https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925)
- 这些机制都依赖 synchrony 假设、参数选择和客户端一致实现，不能写成自动恢复按钮。

## 当前瓶颈
- 长期看，BLS/ECDSA、curve-based proofs、公开 proposer、RANDAO bias、以及多数攻击后的协调恢复都是安全债务。
- PQ 最大瓶颈不是“找一个签名算法”，而是 validator identity、签名大小、aggregation、proof compression 和迁移顺序。
- Proposer 身份提前公开会放大定点 DoS，尤其在短 slot 和高价值 slot 场景下更敏感。
- 多数攻击后的恢复需要协议内可判断的 timely-chain 语义，否则仍容易退回社会协调。

## 优化机制
- PQ 路线采用 staged migration：账户层先获得 signature agility，CL 先做 key registry，再用 PQ heartbeat 试水 fast path。
- leanVM/leanSig/leanMultisig 方向通过证明压缩和聚合降低大 PQ 签名的通信与验证成本。
- Whisk/SSLE 通过隐藏未来 proposer 身份降低顺序 DoS 风险。
- VDF 和 timeliness detectors 分别改善 randomness bias 和攻击后恢复判断。

## 未来效果
- Ethereum 可逐步降低量子风险，但迁移会分层完成，而不是一次性“全网 PQ”。
- Proposer 更难被提前定位，短 slot 与高价值 slot 下的 DoS 面会下降。
- 攻击后恢复会有更多协议依据，但仍受 synchrony、客户端实现和治理流程约束。
- 新瓶颈会转向 PQ key lifecycle、stateful signature 操作纪律、proof 参数和 SSLE 的 PQ 替代。

## 依赖与先后关系
本报告与 03 validator-scale、13 frame tx、11 proving substrates 强相关。leanVM/leanSig 是研究实现信号，不是生产级协议参数。`specs quantum` 应映射到 PQ roadmap / Lean Ethereum，而非独立 EIP。

## 风险与未决问题
PQ signature statefulness、XMSS key management、proof security parameters、VDF 硬件假设、Whisk anonymity set、timeliness synchrony bounds 都未完全定案。不要把 leanVM benchmark 写成协议保证。

## 对 Mantle 的影响
- Mantle 的桥、finality、proof stack 都会受 L1 PQ migration 影响。
- 如果 L1 先有 PQ heartbeat 再有 full PQ finality，Mantle 需要分开描述“快速确认层 PQ readiness”和“最终结算层 PQ readiness”。
- Proposer DoS 面下降会增强 L1 结算可用性，间接改善 Mantle batch posting、proof posting 和恢复策略。
- SP1/zkVM 与长期 prover stack 应跟踪 hash-based proof/signature compatibility，避免未来只在执行证明上 ZK 化、在认证/共识假设上滞后。

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
- https://ethereum.org/roadmap/secret-leader-election
- https://eips.ethereum.org/EIPS/eip-7441
- https://crypto.ethereum.org/blog/pq-ssle
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566
- https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763
- https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925
