# 05 Teragas L2: PeerDAS and DA Capacity Growth

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not as committed parameters.

## Optimization Coverage
teragas L2, 1 Gbyte/sec, data availability increases, PeerDAS / EIP-7594, blob target/max bump / EIP-7691, BPO forks / EIP-7892, FullDAS / danksharding, leanDA / PQ leanDA sampling.

## One-Page Conclusion
The core of the DA roadmap is to move L2 data capacity from "every node downloads everything" to "nodes verify availability by sampling". PeerDAS has entered mainnet-activated status with Fusaka, and BPO1/BPO2 should likewise be written as activated rather than pending deployment; but `teragas L2` and `1 Gbyte/sec` remain north-stars. For Mantle, the core correction identified by Fable holds: Mantle should now be analyzed as a ZK rollup with Ethereum blobs/calldata as primary DA and OP Succinct/SP1 validity proofs, not under the old external-DA-first + blob fallback narrative. [L2Beat Mantle](https://l2beat.com/scaling/projects/mantle), [Mantle blob transition](https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html)

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| PeerDAS / EIP-7594 | If blob scaling required full downloads by all nodes, bandwidth would grow linearly | Erasure coding, cells/columns, custody sampling. [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594) | Most nodes download only part of the data; DA capacity can expand |
| EIP-7691 blob bump | Blob supply remained tight after 4844 | A historical Pectra item that raised blob target/max to 6/9. [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691) | A completed short-term DA headroom increase; should no longer be written as a future item |
| BPO / EIP-7892 | A full hard fork for every blob parameter adjustment is too heavy | Blob-Parameter-Only forks based on EIP-7840 configuration parameters. [EIP-7892](https://eips.ethereum.org/EIPS/eip-7892) | Blob capacity can be adjusted more frequently |
| FullDAS / danksharding | PeerDAS is still one-dimensional sampling and a staged capacity increase | 2D erasure coding and more complete DAS. [danksharding](https://ethereum.org/roadmap/danksharding/) | Supports higher DA north-stars long term, but still requires research and optimization |
| leanDA / PQ leanDA | The exact label has no canonical source | Maps to the PQ data roadmap / leanVM -> PQ blobs. [pq.ethereum.org](https://pq.ethereum.org/) | Treat as a long-term PQ DA direction caveat, not a confirmed feature |

## Current Bottleneck
Most of the real cost of L2 scaling falls on DA. If all nodes download all blobs in full, DA scaling sacrifices node decentralization. Even with PeerDAS solving availability sampling, blob propagation, pricing, and calldata fallback policy still affect L2 costs. The 2026-07 baseline should be stated clearly: EIP-7691/Pectra already delivered a 6/9 blob target/max; BPO1 pushed the parameters to 10/15; BPO2 pushed them to 14/21; further BPOs depend on continued demand and network telemetry, not linear extrapolation.

## Optimization Mechanism
PeerDAS extends blobs into cells/columns, with nodes sampling by custody/subnet; BPO makes parameter updates lighter; FullDAS continues the push toward two-dimensional sampling. Status freshness checks show that as of 2026-07-06, PeerDAS/EIP-7594 is Final and live on mainnet with Fusaka, and BPO1/BPO2 are activated parameter forks. [ethereum roadmap](https://ethereum.org/roadmap/), [EIP-8134](https://eips.ethereum.org/EIPS/eip-8134), [EIP-8135](https://eips.ethereum.org/EIPS/eip-8135)

## Future Effect
L2s will gain larger Ethereum DA headroom, the marginal pressure of blob congestion will fall, and the primary path for Ethereum-DA rollups becomes more operable. But prices will not automatically go to zero; larger supply will also be absorbed by pricing, reservation, the blobpool, and demand. For Mantle, the key question shifts from "whether to enable an external DA fallback" to "how the blob primary path, calldata fallback, batch compression, and posting cadence jointly determine cost and reliability".

## Dependencies & Sequencing
EIP-4844 is the foundation; EIP-7691/Pectra is a completed short-term bump; PeerDAS is the core of capacity expansion; BPO handles the subsequent parameter cadence; propagation-layer optimizations such as EIP-8070/8136/8256 play a larger role after PeerDAS.

## Risks & Open Questions
DAS security depends on a sufficiently large, well-connected sampling network. `1 Gbyte/sec` should not be written as a parameter. `leanDA/PQ leanDA` currently has no public canonical source and should be placed in the fuzzy-label appendix.

## Impact on Mantle
Mantle's DA chapter needs to shift from the old external-DA-first narrative to an Ethereum-DA rollup operations narrative. L2Beat currently describes transaction data as published to Ethereum blobs, with state transitions verified on-chain by OP Succinct/SP1 validity proofs; Mantle's 2026-01 announcement also describes the move to Ethereum blobs as a step toward a full Ethereum ZK rollup architecture. EigenDA can still serve as background on the historical architecture and the EigenLayer ecosystem relationship, but should not be treated as the current primary DA premise.

## Recommended Mantle Watchpoints
- Build a blob primary-path runbook: blob fee spikes, blob inclusion delay, calldata fallback, batch backlog.
- Compare blobs vs calldata under the post-Arsia L1 data fee model, no longer using EigenDA-only / mixed DA as the main decision matrix.
- Bring DA bridge verification, the data-root API, replayability, and batch repost policy into SLOs.
- Do not write teragas/1GB/s into near-term capacity commitments.

## Sources
- https://ethereum.org/roadmap/fusaka/peerdas/
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-7691
- https://eips.ethereum.org/EIPS/eip-7892
- https://eips.ethereum.org/EIPS/eip-7840
- https://eips.ethereum.org/EIPS/eip-8134
- https://eips.ethereum.org/EIPS/eip-8135
- https://ethereum.org/roadmap/danksharding/
- https://pq.ethereum.org/
- https://l2beat.com/scaling/projects/mantle
- https://www.prnewswire.com/news-releases/mantle-advances-toward-full-ethereum-zk-rollup-architecture-with-strategic-transition-to-ethereum-blobs-302667817.html
