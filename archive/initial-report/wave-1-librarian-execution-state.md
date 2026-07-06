# Wave 1 — Execution State, Statelessness, and State Models

Worker: `019f332c-bc4b-7831-881d-68f5c0417c18`

## Key Findings

- Ethereum's state-growth problem is being attacked through a stack of partial mitigations:
  - smaller witnesses and cheaper validation,
  - new/tiered forms of state,
  - transaction/state primitives that reduce validation dependence on large mutable state.
- VOPS argues weak statelessness alone can harm censorship resistance because public mempool validation still needs enough state for pending transactions. It proposes retaining only enough account data to validate pending transactions.
- The hyper-scaling state post frames state as harder than execution and data: block builders need state to build blocks, and state growth does not disappear by changing the gas limit.
- Verkle remains a classic roadmap path for smaller witnesses, but binary trie / EIP-7864 is an unresolved long-term alternative because it is hash-based and post-quantum friendlier.
- BALs / EIP-7928 are an execution-state enabler: access lists can enable parallel disk reads, validation, state-root computation, and executionless state updates. They do not eliminate state-root work.
- Frame transactions, keyed nonces, and recent roots make validation dependencies more explicit and bounded.
- `pureth purges` is ambiguous; worker did not find a canonical protocol proposal formally named that. Treat as unresolved/adjacent unless mapped through EIP-7919 Pureth Meta and linked docs.

## Sources

- https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236
- https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052
- https://ethereum.org/roadmap/statelessness/
- https://ethereum.org/roadmap/verkle-trees/
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7736
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://eips.ethereum.org/EIPS/eip-8200
- https://ethresear.ch/t/ethereum-needs-standards-punk/23151

## EXPAND

- LEAD: Verkle vs binary trie current roadmap status — WHY: report must not present Verkle/binary state as settled — ANGLE: compare ethereum.org roadmap, EIP-6800, EIP-7864, recent EF protocol updates.
- LEAD: Pureth mapping — WHY: strawmap box `pureth purges` is ambiguous — ANGLE: read EIP-7919 and linked Pureth docs, search exact phrase.
- LEAD: State expiry role split — WHY: affects node/RPC/L2 operator implications — ANGLE: compare EIP-7736 and in-protocol vs out-of-protocol state expiry research.

## CLAIMS

- CLAIM: Hyper-scaling state says Ethereum state grows at about 100 GB/year and 20x scaling would imply about 2 TB/year — RISK: high — SOURCES: ethresear.ch state post — COUNTER: verify against current state-size sources before using as numeric claim — PRIMARY: research post, not protocol spec.
- CLAIM: EIP-6800 states current witnesses are about 3 kB/account and Verkle about 200 bytes/account — RISK: high — SOURCES: EIP-6800 — COUNTER: check latest EIP status/current benchmark — PRIMARY: EIP-6800.
- CLAIM: EIP-7928 enables parallel reads/validation/state-root computation/executionless updates — RISK: normal — SOURCES: EIP-7928 — COUNTER: none surfaced — PRIMARY: EIP-7928.
