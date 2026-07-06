# Appendix B：模糊 Strawmap 标签 Crosswalk

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 读法
本附录把没有清晰 canonical EIP/source 的 Strawmap 标签拆成三类：confirmed、inferred、unresolved。`inferred` 可以用于解释路线含义，但必须明确是映射；`unresolved` 不应写成确定功能。

| 标签 | 分类 | 最佳映射 | 写作建议 |
|---|---|---|---|
| snail issuance | unresolved | issuance policy / tempered issuance research | 写成官方 Strawmap 图上的非正式速记，正文只讨论 issuance policy |
| leanDA / PQ leanDA | inferred | PQ data roadmap、leanVM -> PQ blobs | 写成长期 PQ DA shorthand |
| short-dated blob futures | confirmed + dual meaning | BLOBBASEFEE-driven blob futures；另有 EIP-8256 ticketed reservation | 同时区分价格 futures 与容量 reservation |
| long-dated gas futures | confirmed | BASEFEE-driven gas futures / derivatives | 写成 research-only treasury hedge 方向 |
| Pureth purges | confirmed | Strawmap 链接到 EIP-7919 Pureth Meta + misc purges | 把 Pureth data/RPC verification 与 purge/state expiry 分开，并标注 EIP-7919 Stagnant |
| partial binary tree | inferred | unified binary tree / binary Merkle tree / EIP-7864 | 写成 binary-tree state commitment 方向 |
| optional 2-of-3 proofs | confirmed | Strawmap 链接到 EIP-8025；Vitalik Surge 描述 2-of-3 multi-proof framing | 写作 optional proofs + multi-prover threshold research，并标注 EIP-8025 Stagnant/Hegotá PFI |
| mandatory 1-of-1 proofs | confirmed | Strawmap 链接到 EIP-8142 / Block-in-Blobs；mandatory proof regime | 写作 mandatory proof regime + BiB DA binding，不再写成错误标签 |
| attester-proposer separation | confirmed label/link mismatch | Strawmap 标签写 attester-proposer separation，但链接指向 attester-includer separation 研究帖 | 正文可用 attester-includer separation 解释，并提示标签/链接不一致 |
| lean privacy wormholes | inferred | Zero-Knowledge Wormholes / native privacy | 写成 privacy primitive mapping，不写 lean-specific spec |
| specs quantum | inferred | PQ roadmap / Lean Ethereum / cryptographic agility | 写成 PQ spec modernization shorthand |
| PQ leanSPHINCS transactions | inferred | PQ transaction signatures / SPHINCS+ / SLH-DSA / AA | 写成 PQ auth research，不写已标准化交易类型 |

## 对正文的约束
- 如果某个标签是 inferred/unresolved，正文必须显式 caveat。
- 不能把 eth2030/Strawmap gap-analysis 标签等同于 finalized Ethereum roadmap；eth2030 是第三方个人仓库，应标注为非官方辅助材料。
- `short-dated blob futures` 在本次深挖中比上一版更明确：它既可指 BLOBBASEFEE 支持的 blob gas futures，也可能与 EIP-8256 capacity reservation 产生叙事重叠；二者应分开。
- 官方 SVG 中还有一个 Google Doc 链接在当前环境返回 401/不可访问；相关标签只能作为无法复核的官方链接处理。

## Sources
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/GAP_ANALYSIS.md
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/ROADMAP.md
- https://eips.ethereum.org/EIPS/eip-7516
- https://eips.ethereum.org/EIPS/eip-3198
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-8142
- https://vitalik.eth.limo/general/2024/10/17/futures2.html
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://eips.ethereum.org/EIPS/eip-7503
- https://ethresear.ch/t/wormholes-and-the-cost-of-plausible-deniability/23728
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://pq.ethereum.org/
