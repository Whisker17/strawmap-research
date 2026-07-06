# Wave 1 — Cross-Layer Dependency Graph and Fork Sequencing

Worker: `019f332c-da76-7ed1-88e1-ca387819bc60`

## Key Findings

- Strawmap says arrows represent hard technical dependencies or natural upgrade progressions.
- Canonical current sequence: Fusaka -> Glamsterdam -> Hegotá, then placeholders I*, J*, K*, L*, longer term.
- EIP-8133 explains fork naming: Glamsterdam = Gloas + Amsterdam; Hegotá = Heka + Bogotá.
- Explicit dependencies are strongest for Fusaka and Glamsterdam meta EIPs:
  - EIP-7607 is Fusaka/Fulu-Osaka.
  - EIP-7773 is Glamsterdam.
  - Glamsterdam requires EIP-7607 and EIP-7723.
  - EIP-7892 enables blob-parameter-only forks.
- Long-range PQ roadmap:
  - I*: PQ key registry.
  - J*: PQ signature verification precompiles.
  - L*: PQ attestations and real-time CL proofs via leanVM.
  - M*: full PQ signature aggregation and PQ-safe blob commitments.
  - K* remains opaque in public sources found.
- Inferred dependency logic:
  - ePBS before wider L1 scaling because block building/proposer responsibilities need stronger enshrinement.
  - BALs before parallelization and aggressive scaling because access dependencies need protocol visibility.
  - gas repricing before capacity jumps because underpriced resources distort scaling.
  - BPO forks enable blob capacity increments without full hard forks.
  - PQ key registry and verifier/precompile support precede PQ attestations.

## Sources

- https://strawmap.org/
- https://ethereum.org/roadmap/
- https://ethereum.org/roadmap/glamsterdam/
- https://ethereum.org/roadmap/future-proofing/
- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://eips.ethereum.org/EIPS/eip-7607
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8133
- https://eips.ethereum.org/EIPS/eip-7892
- https://eips.ethereum.org/EIPS/eip-8007

## EXPAND

- LEAD: Forkcast/current selection reconciliation for Glamsterdam and Hegotá — WHY: schedule/headliner claims are drifting across sources — ANGLE: Forkcast upgrade pages, ethereum.org roadmap, EIP meta pages, ACD notes.

## CLAIMS

- CLAIM: Ethereum roadmap currently shows Glamsterdam and Hegotá in development for H2 2026 — RISK: high — SOURCES: ethereum.org roadmap — COUNTER: compare with Forkcast and meta EIPs — PRIMARY: ethereum.org.
- CLAIM: EIP-7773 schedules 10 EIPs for Glamsterdam — RISK: high — SOURCES: EIP-7773 — COUNTER: audit current scheduled list before final — PRIMARY: EIP-7773.
- CLAIM: Strawmap targets seven forks by 2029 — RISK: high — SOURCES: Strawmap FAQ — COUNTER: explicitly downgrade to heuristic — PRIMARY: Strawmap.
