# 13 Frame Transactions 与 Account/Auth Modernization

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
frame transactions / EIP-8141、keyed nonces / EIP-8250、recent roots / EIP-8272、EIP-8202 scheme-agile tx、EIP-8209 commit/reveal frames、ephemeral keys、PQ leanSPHINCS transactions、AA / sponsorship / key rotation。

## 一页结论
这组路线改的是 transaction envelope 和 account validation，不只是钱包 UX。EIP-8141 让 validation/payment/execution frame 化；EIP-8250 解决单 sender nonce 串行；EIP-8272 让验证引用 bounded recent roots；EIP-8202 提供 flat scheme-agile 替代。对 Mantle 来说，它会影响 smart wallet、gas sponsorship、relayer/sequencer mempool policy、PQ auth migration。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| EIP-8141 Frame Tx | 当前 tx 格式限制 AA/PQ/key rotation/sponsorship | validation/payment/user-op frames + APPROVE step。[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | 原生 batching、sponsorship、key rotation、PQ auth 更容易 |
| Public mempool validation | arbitrary validation code 易 DoS 和被 shared-state invalidated | 限定 public propagation 的 validation prefix。[EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | 保持 permissionless mempool 但降低 DoS |
| Keyed nonces / EIP-8250 | 单 sender nonce 串行化共享 sender/privacy/relayer flows | `(nonce_keys, nonce_seq)`：最多 16 个严格递增 keys 共享一个 uint64 sequence，存于 `NONCE_MANAGER`；不是 per-key `(key, seq)` pair。[EIP-8250](https://eips.ethereum.org/EIPS/eip-8250) | 同一 sender 可并发多 flow，但只在 disjoint key sets 上解除 replay-ordering dependency |
| Recent roots / EIP-8272 | validation 想读近期状态但 mutable storage 影响 mempool validity | 预声明 `(source_id, slot, root)`，执行前验证。[EIP-8272](https://eips.ethereum.org/EIPS/eip-8272) | bounded state dependency，支持 privacy/wallet roots |
| EIP-8202 | frame recursion 复杂，方案敏捷性不足 | flat envelope + authorization capabilities + scheme IDs。[EIP-8202](https://eips.ethereum.org/EIPS/eip-8202) | 另一条 PQ/AA envelope 路线 |
| PQ leanSPHINCS | exact label 非标准，PQ auth 有签名大小/验证成本问题 | SPHINCS+/SLH-DSA research、AA/frame/scheme agility。[SPHINCS research](https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165) | 给 user auth PQ migration 留路径，但不是定案 |

## 当前瓶颈
当前 EOA/global nonce/tx envelope 对 account abstraction、sponsorship、session keys、privacy relayers、PQ keys 都不友好。公共 mempool 又必须防止任意 validation code 的 DoS。

## 优化机制
Frame tx 将验证、支付和执行拆成 frame；keyed nonces 用共享 `nonce_seq` + 多 key set 拆 replay domain；recent roots 把状态依赖前置声明；scheme-agile tx 给签名方案迁移留接口；PQ auth 通过 AA/frames 或新 envelope 渐进引入。Strawmap 的 `ephemeral keys` 方块有 canonical ethresear.ch 来源，应作为 PQ/account-abstraction 迁移路径补充，而非只靠 SPHINCS/AA 推断。

## 未来效果
钱包体验会更接近原生 AA：batching、gas sponsorship、key rotation、passkey/PQ auth、共享 sender 并发更自然。但 mempool policy 变复杂，relayers/sequencers 需要模拟和约束 validation。

## 依赖与先后关系
EIP-8141 是中心；EIP-8250/8272/8209 是 deltas；EIP-8202 是替代架构。状态核查显示 EIP-8141 是 Draft 且 considered for Hegotá，不是 scheduled。[EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## 风险与未决问题
风险包括 public mempool DoS、deploy frame front-running、ORIGIN semantic drift、paymaster throttling、recent-root storage growth、ephemeral-key mempool exposure、PQ standardization gap。`PQ leanSPHINCS transactions` 应作 inferred label。

## 对 Mantle 的影响
Mantle 已有 AA 教程和 OP Stack AA/P256 生态，Frame tx 会影响钱包、relayer、sponsorship、sequencer mempool。Mantle 若支持更强 AA/PQ auth，应同步制定 public vs private mempool validation policy，避免把 L1 的 DoS 问题搬到 L2。

## 建议 Mantle 关注
- 评估哪些 wallet flows 需要 keyed nonces：session keys、privacy pools、shared senders、relayers。
- 设计 bounded validation / paymaster throttling / stale-state recheck policy。
- 比较 EIP-8141 frame model 与 EIP-8202 flat envelope 对 Mantle 的兼容性。
- 将 PQ auth 分成 now path（AA/scheme agility）和 later path（standardized PQ signatures）。

## Sources
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://eips.ethereum.org/EIPS/eip-8202
- https://eips.ethereum.org/EIPS/eip-8209
- https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://www.mantle.xyz/blog/developers/account-abstraction-mantle-etherspot-prime-sdk
