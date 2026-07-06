# Wave 1 Digest: R4 Consensus Resilience and Post-Quantum CL

Agent: `019f3538-ac19-7cb0-80d2-4b4ccded1e98`

## Key Findings

- Ethereum's PQ roadmap is explicitly multi-layer, not one fork: accounts/signature agility, consensus validator registry, PQ attestations/heartbeat, real-time CL proofs, and eventually full PQ consensus.
- The near-term PQ bottleneck is validator identity and signature aggregation, not merely signature verification.
- PQ validator pubkey registry decouples key enrollment from activation, reducing migration coordination risk.
- Dynamic availability / PQ heartbeat makes liveness PQ-friendly earlier by using a small committee where concatenated PQ signatures are plausible.
- leanVM / leanMultisig is an implementation signal for compressing hash-based signature sets, but its current parameters are not protocol-grade guarantees.
- VDF randomness, Whisk/SSLE, secret proposer selection, and timeliness detectors are resilience hardening tracks rather than near-term fork commitments.

## Sources Surfaced

- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://pq.ethereum.org/
- https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanMultisig/blob/12e61512416548e743040aab4daf83c58a5c5476/README.md#L7-L91
- https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566
- https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763
- https://ethresear.ch/t/secret-non-single-leader-election/11789
- https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925

## Mantle Implications

- PQ migration changes Mantle settlement assumptions gradually, not all at once.
- Mantle should watch validator key migration and proof-interface changes because L1 finality and bridge UX may move on different schedules.
- Prover-stack compatibility with hash-based signatures and recursive proof compression should remain on the watchlist.

## EXPAND Markers

- LEAD: Track leanVM/leanMultisig security parameters — WHY: repo benchmark is not protocol-grade security — ANGLE: monitor README/security parameter updates.
