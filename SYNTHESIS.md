# ULW-Research Synthesis: Ethereum Strawmap Detailed Report Pack

Workers: 19+ · Waves: planning + saturation + expansion · Reports: 14 + 2 appendices · Source refresh: 115 report URLs checked for reachability; 59 old-ledger URLs were separately rechecked during expansion.

## Executive Summary

本次补充研究把上一版高层报告拆成 14 篇可独立转发的方向报告。每篇报告都围绕 Mantle dev team 关心的四个问题展开：当前瓶颈、优化机制、升级后的效果、对 Mantle 的影响。整体结论是：Ethereum Strawmap 不是一条线性升级路线，而是三组相互依赖的能力栈：共识层的 fast confirmation / ePBS / FOCIL / PQ heartbeat，数据层的 PeerDAS / blob propagation / pricing，执行层的 BALs / proof-heavy execution / state redesign / account/privacy modernization。

对 Mantle 而言，最关键的不是某个单点 EIP，而是 Ethereum L1 baseline 的上移，以及 Mantle 自身状态已经改变：Mantle 现应按 Ethereum blobs/calldata 主 DA 与 OP Succinct/SP1 validity proofs 已上线来分析。Blob 主路径的容量和定价变得更关键；forced inclusion 与 encrypted mempool 会抬高 L2 censorship-resistance 和 privacy 叙事标准；proof-heavy execution 与 native rollups 会要求 Mantle 更清楚地区分生产中的 SP1 validity path、payload/BAL availability、native-rollup compatibility；state/RPC/witness/prover-input 可用性会成为一等 SLO。

## Findings by Theme

- 共识层：FCR/quick slots/SSF/decoupled consensus 共同压缩 confirmation/finality 体验，但安全语义不同；ePBS/FOCIL/role separation 重塑 block production 与 censorship resistance；PQ CL 是分阶段迁移，不是一次 fork。
- 数据层：PeerDAS/Fusaka/BPO 已进入上主网/激活语境；后续扩容依赖 sparse blobpool、cell deltas、streaming、pricing；teragas/1GB/s 仍是 north-star。Mantle 章节已从 external-DA-first 旧前提修正为 Ethereum blobs 主 DA。
- 执行层：BALs 是高 gas 与 proof-heavy execution 的 plumbing；optional proofs 只是 proving ground，mandatory proof regime 需要 Block-in-Blobs；state growth 仍是最难的一层。
- 账户与隐私：Frame tx/keyed nonces/recent roots 为 AA/PQ/privacy validation 铺路；LUCID/GhostPool/shielded transfers 分别处理 content privacy、admission metadata、value privacy。

## Verified Claims

- EIP-7918 Final；PeerDAS/EIP-7594 Final 且 Fusaka 已上主网；BPO1/BPO2 已激活。
- EIP-7928/EIP-7732 scheduled for Glamsterdam；EIP-7805 scheduled for Hegotá；EIP-8141 considered for Hegotá；EIP-8184 未列入 fork meta。
- EIP-7938 是 Stagnant，不应写作 active gas-limit plan。
- 多个 Strawmap exact labels 需要按 confirmed/inferred/unresolved 分级，见 Appendix B；其中 optional 2-of-3 proofs、mandatory 1-of-1 proofs、Pureth purges 已按 SVG 链接修正为 confirmed。

## Gaps

- Strawmap 图上的部分标签可能来自 eth2030/内部 shorthand/视觉压缩，无法全部映射到 canonical EIP。
- Mantle 影响中的部分结论是基于 Mantle public docs、Succinct case study、L2Beat 与 Ethereum roadmap 的综合推断，已在各报告中标为建议/推断而非 Mantle 官方承诺。

## Expansion Trace

- Wave 0：规划 agent 给出 14 篇报告 + 2 附录结构。
- Wave 1：14 个 librarian agents 覆盖各报告方向。
- Wave 2：4 个 expansion agents 核查 fork/status、新鲜度、模糊标签、Mantle matrix、proof fault-line。
- Convergence：所有报告方向均有 dedicated worker；新增 leads 已整合进 Appendix A/B、proof fault-line 和 Mantle action matrix；剩余 leads 为可选二次备忘录，不阻塞用户请求。
