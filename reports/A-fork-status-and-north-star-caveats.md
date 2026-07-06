# Appendix A：Fork Status、North-Star 与时间线 Caveats

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 为什么需要这个附录
Strawmap 把研究方向、EIP 状态、fork 候选、长期 north-star 和视觉标签放在同一张图里。给 Mantle dev team 同步时，必须把“已生产”“scheduled”“considered”“draft research”“north-star”拆开，否则容易把路线图误读成承诺。

## 状态表（2026-07-06）
| 项目 | 当前状态 | 应如何写 |
|---|---|---|
| Fusaka | In production | 已生产，不要写成 pending |
| PeerDAS / EIP-7594 | Final，已随 Fusaka 上主网 | DA scaling 已进入主网阶段，但后续 FullDAS 仍未来 |
| BPO1 / BPO2 | 已激活 mainnet parameter forks | 已激活，不是待部署 |
| EIP-7918 | Final，Fusaka included | blob fee floor 已 Final |
| Glamsterdam | In development，final devnet / mainnet 预期约 2026 Q3-Q4 | 仍开发中；不要写成已激活 |
| EIP-7732 ePBS | Draft，scheduled for Glamsterdam | 可写 scheduled，但不是 deployed |
| EIP-7928 BALs | Draft，scheduled for Glamsterdam | 可写 scheduled，但不是 deployed |
| EIP-7976 / EIP-7981 / EIP-8037 | Glamsterdam SFI repricing | calldata/access-list/state-creation repricing 是近期成本模型输入 |
| EIP-8038 / EIP-8070 / EIP-8136 / EIP-8159 / EIP-8189 | Glamsterdam CFI | 可写 considered，但不是 scheduled |
| Hegotá | In development，目标 2026 Q4，现实可能滑入 2027；Strawmap 放在 2027 列 | 仍开发中，且依赖 Glamsterdam 进度 |
| EIP-7805 FOCIL | Draft，scheduled for Hegotá | 可写 scheduled，但不是 deployed |
| EIP-8141 Frame Tx | Draft，considered for Hegotá | 只能写 considered，不能写 scheduled |
| EIP-8131 | Hegotá PFI | 可作为后续 tx-content floor 方向，不写 scheduled |
| EIP-8184 LUCID | Draft，未列入 fork meta | 不要写 fork-scheduled |
| EIP-7938 | Stagnant | 不要写 active gas-limit plan |
| EIP-8025 | Stagnant | 可作为 optional proof concept，不作 active fork |
| EIP-6800 / EIP-7736 / EIP-7919 / EIP-7503 | Stagnant | Verkle/state expiry/Pureth/wormholes 相关内容需软化 |
| EIP-7935 | Final，Fusaka | 60M default gas-limit 是当前执行层基线 |

## 2026-07 基线数字
- Blob capacity：EIP-7691/Pectra 为 6/9 target/max；BPO1 为 10/15；BPO2 为 14/21。后续 BPO 应看 demand 与 network telemetry，而非线性承诺。
- Execution gas：EIP-7935 已 Final，Fusaka 默认 gas-limit 目标为 60M；Glamsterdam 的 200M gas 只能写作设计目标/外部报道中的最低可信容量目标，不是 fork 强制参数。
- Fast L1：EIP-8198 把 slot duration 参数化，常见讨论是 12s -> 8s，但 8s 仍是占位/候选目标。
- FOCIL：EIP-7805 的 committee/IL 参数应随 spec 变化跟踪；报告中只把它作为 Hegotá scheduled inclusion-list 方向，不把具体数值写死。

## North-star 标签处理
- `fast L1`、`gigagas L1`、`teragas L2`、`post quantum L1`、`private L1` 是方向性目标，不是 hard-fork 参数。
- `1 Gbyte/sec`、`1 Ggas/sec` 等数字应写作 north-star / benchmark / research target，除非对应 EIP 明确给出参数。
- 图中的年份、I*/J*/K*/L* 等视觉分组不能自动等同于 confirmed schedule。
- Strawmap 图例中的 question-mark 标记表示“是否会 ship 仍不确定”；snail issuance、1M attestations、attester-proposer separation、VDF、secret proposers、proofs of custody、short/long-dated futures、endgame state 等标签需要延续这种不确定性分级。

## 对 Mantle 同步时的推荐写法
- “PeerDAS/Fusaka 已上主网，后续容量增长由 BPO/FullDAS 等继续推进。”
- “ePBS/BALs 是 Glamsterdam scheduled items，但 Glamsterdam 尚未生产。”
- “FOCIL 是 Hegotá scheduled item；Frame Tx 只是 considered。”
- “Private L1 / LUCID / native rollups / PQ CL 大多仍是 draft 或 research，应按长期 watchlist 管理。”

## Sources
- https://ethereum.org/roadmap/
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-7723
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-8134
- https://eips.ethereum.org/EIPS/eip-8135
- https://eips.ethereum.org/EIPS/eip-7918
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-7935
- https://eips.ethereum.org/EIPS/eip-7976
- https://eips.ethereum.org/EIPS/eip-7981
- https://eips.ethereum.org/EIPS/eip-8037
- https://eips.ethereum.org/EIPS/eip-8038
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-8159
- https://eips.ethereum.org/EIPS/eip-8189
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-8184
- https://thedefiant.io/news/blockchains/ethereum-glamsterdam-final-devnet-200m-gas-limit-target
