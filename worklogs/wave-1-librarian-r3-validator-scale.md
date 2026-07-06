# Wave 1 Digest: R3 Validator-Scale Consensus, Issuance, and Lean Specs

Agent: `019f3538-9e3d-74c0-9a79-d9fa21b0acf1`

## Key Findings

- Validator-set growth is a communication bottleneck: today's slot structure aggregates around tens of thousands of attestations, while single-slot-epoch style designs would stress the full validator set.
- Horn, dynamic availability, and LMD-GHOST plus fast-following-finality converge on the same pattern: small heartbeat committees for the fast path, with heavier full-set finality off the critical path.
- Post-quantum constraints sharpen the need for this split because PQ signatures lack practical BLS-style aggregation; a small heartbeat can concatenate signatures earlier than full PQ finality can be solved.
- Orbit SSF proposes a stable-core / rotating-periphery validator-set design to keep active validator count tractable while preserving stake-proportional rewards.
- `snail issuance` has no canonical EIP/source mapping; it is best treated as an informal media/social label for issuance reduction / tempered issuance research.
- Lean specs / beacon specs merge is best framed as technical-debt reset and spec tooling work, not a completed merge.

## Sources Surfaced

- https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856
- https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928
- https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747
- https://ethresear.ch/t/faq-ethereum-issuance-reduction/19675
- https://ethresear.ch/t/reward-curve-with-tempered-issuance-eip-research-post/19171
- https://eips.ethereum.org/EIPS/eip-8198
- https://github.com/leanEthereum/leanSpec
- https://github.com/ethereum/consensus-specs
- https://l2beat.com/scaling/projects/mantle
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://www.mantle.xyz/blog/developers/mantle-unlocking-the-potential-of-modular-blockchain-scaling

## Mantle Implications

- Faster heartbeat/finality reduces L1 confirmation latency for Mantle, but does not remove L1 reorg and proof-finalization risk.
- Mantle security messaging should treat L1 settlement finality and Mantle proof finality as separate layers.
- PQ-friendly heartbeat first / full PQ finality later implies a staged security transition for L2 settlement assumptions.

## EXPAND Markers

- LEAD: Source matrix by formal/informal/inferred label — WHY: `snail issuance` and lean-spec labels are easy to overstate — ANGLE: classify each claim by source authority.
