# Wave 0 Planning Digest

## Planner Result

The planning agent recommended **14 standalone reports + 2 appendices**:

1. Fast L1: confirmation, slots, and finality
2. Block production and censorship resistance: ePBS, FOCIL, role separation
3. Validator-scale consensus: 1M attestations, issuance, lean specs
4. Consensus resilience and post-quantum CL
5. Teragas L2: PeerDAS and DA capacity growth
6. Blob propagation, custody, and streaming
7. Resource pricing: blobs, data repricing, multidimensional fees, futures
8. Gigagas L1: gas-limit increases and p2p throughput
9. BALs and explicit state access
10. Proof-heavy execution and native rollups
11. EVM hardening and proving substrates
12. State growth, statelessness, and purges
13. Frame transactions and account/auth modernization
14. Private L1: encrypted mempool and shielded transfers

Appendices:

- A. Fork/status/north-star caveats
- B. Ambiguous-label crosswalk

## Key Planner Leads

- Refresh all EIP status/fork buckets before drafting.
- Resolve or caveat exact `snail issuance` mapping.
- Check PeerDAS implementation/client readiness.
- Clarify whether EIP-8256 / blob streaming means short-dated blob capacity reservation.
- Inspect EIP-8070/EIP-8136 wire-format details.
- Check objections to EIP-7918/EIP-7999/repricing proposals.
- Clarify Verkle vs binary trie / partial binary tree.
- Clarify Pureth mapping.
- Inspect EIP-8141 public-key alias layout and mempool objections.
- Compare LUCID/GhostPool/ERC-4337 alt mempool leakage.
- Produce Mantle DA cost-sensitivity framing.
- Optional competitive-parity comparison against major L2s.

## Coverage Contract

Each standalone report must include:

- Current bottleneck.
- Optimization mechanism.
- Expected post-upgrade effect.
- Dependencies/order.
- Risks/open questions.
- Mantle impact and suggested monitoring/action items.
- Citations to source URLs or source IDs from the previous source ledger.

## EXPAND

The planner returned actionable leads listed above; each is assigned to wave-1 research workers by report group.
