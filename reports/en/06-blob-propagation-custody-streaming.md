# 06 Blob Propagation, Custody, and Streaming

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not as committed parameters.

## Optimization Coverage
sparse blobpool / EIP-8070, cell-level deltas / EIP-8136, local blob reconstruction, proofs of custody, blob streaming / EIP-8256, short-dated blob futures / ticketed AOT / BLOBBASEFEE futures.

## One-Page Conclusion
PeerDAS solves the sampling question of "is the data available", but does not automatically solve "how the data propagates efficiently". This group of optimizations moves blob propagation from an EL full-replication blobpool toward custody-aligned sampling, cell deltas, local reconstruction, and ticketed pre-propagation. For Mantle, the most direct impact is on batch posting reliability and submission-window management: in the future it is not just about competing on the critical path — capacity may be purchased/pre-propagated in advance.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| Sparse blobpool / EIP-8070 | Full replication in the EL blobpool would become the dominant bandwidth term | EL nodes full-fetch probabilistically; the rest sample by CL custody columns. [EIP-8070](https://eips.ethereum.org/EIPS/eip-8070) | Average blobpool bandwidth drops; builders can still full-fetch |
| Cell-level deltas / EIP-8136 | Whole columns are retransmitted even when a node already has most cells | Exchange only missing cells via bitmap/partial messages. [EIP-8136](https://eips.ethereum.org/EIPS/eip-8136) | Reduces redundant traffic and CL wait time |
| Local blob reconstruction | Under DAS, not every node has the complete blob | Reconstruct blobs/proofs locally once enough columns/cells are held. [EIP-8070](https://eips.ethereum.org/EIPS/eip-8070) | Improves recovery and verification capability |
| Proofs/custody alignment | Sampling nodes need to prove/fulfill the data they custody | Align PeerDAS custody with EL sampling. [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) | Availability security does not depend on full downloads at every node |
| Blob streaming / EIP-8256 | Pre-propagation is unbounded; JIT blobs stay on the critical path | AOT/JIT split, with AOT capacity pre-purchased via tickets and pre-propagated over CL gossip. [EIP-8256](https://eips.ethereum.org/EIPS/eip-8256) | Known batches can be prepared in advance, reducing critical-path pressure |
| Short-dated blob futures | The term has two layers: blob fee futures and AOT reservation | `BLOBBASEFEE` enables blob futures; EIP-8256 enables ticketed capacity reservation. [EIP-7516](https://eips.ethereum.org/EIPS/eip-7516) | Can serve both as a price/fee instrument and as an operational reservation; the two must be written separately |

## Current Bottleneck
As blob demand rises, a full EL blobpool competes for bandwidth with blocks, attestations, and DAS traffic. PeerDAS spares nodes from full downloads, but gossip, missing cells, custody peers, and AOT/JIT classification still determine actual availability.

## Optimization Mechanism
EIP-8070 turns most EL nodes into samplers; EIP-8136 sends missing cells via partial messages; EIP-8256 moves part of the blobs off the critical path onto a ticketed AOT path. The three respectively address average bandwidth, redundant propagation, and the submission window.

## Future Effect
Batch posting for L2s like Mantle will gain a more predictable submission path: urgent batches go JIT, planned batches go AOT; under network congestion, deltas/custody reduce propagation failures. But this also introduces new ops issues: ticket inventory, expiry, reorg invalidation, and key/signature handling.

## Dependencies & Sequencing
PeerDAS is the foundation; EIP-8136 and EIP-8070 are propagation optimizations on top of PeerDAS; EIP-8256 is higher-level capacity scheduling. Short-dated futures should be split in the report into two threads: BLOBBASEFEE fee futures and AOT reservation.

## Risks & Open Questions
Sparse sampling may be affected by eclipse attacks, peer scoring, and RBF; AOT/JIT classification, ticket front-running, reorg handling, and EL mempool removal are all contested. Status must be written separately: EIP-8070 and EIP-8136 have entered the Glamsterdam CFI networking list; EIP-8256 is still treated as draft/research. [EIP-7773](https://eips.ethereum.org/EIPS/eip-7773)

## Impact on Mantle
Mantle should upgrade batch posting from "waiting for a blob slot" to "capacity inventory management": decide in advance which batches can go AOT and which must go JIT; monitor tickets, custody health, the JIT/AOT ratio, and blobpool bandwidth. Because Mantle should now be viewed with Ethereum blobs as primary DA, the weight of this optimization group rises: EIP-8070/8136 affect steady-state blobpool bandwidth and propagation reliability, and EIP-8256 affects whether planned batches can be moved off the critical path in the future.

## Recommended Mantle Watchpoints
- Design a batch scheduler: urgent JIT vs planned AOT.
- Build monitoring for ticket inventory / expiry / reorg risk.
- Monitor the PeerDAS custody set and the EL sampler/provider balance.
- Distinguish blob fee hedging from blob capacity reservation.

## Sources
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-8256
- https://eips.ethereum.org/EIPS/eip-7516
- https://eips.ethereum.org/EIPS/eip-7773
- https://ethereum-magicians.org/t/eip-8070-sparse-blobpool/26023
- https://ethereum-magicians.org/t/eip-8256-blob-streaming/28586
