# Wave 1 — Mantle Implications

Worker: `019f332c-e9fc-76f3-9d86-e579a936c0ec`

## Key Findings

- Strawmap's L2 signal is not that rollups disappear; it is that L1 becomes materially better at serving rollups through DA, faster finality, proving, and possibly native rollup verification.
- Mantle's public positioning remains modular: EigenDA as DA provider and movement toward ZK validity with SP1.
- Main Mantle implications:
  - Blob/DA economics remain a strategic variable even if EigenDA is primary.
  - Ethereum DA scaling should be periodically compared against EigenDA-first and mixed-DA strategies.
  - Native rollups / `EXECUTE`-style verification may become an architecture compatibility question for any ZK-validity L2.
  - Faster L1 finality compresses settlement and bridge assumptions, but does not automatically make L2 proof finality instant.
  - Mempool/privacy improvements on L1 may raise user expectations for L2 sequencing and fair-ordering surfaces.
  - Compatibility risks are operational: DA delivery, cost predictability, proof latency, bridge semantics, ordering/finality language.

## Sources

- https://strawmap.org/
- https://www.mantle.xyz/blog/announcements/mantle-network-security-evolution-scalability-decentralization
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://www.mantle.xyz/blog/announcements/mantle-completes-mainnet-v2-tectonic-upgrade
- https://eips.ethereum.org/EIPS/eip-4844
- https://eips.ethereum.org/EIPS/eip-7594
- https://ethereum.org/roadmap/danksharding/
- https://ethereum.org/roadmap/single-slot-finality/
- https://blog.ethereum.org/2026/03/23/l1-l2-ethereum
- https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517
- https://blog.ethereum.org/2025/08/05/protocol-update-001
- https://blog.ethereum.org/2025/08/22/protocol-update-002

## EXPAND

- LEAD: Compare Mantle roadmap against major L2s for competitive/parity risks — WHY: useful follow-up but not required for Strawmap explanation — ANGLE: public docs of Optimism/Arbitrum/Base/Scroll/zkSync.
- LEAD: DA cost-sensitivity table for Mantle — WHY: would translate roadmap to treasury/product scenarios — ANGLE: model blob price shocks, throughput growth, EigenDA fallback.

## CLAIMS

- CLAIM: Strawmap north stars include teragas L2, fast L1, gigagas L1, post-quantum L1, and private L1 — RISK: normal — SOURCES: Strawmap FAQ/drawing — COUNTER: direct page export already captured — PRIMARY: Strawmap.
- CLAIM: Mantle says EigenDA v2 is `50mbps+` and average/p99 confirmation figures — RISK: high — SOURCES: Mantle blog — COUNTER: re-fetch before final if used — PRIMARY: Mantle blog.
- CLAIM: Mantle says SP1 transition targets chain finality within one hour — RISK: high — SOURCES: Mantle SP1 blog — COUNTER: re-fetch before final if used — PRIMARY: Mantle blog.
