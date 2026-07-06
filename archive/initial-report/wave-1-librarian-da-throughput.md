# Wave 1 — Data Availability Throughput

Worker: `019f332c-8caf-7202-a229-dfbe764eb529`

## Key Findings

- The DL north star on Strawmap is explicit: `teragas L2`, `1 Gbyte/sec`, via data availability sampling. Treat it as a north star, not committed throughput.
- Near-term DA path:
  - EIP-4844 established blobs and KZG commitments.
  - EIP-7691 raises blob target/max to 6/9 as a cautious short-term bump.
  - EIP-7594 PeerDAS adds one-dimensional erasure coding, columns, and sampling.
  - EIP-7892 BPO forks allow blob-parameter-only capacity increases.
- Medium-term throughput/networking:
  - EIP-8136 cell-level deltas reduce redundant PeerDAS traffic.
  - EIP-8070 sparse blobpool makes EL blobpool role-aware.
  - EIP-8256 blob streaming/AOT tickets is the clearest "blob streaming" design for decoupling pre-propagation from critical path.
- Longer-term/adjacent:
  - EIP-8142 Block-in-Blobs is proof-heavy execution payload availability, not direct DA throughput.
  - EIP-8025 optional execution proofs and EIP-7919 Pureth are adjacent trust-minimization/proving/RPC items, not blob transport.
  - `leanDA` exact canonical label was not verified; likely future DAS/lean agenda.

## Sources

- https://strawmap.org/
- https://eips.ethereum.org/EIPS/eip-4844
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-7607
- https://eips.ethereum.org/EIPS/eip-7691
- https://eips.ethereum.org/EIPS/eip-7892
- https://eips.ethereum.org/EIPS/eip-7918
- https://eip.tools/eip/8136
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8256
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-7919

## EXPAND

- LEAD: PeerDAS implementation status/client path — WHY: distinguishes spec from deployed code — ANGLE: client repos, fork meta, EF protocol updates.
- LEAD: EIP-8256 ticket lifecycle/capacity reservation details — WHY: likely maps to Strawmap blob streaming/short-dated blob futures — ANGLE: read spec/discussion and HackMD.
- LEAD: EIP-8136/EIP-8070 wire formats — WHY: needed for detailed mechanism if space permits — ANGLE: read networking sections.
- LEAD: EIP-8297 canonical text — WHY: partial binary tree may clarify state interlock — ANGLE: EIP index/Forkcast/PR.

## CLAIMS

- CLAIM: 1 GB/sec teragas L2 is a Strawmap north star, not measured current throughput — RISK: high — SOURCES: Strawmap — COUNTER: no executable target found — PRIMARY: Strawmap.
- CLAIM: PeerDAS samples 1/8 of total blob data with possible future lower fractions — RISK: high — SOURCES: EIP-7594 — COUNTER: verify current spec parameters before final — PRIMARY: EIP-7594.
- CLAIM: EIP-7691 changes blob target/max to 6/9 — RISK: high — SOURCES: EIP-7691 — COUNTER: verify current fork activation — PRIMARY: EIP.
