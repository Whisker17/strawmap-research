# Appendix A: Fork Status, North Stars, and Timeline Caveats

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Why This Appendix Exists
The Strawmap puts research directions, EIP statuses, fork candidates, long-term north stars, and visual labels on a single diagram. When briefing the Mantle dev team, "in production", "scheduled", "considered", "draft research", and "north-star" must be kept apart, otherwise the roadmap is easily misread as a commitment.

## Status Table (2026-07-06)
| Item | Current status | How to phrase it |
|---|---|---|
| Fusaka | In production | In production; do not write it as pending |
| PeerDAS / EIP-7594 | Final, shipped to mainnet with Fusaka | DA scaling has reached the mainnet stage, but the follow-on FullDAS is still future work |
| BPO1 / BPO2 | Activated mainnet parameter forks | Activated, not pending deployment |
| EIP-7918 | Final, Fusaka included | The blob fee floor is already Final |
| Glamsterdam | In development; final devnet / mainnet expected around 2026 Q3-Q4 | Still in development; do not write it as activated |
| EIP-7732 ePBS | Draft, scheduled for Glamsterdam | May be written as scheduled, but not deployed |
| EIP-7928 BALs | Draft, scheduled for Glamsterdam | May be written as scheduled, but not deployed |
| EIP-7976 / EIP-7981 / EIP-8037 | Glamsterdam SFI repricing | Calldata/access-list/state-creation repricing is a near-term cost-model input |
| EIP-8038 / EIP-8070 / EIP-8136 / EIP-8159 / EIP-8189 | Glamsterdam CFI | May be written as considered, but not scheduled |
| Hegotá | In development, targeting 2026 Q4, realistically may slip into 2027; the Strawmap places it in the 2027 column | Still in development, and dependent on Glamsterdam's progress |
| EIP-7805 FOCIL | Draft, scheduled for Hegotá | May be written as scheduled, but not deployed |
| EIP-8141 Frame Tx | Draft, considered for Hegotá | Can only be written as considered, not scheduled |
| EIP-8131 | Hegotá PFI | May serve as a follow-on tx-content floor direction; do not write it as scheduled |
| EIP-8184 LUCID | Draft, not listed in any fork meta | Do not write it as fork-scheduled |
| EIP-7938 | Stagnant | Do not write it as an active gas-limit plan |
| EIP-8025 | Stagnant | May serve as an optional proof concept, not as an active fork |
| EIP-6800 / EIP-7736 / EIP-7919 / EIP-7503 | Stagnant | Content related to Verkle/state expiry/Pureth/wormholes needs to be softened |
| EIP-7935 | Final, Fusaka | The 60M default gas-limit is the current execution-layer baseline |

## Baseline Numbers (2026-07)
- Blob capacity: EIP-7691/Pectra set 6/9 target/max; BPO1 is 10/15; BPO2 is 14/21. Subsequent BPOs should follow demand and network telemetry, not a linear commitment.
- Execution gas: EIP-7935 is Final, and Fusaka's default gas-limit target is 60M; Glamsterdam's 200M gas can only be written as a design target / the minimum credible capacity target from external reporting, not a fork-enforced parameter.
- Fast L1: EIP-8198 parameterizes slot duration; the common discussion is 12s -> 8s, but 8s remains a placeholder/candidate target.
- FOCIL: EIP-7805's committee/IL parameters should be tracked as the spec evolves; the reports treat it only as the Hegotá scheduled inclusion-list direction and do not pin down specific values.

## Handling North-Star Labels
- `fast L1`, `gigagas L1`, `teragas L2`, `post quantum L1`, and `private L1` are directional targets, not hard-fork parameters.
- Numbers like `1 Gbyte/sec` and `1 Ggas/sec` should be written as north-star / benchmark / research targets, unless a corresponding EIP explicitly specifies the parameter.
- The years and I*/J*/K*/L* visual groupings in the diagram cannot automatically be equated with a confirmed schedule.
- The question-mark marker in the Strawmap legend means "whether this will ship is still uncertain"; labels such as snail issuance, 1M attestations, attester-proposer separation, VDF, secret proposers, proofs of custody, short/long-dated futures, and endgame state need to carry this uncertainty grading forward.

## Recommended Phrasing When Briefing Mantle
- "PeerDAS/Fusaka is live on mainnet; further capacity growth continues via BPO/FullDAS and similar work."
- "ePBS/BALs are Glamsterdam scheduled items, but Glamsterdam is not yet in production."
- "FOCIL is a Hegotá scheduled item; Frame Tx is only considered."
- "Private L1 / LUCID / native rollups / PQ CL are mostly still draft or research and should be managed as a long-term watchlist."

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
