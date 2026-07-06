# Wave 1 — Consensus Scalability, Lean Consensus, and Post-Quantum CL

Worker: `019f332c-8393-78f3-a37f-dc0c53441b16`

## Key Findings

- The shared bottleneck across most long-term CL items is decoupling fast heartbeat latency from full-set finality and validator aggregation.
- `1M attestations per slot`: active research pressure point. Naive full-set single-slot finality scales poorly due to aggregation/bandwidth.
- `snail issuance`: no canonical exact phrase found; closest framing is issuance throttling / validator-set capping from Orbit SSF and issuance policy research. Treat as economic-policy research.
- `beacon & lean specs merge`: Lean Ethereum frames lean consensus as beacon chain 2.0; leanSpec/leanMultisig are active spec/library surfaces.
- `tech debt reset`: EIP-8198 makes slot duration runtime-configurable and removes hardcoded 12-second assumptions.
- `51% attack auto-recovery`: timeliness-detector research could help online clients converge after bad attacks, but not a protocol commitment.
- `post quantum heartbeat`: dynamic availability / ~256-validator heartbeat committee is a plausible near-term PQ bridge because it avoids full-set PQ aggregation on the critical path.
- `post quantum pubkey registry`: preparatory design-space exploration for validator PQ keys, not finalized.
- `PQ leanXMSS attestations`: leanSpec/leanMultisig implementation/spec work, not deployed.
- `VDF randomness`: historically important RANDAO+VDF line, but maturity/priority appears lower relative to newer CL designs.
- `real-time CL proofs`: aspirational/research, tied to lean consensus and ZK light-client/consensus verification.
- `secret proposers`: Whisk/SSLE-style research for DoS resistance and proposer privacy.
- `specs quantum`: strategic Lean Ethereum direction around hash-based/PQ primitives.

## Sources

- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://ethresear.ch/t/horn-collecting-signatures-for-faster-finality/14219
- https://ethresear.ch/t/lmd-ghost-with-256-validators-and-a-fast-following-finality-gadget/22856
- https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928
- https://ethresear.ch/t/practical-endgame-on-issuance-policy/20747
- https://ethresear.ch/t/maximum-viable-security-a-new-framing-for-ethereum-issuance/19992
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanSpec
- https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26
- https://eips.ethereum.org/EIPS/eip-8198
- https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925
- https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040
- https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763
- https://ethresear.ch/t/secret-non-single-leader-election/11789

## EXPAND

- LEAD: Dependency graph for decoupled consensus, heartbeat committees, and 1-round finality — WHY: several CL boxes depend on the same architecture split — ANGLE: compare dynamic availability, decoupled consensus, SSF, quick slots.
- LEAD: Exact meaning of `snail issuance` — WHY: source phrase not canonical — ANGLE: search exact phrase and ask whether it maps to Orbit/issuance capping.
- LEAD: Real-time CL proofs source mapping — WHY: strawmap item lacks single settled spec — ANGLE: find ZK-verified consensus / light-client proofs docs.

## CLAIMS

- CLAIM: EIP-8198 is a Draft proposal created 2026-03-17 and requires EIP-7892 — RISK: high — SOURCES: EIP-8198 — COUNTER: verify official page before final — PRIMARY: EIP.
- CLAIM: Dynamic-availability post states current aggregation around 30,000 attestations/slot and single-slot epoch pushes toward about 1M validators — RISK: high — SOURCES: ethresear.ch dynamic availability — COUNTER: cross-check current validator/committee numbers if using exact figures — PRIMARY: research post.
- CLAIM: Dynamic-availability post says ~256-validator heartbeat with ~3 KB signatures implies ~768 KB payload — RISK: high — SOURCES: dynamic availability — COUNTER: recompute and mark as proposal-specific — PRIMARY: research post.
