# Wave 1 Digest: R14 Private L1, Encrypted Mempool, and Shielded Transfers

Agent: `019f3539-2479-7763-8844-36fe009cf43e`

## Key Findings

- Public mempool leakage enables front-running, sandwiching, copy trading, censorship, builder concentration, and account linkability.
- LUCID/EIP-8184 is the most protocol-shaped encrypted mempool proposal: sealed txs, inclusion-list commitments, commit-before-reveal, and optional self-decryption/key publishers.
- Distributed encrypted mempool is earlier architectural research around threshold encryption, proposer commitments, PBS integration, and encryption-agnostic interfaces.
- GhostPool targets admission metadata leakage, replacing sender/nonce checks with root-bound ZK proofs and shared nullifiers.
- Shielded transfers hide amounts/counterparties inside a contract, not at the mempool layer.
- FOCIL, frame tx, and LUCID are complementary: FOCIL enforces inclusion, frame tx handles arbitrary validation/payment, and LUCID protects contents/order-flow.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7805
- https://eips.ethereum.org/EIPS/eip-4337
- https://eips.ethereum.org/EIPS/eip-8141
- https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717
- https://ethresear.ch/t/smart-account-encrypted-mempools/21834
- https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327
- https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424
- https://ethresear.ch/t/frame-transactions-through-a-statelessness-lens/24538
- https://www.mantle.xyz/blog/research/fair-sequencing
- https://ethresear.ch/t/fairflow-building-a-transparent-l2-mev-economy/22146

## Mantle Implications

- If L1 gets a public encrypted mempool, Mantle users may expect L2 privacy/order-flow parity.
- Mantle's fair-sequencing and transparent-MEV framing is stronger on ordering and revenue capture than on transaction-content confidentiality.
- Mantle should separate revenue capture, fair sequencing, and privacy guarantees in internal/product language.

## EXPAND Markers

- LEAD: Dedicated Mantle vs L1 encrypted mempool memo — WHY: separates revenue capture, fair sequencing, and privacy guarantees — ANGLE: Mantle fair sequencing/FairFlow vs LUCID/GhostPool.
- LEAD: EIP-8184 security/censorship tradeoffs with exact line references — WHY: useful for slides/memo — ANGLE: sealed tx metadata, key publisher, PTC, ToB, FOCIL dependency.
