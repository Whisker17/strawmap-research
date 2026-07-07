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

## 深入机制拆解
### EIP-8141 Frame Tx：把交易拆成验证、支付、执行三个平面
- Frame tx 的核心是 transaction envelope 不再只围绕 EOA signature + nonce + calldata，而是显式表达 validation frame、payment frame 和 user execution frame。
- validation frame 决定这笔交易是否可进入公共 mempool；payment frame 让 sponsor/paymaster/gas payer 与用户动作解耦；execution frame 承载真正的用户调用。
- `APPROVE` step 的作用是让后续 frame 在同一交易内获得前置验证结果，支持 batching、sponsorship、key rotation 和更复杂的 account logic。

### Public mempool validation：AA 的硬约束
- 如果 arbitrary validation code 可以在 public mempool 传播阶段任意读写状态，攻击者可以用 expensive validation、shared-state invalidation 或 stale-state griefing 拖垮节点。
- EIP-8141 因此限制可公开传播的 validation prefix，把 validation 变成 bounded、可模拟、可拒绝的前置阶段。
- 这点对 L2 sequencer 同样重要：L2 可以更中心化地收交易，但一旦要开放 mempool 或共享 orderflow，就必须有类似 policy。

### Keyed nonces / recent roots：并发与状态依赖管理
- EIP-8250 不是为每个 key 单独维护完全独立 nonce，而是用多个 nonce keys 共享一个递增 sequence，只有 disjoint key sets 才能解除 replay/order dependency。
- 这适合 session keys、shared sender、privacy relayer、batched wallets 等并发 flows，但钱包必须避免多个 flow 抢同一 key set。
- EIP-8272 让 validation 显式声明 recent state root dependency，避免验证逻辑在 public mempool 中依赖随时会变的 mutable storage。

### Scheme agility 与 PQ auth：迁移路径比单一签名更重要
- EIP-8202 提供 flat、scheme-agile envelope，和 EIP-8141 frame model 形成竞争/互补路线。
- PQ signatures 的挑战不只是算法选择，还包括签名大小、验证 gas、密钥轮换、硬件支持、账户恢复和 mempool policy。
- 因此近期更现实的路径是 AA/frame/scheme agility 先提供多签名方案容器，等 PQ 标准和成本成熟后再切换默认认证。

## 当前瓶颈
- EOA 约束：单签名、单 nonce、单 gas payer 的交易模型不适合 sponsorship、session keys、batching 和 key rotation。
- Nonce 串行：共享 sender 或 relayer flow 会被单 sender nonce 阻塞，隐私/批量场景尤其明显。
- Mempool DoS：arbitrary validation code 若无限制传播，会让节点承担不可预测的模拟成本。
- Auth migration：passkey、P256、PQ signatures、hardware-backed keys 都需要更灵活的 envelope，而不是继续堆在 EOA 之外。

## 优化机制
- EIP-8141 把 validation/payment/execution 分层，让账户逻辑和 gas 支付可组合。
- EIP-8250 用 keyed nonce sets 管理并发 replay domain，减少共享 sender 串行化。
- EIP-8272 把 validation 的近期状态依赖前置声明，降低 stale-state invalidation。
- EIP-8202 和 ephemeral-key/PQ research 提供 scheme-agile 迁移路径，避免一次性押注某个签名算法。

## 未来效果
- 用户：原生 batching、gas sponsorship、key rotation、session keys、passkey/PQ auth 更自然。
- 钱包/relayer：可以设计更复杂的支付与恢复 flows，但需要精确管理 nonce keys、validation roots 和 stale-state 重试。
- Sequencer/mempool：必须维护 validation simulation、paymaster throttling、spam policy 和 shared-state invalidation 规则。
- Protocol：交易 envelope 从 EOA-first 走向 account-auth-first，给长期 PQ migration 留接口。

## 依赖与先后关系
EIP-8141 是中心；EIP-8250/8272/8209 是 deltas；EIP-8202 是替代架构。状态核查显示 EIP-8141 是 Draft 且 considered for Hegotá，不是 scheduled。[EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## 风险与未决问题
风险包括 public mempool DoS、deploy frame front-running、ORIGIN semantic drift、paymaster throttling、recent-root storage growth、ephemeral-key mempool exposure、PQ standardization gap。`PQ leanSPHINCS transactions` 应作 inferred label。

## 对 Mantle 的影响
- Wallet strategy：Mantle 可把 AA、sponsorship、session keys、P256/passkey 和未来 PQ auth 统一到 account-auth roadmap，而不是零散集成 SDK。
- Sequencer policy：若开放更丰富 validation，必须定义 public/private mempool 分界、validation gas cap、paymaster throttling 和 stale-root retry。
- App UX：keyed nonces 可改善游戏、交易机器人、institutional accounts、privacy flows 的并发体验，但钱包要清楚展示失败/重放语义。
- Long-term security：PQ auth 不应等到 L1 强制迁移才规划；Mantle 可以先通过 scheme agility 与 hardware-backed signatures 建立迁移经验。

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
