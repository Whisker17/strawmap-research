# Wave 1 Digest: R6 Blob Propagation, Custody, and Streaming

Agent: `019f3538-c090-71d2-bc54-335137e2eae4`

## Key Findings

- The blob propagation bottleneck is critical-path bandwidth and validation work, not only raw blob size.
- EIP-8070 sparse blobpool reduces EL full-fetch pressure by making most EL nodes sample custody-aligned columns instead of full blobs.
- EIP-8136 cell-level deltas reduces redundant PeerDAS traffic by exchanging only missing cells.
- PeerDAS uses sender-computed cell proofs and peer sampling to keep availability checks sublinear.
- EIP-8256 blob streaming splits AOT and JIT blobs; AOT uses ticketed advance reservation and pre-propagation, while JIT remains critical-path.
- `short-dated blob futures` is best interpreted as reservation/ticket lifecycle, not a financial derivatives market.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-8256
- https://ethereum-magicians.org/t/eip-8070-sparse-blobpool/26023
- https://ethereum-magicians.org/t/eip-8136-cell-level-deltas-for-data-column-broadcast/27675
- https://ethereum-magicians.org/t/eip-8256-blob-streaming/28586
- https://ethereum-magicians.org/t/all-core-devs-consensus-acdc-172-jan-8-2026/27168

## Mantle Implications

- PeerDAS plus EIP-8136 and EIP-8070 improves batch posting reliability under load.
- EIP-8256 changes the ops problem from pure critical-path propagation to ticket inventory, expiration, reorg invalidation, and scheduled pre-propagation.
- Mantle should monitor EL blobpool bandwidth, provider/sampler balance, custody-set changes, JIT/AOT split, and ticket lifecycle if AOT lands.

## EXPAND Markers

- none returned explicitly; worker's research identified Magicians discussions as ongoing risk surfaces.
