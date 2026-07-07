# 14 Private L1: Encrypted Mempool, Shielded Transfers, and the Privacy Roadmap

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
private L1, privacy mempool, encrypted mempool / LUCID / EIP-8184, distributed encrypted mempool, GhostPool, shielded transfers, lean privacy wormholes, FOCIL relation, frame tx relation.

## One-Page Conclusion
Private L1 is not a single feature but a three-layer problem: mempool content/intent privacy, admission metadata privacy, and onchain value-transfer privacy. LUCID/EIP-8184 is the encrypted mempool closest to protocolization; GhostPool hides admission metadata such as sender/nonce; shielded transfers hide in-contract transfer information. For Mantle, fair sequencing and transparent MEV capture are not transaction confidentiality; if the L1 offers a public encrypted mempool, the L2 will face privacy-parity pressure.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| LUCID / EIP-8184 | Public mempool leaks transaction content and ordering opportunities; private orderflow entrenches builders | Sealed tx, commit-before-reveal, FOCIL-backed inclusion, delayed key release. [EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | The public path can also carry MEV-sensitive encrypted flow |
| Distributed encrypted mempool | Reliance on a single encryption scheme/relay is undesirable | Threshold encryption, proposer commitments, PBS integration. [encrypted mempool](https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717) | A modular encrypted inclusion architecture |
| GhostPool | Encrypted mempool admission still leaks sender/nonce | Root-bound ZK proof + shared nullifier namespace. [GhostPool](https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327) | Hides identity-critical metadata, but gas/fee/network metadata remains visible |
| Shielded transfers | L1 contract transfers expose sender/recipient/amount | Commitment/nullifier contract pools. [shielded transfers](https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424) | In-contract value-transfer privacy, which is not the same as mempool privacy |
| FOCIL relation | If encrypted txs cannot be force-included, they can still be censored | FOCIL provides the inclusion backbone. [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) | Combines censorship resistance with privacy |
| Lean privacy wormholes | Exact label is non-canonical | Maps to Zero-Knowledge Wormholes / native privacy. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) | A long-term privacy primitive, not a settled feature |

## Current Bottleneck
The public mempool exposes content, intent, sender/nonce, timing, and gas parameters, making MEV, copy trading, censorship, and account linkability the norm. Private orderflow protects users but sacrifices public verifiability and decentralization.

## Optimization Mechanism
LUCID brings transaction ciphertexts into the inclusion pipeline, commitment first and reveal after; GhostPool protects admission metadata with proofs/nullifiers; shielded transfers hide transfer contents with a commitment tree; FOCIL/frame tx respectively provide the inclusion and validation/payment foundations.

## Future Effect
L1 may gain a transaction lane that is publicly propagated, censorship-resistant, and content-encrypted. Users would not have to rely entirely on private relays; but metadata leakage will not drop to zero — key publishers, PTC timing, fee fields, network origin, and contract touch patterns can still expose information.

## Dependencies & Sequencing
EIP-8184 depends on EIP-7805/FOCIL; frame tx enlarges the arbitrary validation surface and may require recent roots/keyed nonces/validation policy; GhostPool can complement admission privacy laterally; shielded transfers sit at the application/contract layer, not the mempool layer.

## Risks & Open Questions
LUCID risks include reveal optionality, low-ToB DoS, key publisher trust, PTC bribery/timing, and metadata leakage. GhostPool leaves fee/network metadata exposed. Shielded pools have tree growth, viewing keys, and UX friction. EIP-8184 is still Draft and not listed in any fork meta.

## Impact on Mantle
Mantle's fair sequencing addresses ordering fairness and part of the MEV/censorship problem, but it is not an encrypted mempool; the existing public material reads more like a 2024-02 research proposal and cannot be written up as a deployed privacy capability. If the L1 advances LUCID, Mantle needs to decide whether to offer L2 encrypted-orderflow parity, or clearly tell users where Mantle's privacy boundary lies. Fair sequencing, MEV revenue capture, and privacy guarantees must be stated separately.

## Recommended Mantle Watchpoints
- In external messaging, separate fairness, MEV resistance, censorship resistance, and confidentiality.
- Set up sandwich/front-run/private-orderflow monitoring.
- Study whether an L2 encrypted mempool is compatible with Mantle's fair sequencing/MEV capture.
- Track the combined EIP-8184, GhostPool, and FOCIL/frame tx track.

## Sources
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717
- https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327
- https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424
- https://eips.ethereum.org/EIPS/eip-7503
- https://www.mantle.xyz/blog/research/fair-sequencing
- https://ethresear.ch/t/fairflow-building-a-transparent-l2-mev-economy/22146
