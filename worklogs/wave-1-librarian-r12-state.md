# Wave 1 Digest: R12 State Growth, Statelessness, and Purges

Agent: `019f3539-0ced-7a13-95b7-9d4d79c80b27`

## Key Findings

- State remains the long-horizon bottleneck after data and execution improvements: there is no direct analogue to blobs/PeerDAS or proof-heavy execution.
- VOPS is a practical partial-statelessness bridge, not full statelessness. It keeps enough local state to validate pending transactions and preserve public-mempool/censorship-resistance properties.
- Hyper-scaling state points toward tiered/restricted state forms: permanent state, temporary state, UTXO-like state, recency tiers, and economic tiers.
- State expiry remains hard because absent-state proofs / proof of inexistence are difficult.
- ethereum.org treats weak statelessness, history expiry, and state expiry as research-phase items, with Verkle/PBS prerequisites; strong statelessness is not currently expected.
- Verkle vs binary trie is unsettled: Verkle has smaller witnesses, while binary-tree proposals are more PQ/proof friendly.
- `partial binary tree` and `Pureth purges` are not canonical exact labels. The closest mappings are binary-trie/PQ-friendly commitments and Pureth as verifiable RPC/data-access hardening.
- BAL availability becomes critical if validators stop re-executing payloads; Block-in-Blobs explicitly ties payload/BAL availability to proof-heavy validation.

## Sources Surfaced

- https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236
- https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052
- https://ethereum.org/roadmap/statelessness/
- https://ethereum.org/roadmap/verkle-trees/
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7736
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-8142
- https://vitalik.eth.limo/general/2024/10/26/futures5.html

## Mantle Implications

- Mantle should plan for RPC, archive, witness, and prover-input availability even if Ethereum moves toward proof-heavy validation.
- State proof and witness tooling should become core infra, not an edge-case dependency.
- Archive/full-state obligations do not disappear when validators verify proofs instead of re-executing; RPC/indexer responsibilities become more important.

## EXPAND Markers

- LEAD: Produce strict source matrix for confirmed/inferred/uncertain labels — WHY: `partial binary tree`, `Pureth purges`, and state expiry labels are easy to overstate — ANGLE: separate canonical EIPs from inferred Strawmap labels.
- LEAD: Standalone report outline for state axis — WHY: this direction has many dependencies with BALs and proof-heavy execution — ANGLE: turn research into report-ready sections.
