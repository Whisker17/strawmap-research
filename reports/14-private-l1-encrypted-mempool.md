# 14 Private L1：Encrypted Mempool、Shielded Transfers 与 Privacy Roadmap

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
private L1、privacy mempool、encrypted mempool / LUCID / EIP-8184、distributed encrypted mempool、GhostPool、shielded transfers、lean privacy wormholes、FOCIL relation、frame tx relation。

## 一页结论
Private L1 不是单一功能，而是三层问题：mempool 内容/意图隐私、admission metadata 隐私、onchain value transfer 隐私。LUCID/EIP-8184 是最接近协议化的 encrypted mempool；GhostPool 隐藏 sender/nonce 等 admission metadata；shielded transfers 隐藏合约内转账信息。对 Mantle 来说，fair sequencing 和 transparent MEV capture 不是 transaction confidentiality；如果 L1 提供 public encrypted mempool，L2 会面临隐私 parity 压力。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| LUCID / EIP-8184 | public mempool 泄露交易内容和排序机会；private orderflow 强化 builder | sealed tx、commit-before-reveal、FOCIL-backed inclusion、delayed key release。[EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | 公开路径也能承载 MEV-sensitive encrypted flow |
| Distributed encrypted mempool | 单一加密方案/relay 依赖不理想 | threshold encryption、proposer commitments、PBS integration。[encrypted mempool](https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717) | 模块化 encrypted inclusion architecture |
| GhostPool | encrypted mempool admission 仍泄露 sender/nonce | root-bound ZK proof + shared nullifier namespace。[GhostPool](https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327) | 隐藏身份关键 metadata，但 gas/fee/network metadata 仍可见 |
| Shielded transfers | L1 合约转账公开 sender/recipient/amount | commitment/nullifier 合约池。[shielded transfers](https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424) | 合约内 value transfer 隐私，不等于 mempool 隐私 |
| FOCIL relation | encrypted tx 若不能强制 inclusion，仍可被审查 | FOCIL 提供 inclusion backbone。[EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) | 抗审查和隐私结合 |
| Lean privacy wormholes | exact label 非 canonical | 映射到 Zero-Knowledge Wormholes / native privacy。[EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) | 长期 privacy primitive，不是已定功能 |

## 当前瓶颈
Public mempool 暴露内容、intent、sender/nonce、timing、gas parameters，让 MEV、copy trading、censorship、account linkability 成为常态。Private orderflow 保护用户但牺牲公共可验证性和去中心化。

## 优化机制
LUCID 把交易密文纳入 inclusion pipeline，先 commitment 后 reveal；GhostPool 用 proofs/nullifiers 保护 admission metadata；shielded transfers 用 commitment tree 隐藏转账内容；FOCIL/frame tx 分别提供 inclusion 与 validation/payment 基础。

## 未来效果
L1 可能拥有可公开传播、抗审查、内容加密的交易 lane。用户不必完全依赖 private relay；但 metadata 泄漏不会归零，key publishers、PTC timing、fee fields、network origin、contract touch patterns 仍可暴露信息。

## 依赖与先后关系
EIP-8184 依赖 EIP-7805/FOCIL；frame tx 增加 arbitrary validation surface，可能需要 recent roots/keyed nonces/validation policy；GhostPool 可横向补 admission privacy；shielded transfers 是应用/合约层而非 mempool 层。

## 风险与未决问题
LUCID 风险包括 reveal optionality、low ToB DoS、key publisher trust、PTC bribery/timing、metadata leakage。GhostPool 留下 fee/network metadata。Shielded pools 有 tree growth、viewing key 和 UX friction。EIP-8184 仍 Draft 且未列入 fork meta。

## 对 Mantle 的影响
Mantle fair sequencing 解决 ordering fairness 和部分 MEV/censorship 问题，但不等于 encrypted mempool；现有公开材料更像 2024-02 研究提案，不能写成已部署隐私能力。若 L1 推进 LUCID，Mantle 需要决定是否提供 L2 encrypted orderflow parity，或明确告诉用户 Mantle 的隐私边界。Fair sequencing、MEV revenue capture、privacy guarantees 必须分开陈述。

## 建议 Mantle 关注
- 对外文案拆分 fairness、MEV resistance、censorship resistance、confidentiality。
- 建立 sandwich/front-run/private-orderflow monitoring。
- 研究 L2 encrypted mempool 是否与 Mantle fair sequencing/MEV capture 兼容。
- 跟踪 EIP-8184、GhostPool、FOCIL/frame tx 组合路线。

## Sources
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717
- https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327
- https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424
- https://eips.ethereum.org/EIPS/eip-7503
- https://www.mantle.xyz/blog/research/fair-sequencing
- https://ethresear.ch/t/fairflow-building-a-transparent-l2-mev-economy/22146
