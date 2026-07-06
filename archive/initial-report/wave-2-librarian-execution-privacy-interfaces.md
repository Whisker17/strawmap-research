# Wave 2 — Execution/Privacy Interfaces

Worker: `019f332f-5f0a-7fa3-b489-b016e8ac34c0`

The worker also wrote `research/eip-wave2.md`; journal copy below preserves the return.

## Key Findings

- EIP-8142 is the DA bridge for a proof-heavy execution model: execution payload data moves into blobs, `payload_blob_count` is added, and consensus/execution align around blob commitments and payload verification.
- EIP-8272 is the exact `recent roots` hook for frame transactions: it adds `recent_root_references` and exposes validated roots to frame-validation code after pre-checking against the current head.
- EIP-8141 is the programmable transaction envelope: type `0x06`, explicit frames, validation-prefix propagation rules, and new opcodes for introspection and approval.
- EIP-8184 is the encrypted/privacy mempool path: sealed transactions/bundles, delayed key release, and inclusion-list/Engine API/beacon RPC changes.

## Sources

- https://eips.ethereum.org/EIPS/eip-8142
- https://ethereum-magicians.org/t/eip-8142-block-in-blobs-bib/27621
- https://eips.ethereum.org/EIPS/eip-8272
- https://ethereum-magicians.org/t/eip-8272-recent-roots-for-frame-transactions/28621
- https://eips.ethereum.org/EIPS/eip-8141
- https://ethereum-magicians.org/t/eip-8141-frame-transaction/27617
- https://eips.ethereum.org/EIPS/eip-8184
- https://ethereum-magicians.org/t/eip-8184-lucid-encrypted-mempool/28017

## EXPAND

- LEAD: EIP-8142 as DA bridge for proof-heavy execution — WHY: key cross-layer dependency — ANGLE: synthesize with zkEVM/native rollups.
- LEAD: EIP-8141 mempool objections — WHY: affects protocol-hardfork AA/PQ path — ANGLE: include DoS/state-churn/origin caveats.

## CLAIMS

- CLAIM: EIP-8142 depends on EIP-4844, EIP-7594, EIP-7732, EIP-7892, and EIP-7928 — RISK: high — SOURCES: EIP-8142 and Magicians thread — COUNTER: recheck EIP dependency list before final — PRIMARY: EIP.
- CLAIM: EIP-8141 depends on several prior EIPs and has objections around mempool DoS, state-churn invalidation, deploy-frame frontrunning, and `ORIGIN` compatibility — RISK: normal — SOURCES: EIP-8141/Magicians — PRIMARY: EIP/discussion.
