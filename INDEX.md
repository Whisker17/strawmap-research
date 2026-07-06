# Ethereum Strawmap 详细分报告包索引

> 面向 Mantle dev team / researcher handoff。生成日期：2026-07-06。

## 怎么读

这套材料把上一版总报告拆成 14 篇方向报告和 2 个附录。每篇报告都按同一结构回答：瓶颈是什么、怎么优化、未来效果、依赖与先后关系、风险/未决问题、对 Mantle 的影响、建议 Mantle 关注。

推荐阅读顺序：先读 Appendix A/B，避免误读状态和模糊标签；再按共识层、数据层、执行层、账户/隐私层阅读；最后回到 Mantle 影响矩阵。

## 报告清单

| # | 报告 | Layer | 用途 |
|---|---|---|---|
| 1 | [Fast L1：快速确认、短 slot 与快速终局性](reports/01-fast-l1-confirmation-finality.md) | 共识层 | 独立深挖报告 |
| 2 | [出块生产与抗审查：ePBS、FOCIL 与角色拆分](reports/02-block-production-censorship-resistance.md) | 共识/执行边界 | 独立深挖报告 |
| 3 | [验证者规模、发行策略与 Lean Specs](reports/03-validator-scale-issuance-lean-specs.md) | 共识层 | 独立深挖报告 |
| 4 | [共识层韧性与 Post-Quantum CL](reports/04-consensus-resilience-pq-cl.md) | 共识/密码学 | 独立深挖报告 |
| 5 | [Teragas L2：PeerDAS 与 DA 容量增长](reports/05-peerdas-da-capacity.md) | 数据层 | 独立深挖报告 |
| 6 | [Blob 传播、Custody 与 Streaming](reports/06-blob-propagation-custody-streaming.md) | 数据/网络 | 独立深挖报告 |
| 7 | [资源定价：Blob、Byte Floors、多维 Fee 与 Futures](reports/07-resource-pricing-fees-futures.md) | 数据/执行经济 | 独立深挖报告 |
| 8 | [Gigagas L1：Gas Limit 与 P2P Throughput](reports/08-gigagas-l1-p2p-throughput.md) | 执行/网络 | 独立深挖报告 |
| 9 | [BALs：显式 State Access 与 Block-Level Access Lists](reports/09-bals-explicit-state-access.md) | 执行/状态 | 独立深挖报告 |
| 10 | [Proof-Heavy Execution 与 Native Rollups](reports/10-proof-heavy-execution-native-rollups.md) | 执行/数据边界 | 独立深挖报告 |
| 11 | [EVM Hardening 与 Proving Substrates](reports/11-evm-hardening-proving-substrates.md) | 执行/证明 | 独立深挖报告 |
| 12 | [State Growth、Statelessness 与 Purges](reports/12-state-growth-statelessness-purges.md) | 执行/状态 | 独立深挖报告 |
| 13 | [Frame Transactions 与 Account/Auth Modernization](reports/13-frame-transactions-account-auth.md) | 账户/交易 | 独立深挖报告 |
| 14 | [Private L1：Encrypted Mempool、Shielded Transfers 与 Privacy Roadmap](reports/14-private-l1-encrypted-mempool.md) | 隐私/交易 | 独立深挖报告 |
| 15 | [Appendix A：Fork Status、North-Star 与时间线 Caveats](reports/A-fork-status-and-north-star-caveats.md) | 附录 | 状态/标签校准 |
| 16 | [Appendix B：模糊 Strawmap 标签 Crosswalk](reports/B-ambiguous-label-crosswalk.md) | 附录 | 状态/标签校准 |

## 关键依赖关系

| 上游能力 | 解锁/影响 | 相关报告 |
|---|---|---|
| FCR / quick slots / decoupled consensus | 更快 L1 确认与终局性语义，但不自动缩短 L2 proof finality | 01, 03 |
| ePBS | 把 execution payload 从共识 hot path 中拆开，为 FOCIL、Block-in-Blobs（BiB）、shorter slots 创造空间 | 02, 10 |
| FOCIL | 强化 public forced inclusion，是 LUCID/encrypted mempool 的 inclusion backbone | 02, 14 |
| PeerDAS/Fusaka/BPO | 提高 Ethereum blob DA headroom，是 Mantle 当前 blob 主路径和 EIP-8142 payload-data DA 的基础 | 05, 06, 10 |
| BALs | 显式 state access，支撑 parallel validation、proof-heavy execution、state sync 和 witness planning | 09, 10, 12 |
| Repricing / multidimensional fees | 防止扩容后 cheap bytes/state 成为新瓶颈，影响 blob 主路径与 calldata fallback 成本 | 07, 08, 09 |
| Proof-heavy execution | 从 universal re-execution 转向 proof verification + explicit DA/BAL availability | 10, 11, 12 |
| Frame tx / keyed nonces / recent roots | 为 AA、PQ auth、privacy validation、relayers 提供交易格式基础 | 13, 14 |
| PQ / lean stack | 长期影响 CL attestations、user auth、proof substrates 和 DA commitments | 04, 11, 13 |

## Mantle 最重要的阅读线索

- DA：先读 05/06/07，按 Mantle 当前 Ethereum blobs 主 DA、calldata fallback、Arsia L1 data fee model、batch posting 策略来读。
- Proof：先读 09/10/11/12，重点看已上线的 OP Succinct/SP1 validity proofs、native-rollup compatibility、BAL/payload availability、witness SLO。
- Sequencer/MEV：先读 02/13/14，重点看 forced inclusion、fair sequencing、encrypted mempool 是否要做 parity。
- Product/UX：先读 01/10/13，重点把 confirmation/finality/proof/withdrawal 状态拆开。

## 状态修正

- PeerDAS/Fusaka/BPO1/BPO2 在本日期应写成已上主网/已激活，而非待部署。
- EIP-7928 和 EIP-7732 是 Glamsterdam scheduled，但 Glamsterdam 仍在开发。
- EIP-7805 是 Hegotá scheduled；EIP-8141 只是 Hegotá considered。
- EIP-8184、EIP-8079、EIP-8142 等仍是 Draft / research，不应写成 fork commitment。
- `snail issuance`、`leanDA`、`partial binary tree`、`lean privacy wormholes` 等需要使用 Appendix B 的 confirmed/inferred/unresolved caveat。
