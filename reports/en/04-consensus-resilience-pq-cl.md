# 04 Consensus-Layer Resilience and Post-Quantum CL

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a commitment-grade release schedule. The timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
post quantum L1, hash-based signatures, PQ validator pubkey registry, post quantum heartbeat, PQ leanXMSS attestations, real-time CL proofs, specs quantum, VDF randomness, secret proposers / Whisk / SSLE, 51% attack auto-recovery.

## One-Page Conclusion
This set of tracks splits Ethereum's long-term security problems into three categories: cryptographic migration, leader/proposer DoS resistance, and recovery after extreme attacks. PQ is not a single fork: first comes account/signature agility, then a validator PQ key registry, then the PQ heartbeat / attestations, and only afterward possibly full PQ consensus. For Mantle, this is a long-term migration risk to settlement security, and a place where the prover stack and bridge security copy need to be layered in advance.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| PQ pubkey registry | Validators have no smooth path to register PQ keys | Pre-register/bind PQ public keys. [PQ registry](https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040) | Separates key enrollment from activation, reducing migration coordination risk |
| PQ heartbeat | PQ signatures are large and lack BLS-style aggregation | A small committee heartbeat allows concatenating PQ signatures. [dynamic availability](https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418) | The fast path can become PQ-friendly earlier, with full finality upgradeable later |
| PQ leanXMSS / leanVM | Hash-based signature sets are too large, with high verification/transport costs | The Strawmap uses `leanXMSS` as the label on the diagram; the public repos are currently named leanVM/leanSig, and the old leanMultisig link redirects. [leanVM](https://github.com/leanEthereum/leanVM), [leanSig](https://github.com/leanEthereum/leanSig) | Gives PQ attestations a proof-compression path, but the parameters are still research |
| Real-time CL proofs | CL verification and light-client proofs are costly | Use leanVM/recursive proofs to prove consensus properties. [PQ roadmap](https://pq.ethereum.org/) | Reduces light-verification cost and helps PQ migration |
| VDF randomness | RANDAO randomness can be biased by the last revealer | RANDAO + VDF with delayed randomness output. [VDF beacon](https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566) | Improves proposer/committee randomness quality, but hardware and PQ alternatives remain unresolved |
| Secret proposers / Whisk | Proposer identity is exposed in advance, making it easy to DoS | Shuffle-based SSLE hides the proposer. [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763) | Reduces pre-targeting and proposer DoS |
| 51% attack auto-recovery | After a majority attack, online nodes struggle to agree on the timely chain | Timeliness detectors judge whether a block is timely. [timeliness detectors](https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925) | Post-attack recovery gains more protocol grounding, but depends on synchrony assumptions |

## Current Bottleneck
Over the long term, BLS/ECDSA, curve-based proofs, public proposers, RANDAO bias, and coordinated recovery after majority attacks are all security debt. The biggest PQ bottleneck is not "finding a signature algorithm," but validator identity, signature size, aggregation, proof compression, and migration ordering.

## Optimization Mechanism
The PQ track takes a staged migration: the account layer first gains signature agility via AA/Frame txs; the CL first does the key registry; the fast path uses a small heartbeat; full finality and real-time proofs follow later. The resilience track uses VDF/Whisk/timeliness detectors to protect randomness, leader privacy, and attack recovery.

## Future Effect
If successful, Ethereum can progressively reduce quantum risk, shrink the proposer DoS surface, and increase recovery certainty after extreme attacks. The most important change is the layering of security semantics: the PQ heartbeat may come before full PQ finality, and account PQ may come before validator PQ.

## Dependencies & Sequencing
This report is strongly related to 03 validator-scale, 13 frame tx, and 11 proving substrates. leanVM/leanSig are research-implementation signals, not production-grade protocol parameters. `specs quantum` should map to the PQ roadmap / Lean Ethereum, not a standalone EIP.

## Risks & Open Questions
PQ signature statefulness, XMSS key management, proof security parameters, VDF hardware assumptions, the Whisk anonymity set, and timeliness synchrony bounds are all not fully settled. Do not write leanVM benchmarks up as protocol guarantees.

## Impact on Mantle
Mantle's bridge, finality, and proof stack will all be affected by the L1 PQ migration. If L1 gets a PQ heartbeat before full PQ finality, Mantle needs to describe "PQ readiness of the fast-confirmation layer" and "PQ readiness of the final settlement layer" separately in its risk model. The SP1/zkVM direction should also track hash-based proof/signature compatibility.

## Recommended Mantle Watchpoints
- Add a PQ migration timeline watchlist to the internal security model.
- Have the prover team track leanVM, leanSig, and hash-based proof compression.
- Avoid writing PQ readiness as a single boolean in bridge/explorer copy.
- Have incident response documentation follow timeliness detector / 51% recovery research.

## Sources
- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://pq.ethereum.org/
- https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://ethresear.ch/t/minimal-vdf-randomness-beacon/3566
- https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763
- https://ethresear.ch/t/timeliness-detectors-and-51-attack-recovery-in-blockchains/6925
