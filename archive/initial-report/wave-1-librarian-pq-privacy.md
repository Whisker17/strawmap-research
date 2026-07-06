# Wave 1 — Post-Quantum and Privacy Roadmap

Worker: `019f332c-f663-7f61-ad06-7d8c3ae5a468`

## Key Findings

- Roadmap splits into:
  - wallet/account-abstraction track: ERC-4337, EIP-7702, and future EIP-8141-style frame transactions,
  - protocol-hardfork track: validator registry, PQ heartbeat/finality, encrypted/private mempools, shielded transfer primitives.
- PQ validator key registry is a warmup phase: validators can generate/commit PQ keys before activation; operational friction is a key motivator.
- leanMultisig/leanVM is the aggregation path for XMSS/PQ signatures using recursion/proofs, but current security/performance parameters remain open.
- Dynamic protocol / heartbeat path separates liveness heartbeat from trailing finality because one protocol cannot simultaneously guarantee dynamic availability and irreversible finality under partitions.
- Ephemeral-key AA is an immediate wallet defense, but pending mempool exposure remains a limitation; private/encrypted mempools mitigate.
- EIP-8141 frame transactions are the protocol bridge for arbitrary validation, native key rotation, PQ off-ramp, and alternative gas payment. They also introduce mempool DoS and state invalidation risks.
- EIP-8184/LUCID encrypted mempool is protocol-aware but not a full privacy solution because admission metadata can leak sender/nonce; GhostPool-style ZK admission is a counterpoint.
- Shielded transfers require note discovery, ciphertext handling, ZK-proven encryption, and access-pattern hiding; PQ-safe privacy makes ciphertext bloat and liveness harder.

## Sources

- https://ethresear.ch/t/exploring-the-design-space-for-a-post-quantum-public-key-registry-for-ethereum-validators/25040
- https://github.com/leanEthereum/leanMultisig
- https://ethresear.ch/t/why-ethereum-needs-a-dynamically-available-protocol/24418
- https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273
- https://eips.ethereum.org/EIPS/eip-4337
- https://eips.ethereum.org/EIPS/eip-7702
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8077
- https://eips.ethereum.org/EIPS/eip-8184
- https://ethresear.ch/t/the-road-towards-a-distributed-encrypted-mempool-on-ethereum/21717
- https://ethresear.ch/t/lucid-encrypted-mempool-with-distributed-payload-propagation/24042
- https://ethresear.ch/t/ghostpool-hiding-identity-critical-metadata-in-encrypted-mempool-admission/24327
- https://ethresear.ch/t/shielded-transfers-tokens-and-nfts/15424
- https://ethresear.ch/t/post-quantum-threats-to-ethereum-privacy/24450

## EXPAND

- LEAD: finality-layer PQ aggregation beyond heartbeat committee — WHY: heartbeat path only resolves the fast-liveness layer — ANGLE: vote accounting/proof transport.
- LEAD: EIP-8141 public key alias state layout — WHY: connects frame txs to PQ pubkey registry — ANGLE: EIP-8141 details and registry proposal.
- LEAD: LUCID vs GhostPool vs ERC-4337 alt mempool — WHY: encrypted mempool does not solve all privacy metadata leaks — ANGLE: compare admission semantics.

## CLAIMS

- CLAIM: leanMultisig reports XMSS aggregation/recursion benchmark numbers — RISK: high — SOURCES: repo README SHA-pinned by worker — COUNTER: treat as implementation benchmark, not protocol guarantee — PRIMARY: GitHub repo.
- CLAIM: EIP-8141 caps validation work and one pending frame transaction per sender — RISK: normal — SOURCES: EIP-8141 — PRIMARY: EIP.
- CLAIM: ML-KEM-768 ciphertext size creates PQ privacy bloat/liveness issue — RISK: high — SOURCES: PQ privacy post — COUNTER: use only as research-post claim — PRIMARY: research post.
