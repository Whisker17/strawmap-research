# ULW-Research Synthesis: Ethereum L1 Strawmap

Workers: 17+ lanes · Waves: 2 · Source pages fetched locally: 43 link entries, 37 non-X pages attempted · Verification: live HTTP exports, SVG/PDF/PNG drawing extraction, EIP/fork-state reconciliation.

## Executive Summary

Strawmap is best understood as a draft coordination artifact for Ethereum L1 protocol work, not a deterministic fork roadmap. Its five north stars are fast L1, gigagas L1, teragas L2, post-quantum L1, and private L1. The actionable substance is the dependency structure: CL latency and roles, DL sampling/blob propagation, and EL proof/state/fee hardening.

For Mantle, the near-term relevance is DA economics and finality semantics; the medium-term relevance is prover/state compatibility; the long-term relevance is whether native-rollup/proof-heavy L1 changes alter what "Ethereum-aligned L2" means.

## Findings by Theme

- Consensus: fast confirmation can ship as client heuristic; quick slots/ePBS/FOCIL are fork-scoped with different maturity. ePBS and BALs are scheduled for Glamsterdam; FOCIL is scheduled for Hegotá.
- Data: EIP-4844 -> PeerDAS -> BPO -> sparse blobpool/cell deltas -> blob streaming is the clearest path toward more DA. Teragas L2 is aspirational.
- Execution: gigagas L1 needs repricing, BALs, p2p changes, proof-heavy validation, state model changes, and EVM/tx hardening; gas-limit increases alone are insufficient.
- PQ/privacy: registry/heartbeat/XMSS and frame tx/encrypted mempool/shielded transfer tracks are real research, but mostly long-horizon.

## Verified Claims

- North-star numeric claims are aspirational and should not be treated as committed throughput. Source: Strawmap FAQ/export.
- FOCIL/EIP-7805 is declined for Glamsterdam but scheduled for Hegotá in current official meta EIPs. Sources: EIP-7773, EIP-8081.
- EIP status and fork bucket claims are time-sensitive and must be refreshed before external publication.

## Contradictions and Gaps

- EIP-7778 / 6s slots appears in some roadmap discussions but is declined in EIP-7773; report avoids treating it as scheduled.
- Some labels do not have precise canonical sources: `snail issuance`, `leanDA`, `short-dated blob futures`, `long-dated gas futures`, `lean privacy wormholes`.
- Google published doc link was not accessible locally and is excluded from claims.

## Expansion Trace

- Wave 1 covered all axes and produced expansion leads.
- Wave 2 closed fork-state reconciliation, execution/privacy interfaces, and gas/pricing crosswalk.
- Convergence reason: all user-requested axes covered; ambiguous labels either mapped with caveat or marked unresolved; high-risk schedule/numeric claims downgraded.
