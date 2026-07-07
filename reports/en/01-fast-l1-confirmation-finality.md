# 01 Fast L1: Fast Confirmation, Short Slots, and Fast Finality

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a commitment-grade release schedule. The timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
fast L1, finality in seconds, fast confirmation / FCR, slot duration decreases, quick slots / EIP-8198, SSF / one-round finality, decoupled consensus.

## One-Page Conclusion
This group of optimizations addresses three layers of L1 latency: the head confirmation users see first, the protocol's slot cadence, and economic finality. FCR is the "confirmation signal" that can land fastest, but it is not finality; EIP-8198 first turns the hard-coded 12-second slot into a runtime parameter; SSF / one-round finality / decoupled consensus is the long-term path that actually makes finality itself faster. For Mantle, the biggest impact is not "withdrawals immediately get faster," but the need to express four states separately: L1 head confirmation, L1 finality, L2 proof finality, and withdrawal readiness.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| FCR / fast confirmation | Ethereum's current finalized checkpoint is too slow for exchanges, deposits, and bridging UX, while the head lacks an explainable security level | Provide a single-slot-level fast-confirmed head based on attestations, falling back to the finalized head if assumptions break. [fastconfirm.it](https://fastconfirm.it/) | In the normal case, compresses the "displayable confirmation" to roughly one slot, but must not be treated as irreversible finality |
| slot duration decreases | The 12-second slot is the floor on inclusion latency, and many client assumptions hard-code 12 seconds | Shorten the slot while re-tuning the proposal, attestation, and aggregation deadlines; EIP-8198 first turns slot duration into a configuration item. [EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | Lowers inclusion cadence, but increases pressure on network propagation, hardware, and edge nodes |
| Quick slots / EIP-8198 | Changing slot duration directly touches a large number of implementation assumptions | Introduce runtime consensus configuration such as `SLOT_DURATION_MS`, and require the related blob/gas/churn parameters to move in lockstep. [EIP-8198](https://eips.ethereum.org/EIPS/eip-8198) | Turns "short slots" from a one-shot hard-fork risk into stageable parameter engineering |
| SSF / one-round finality | Current Casper FFG finality does not complete in a single slot, and having all validators vote every slot is too heavy | Research single-slot/one-round finality gadgets, aggregation, and committee designs; the recent one-round notes can serve as an entry point to the Alpenglow/Kudzu/Hydrangea/Minimmit lineage. [ethereum.org SSF](https://ethereum.org/roadmap/single-slot-finality/), [one-round notes](https://notes.ethereum.org/@yannvon/S1wIxIDqbe) | Shortens the wait for irreversible settlement, but implementation difficulty is concentrated in validator set, aggregation, and network synchrony |
| Decoupled consensus | Fast slots and fast finality are coupled to the same voting/propagation budget | Decouple the block production heartbeat from a trailing finality gadget. [decoupled consensus](https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527) | A small committee maintains liveness while a large finality layer adds security in parallel, avoiding "slots got faster but finality got slower" |

## Current Bottleneck
The bottleneck is not a single number but three coupled layers. First, users need low-latency confirmation, but finalized finality is too slow. Second, the 12-second slot limits inclusion cadence, and shortening it compresses the propagation and validation windows. Third, finality requires enough validator participation; if every slot pulls in full-set voting, network and aggregation costs rise quickly.

## Optimization Mechanism
The short-term mechanism is FCR: clients provide a fast-confirmed state whose security is weaker than finality. The mid-term mechanism is EIP-8198: parameterize slot timing, leaving engineering room for 8-second, 6-second, or other experiments. The long-term mechanism is SSF/one-round/decoupled consensus: compress final confirmation from epoch scale to slot scale or fewer rounds, and separate the fast path from the finality path.

## Future Effect
If the roadmap succeeds, users will see reliable confirmation earlier, and exchanges/bridges/wallets can shorten displayed waits; on the protocol side, inclusion cadence gets faster; final economic finality may also come down. But these are not the same security level: fast confirmation can be rolled back; only finality is the strong security boundary.

## Dependencies & Sequencing
FCR can go first, since it requires no hard fork. EIP-8198 is the infrastructure for short slots. Short slots will amplify pressure on ePBS, FOCIL, blob propagation, and p2p, so they cannot be advanced in isolation. SSF/decoupled consensus depends on validator-scale, aggregation, dynamic availability, and network synchrony research.

## Risks & Open Questions
The main risks are false confirmations under adverse network conditions, weak clients falling behind, the builder free option being amplified by short slots, and users assuming fast-confirmed equals finalized. EIP-8198 is still a draft; SSF/decoupled consensus is a research track and should not be written up as a confirmed launch.

## Impact on Mantle
Mantle can use fast-confirmation-style signals to improve deposit/bridging UX, but security-critical paths should still wait for L1 finality and L2 proof/withdrawal conditions. Product copy must avoid the misleading framing of "Ethereum got faster, so Mantle withdrawals naturally get faster." On the engineering side, the watchdog, batch posting, proof submission, and forced inclusion logic all need stress testing against shorter L1 deadlines.

## Recommended Mantle Watchpoints
- Distinguish `L1 fast-confirmed`, `L1 finalized`, `L2 proven`, and `withdrawal ready` in the bridge/explorer/API.
- Track whether FCR enters mainstream client / exchange / bridge policy.
- Track EIP-8198 and consensus-call changes to slot targets.
- Build latency budgets for batch posting, proof posting, and L1 fallback under shorter-slot scenarios.

## Sources
- https://fastconfirm.it/
- https://eips.ethereum.org/EIPS/eip-8198
- https://ethereum.org/roadmap/single-slot-finality/
- https://notes.ethereum.org/%40vbuterin/single_slot_finality
- https://notes.ethereum.org/@yannvon/S1wIxIDqbe
- https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527
