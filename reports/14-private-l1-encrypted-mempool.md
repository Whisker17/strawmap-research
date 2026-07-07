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

## 深入机制拆解
### LUCID / EIP-8184：commit-before-reveal 的公开加密交易路径
- LUCID 让用户先提交 sealed transaction，block builder/proposer 在不知道交易明文的情况下承诺 inclusion，之后再由 key release 机制揭示内容。
- 它试图在公共 mempool 中保留 permissionless propagation，同时减少明文交易带来的 sandwich、copy trading、censorship prefilter 和 private relay 依赖。
- 关键难点是 timing：密钥何时释放、谁发布密钥、PTC/FOCIL 如何强制 inclusion、以及 reveal optionality 是否会被 builder/proposer 利用。

### FOCIL 与 encrypted mempool：隐私必须绑定 inclusion
- 只加密交易内容不能保证抗审查；builder 仍可以不打包某个 sealed tx，或者只偏好特定 orderflow。
- FOCIL 提供 fork-choice enforced inclusion list，让 committee 级别的 inclusion pressure 与 encrypted mempool 结合。
- 这也是 LUCID 与 block-production roadmap 相连的地方：ePBS、FOCIL、PTC timing、key release 都会共同决定隐私 lane 的可用性。

### GhostPool：隐藏 admission metadata，而不只是 calldata
- 即使 calldata 加密，sender、nonce、fee pattern、network origin、account history 仍可能暴露交易意图。
- GhostPool 用 root-bound ZK proof、shared nullifier namespace 和 identity-hiding admission，降低 sender/nonce 这类身份关键 metadata 泄露。
- 它无法消除所有 metadata：gas/fee、timing、网络路径、contract touch patterns 和后续 onchain reveal 仍会泄露信息。

### Shielded transfers / privacy wormholes：合约层隐私与 mempool 隐私不同
- Shielded transfers 隐藏的是合约池内的 sender/recipient/amount，通过 commitments、nullifiers、note tree 和 viewing/recovery logic 实现。
- Encrypted mempool 隐藏的是交易在 inclusion 前的明文与意图；两者解决的时间窗口和攻击者不同。
- Privacy wormholes / EIP-7503 类方向更接近长期 native privacy primitive，但当前状态和标签都需要 caveat，不能写成确定 roadmap。

## 当前瓶颈
- 内容泄露：明文 calldata 让 MEV searchers 在 inclusion 前看到交易意图。
- 身份泄露：sender、nonce、fee、timing、网络来源会把交易和账户行为长期关联。
- Orderflow 集中：用户转向 private relays 虽可减少 frontrun，但会强化少数 builder/relay 的信息优势。
- 抗审查不足：没有 inclusion backbone 时，加密交易仍可能被 builder/proposer 忽视或延迟。

## 优化机制
- LUCID/EIP-8184 把 sealed tx、commit-before-reveal、key release 和 FOCIL-backed inclusion 组合成公共 encrypted lane。
- Distributed encrypted mempool 使用 threshold encryption、proposer commitments、PBS integration 分散 key/reveal 权力。
- GhostPool 用 ZK admission proof 和 nullifier 隐藏 sender/nonce 等 identity-critical metadata。
- Shielded transfer pools 用 commitment/nullifier tree 隐藏合约内价值转移，与 mempool 隐私互补。

## 未来效果
- 用户：MEV-sensitive 交易可通过公共 encrypted lane 传播，减少对 private relay 的被动依赖。
- Builders/proposers：排序权仍存在，但明文信息优势下降，策略会更多围绕 commitments、timing 和 fee signals。
- Privacy UX：内容隐私、metadata 隐私、transfer 隐私会成为不同产品承诺，不能混为一谈。
- Protocol：FOCIL/ePBS/frame tx 与 encrypted mempool 会耦合，隐私成为 block production 设计的一部分。

## 依赖与先后关系
EIP-8184 依赖 EIP-7805/FOCIL；frame tx 增加 arbitrary validation surface，可能需要 recent roots/keyed nonces/validation policy；GhostPool 可横向补 admission privacy；shielded transfers 是应用/合约层而非 mempool 层。

## 风险与未决问题
LUCID 风险包括 reveal optionality、low ToB DoS、key publisher trust、PTC bribery/timing、metadata leakage。GhostPool 留下 fee/network metadata。Shielded pools 有 tree growth、viewing key 和 UX friction。EIP-8184 仍 Draft 且未列入 fork meta。

## 对 Mantle 的影响
- 叙事边界：Mantle fair sequencing、MEV revenue capture、censorship resistance 和 transaction confidentiality 是四个不同承诺，不能互相替代。
- Product pressure：若 Ethereum L1 推进 LUCID，用户会期待 L2 也提供类似 encrypted orderflow 或清晰的隐私边界说明。
- Sequencer design：L2 encrypted mempool 要和 Mantle fair sequencing、batcher/proposer role、MEV capture、withdrawal/bridge visibility 同时设计。
- Risk monitoring：即便没有完整 encrypted mempool，Mantle 也应监控 sandwich、copy trading、private orderflow leakage 和 builder/sequencer 信息优势。

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
