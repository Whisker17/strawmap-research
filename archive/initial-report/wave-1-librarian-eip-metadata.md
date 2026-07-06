# Wave 1 — EIP Metadata Sweep

Worker: `019f332c-c690-7091-ad3e-e323472f9c03`

## Key Findings

- Linked EIPs are mostly Draft; two returned as Stagnant in the worker's official-page sweep: EIP-8025 Optional Execution Proofs and EIP-7919 Pureth Meta.
- Meta/bundling pages: EIP-7773 Glamsterdam, EIP-8081 Hegotá, EIP-8007 Glamsterdam Gas Repricings.
- Likely item mapping:
  - EIP-8070: sparse blobpool
  - EIP-8136: cell-level deltas
  - EIP-8198: quick slots
  - EIP-7732: ePBS
  - EIP-7805: FOCIL
  - EIP-8079: native rollups
  - EIP-8025: optional execution proofs
  - EIP-7928: BALs / block-level access lists
  - EIP-7938: gas limit increases
  - EIP-8142: block-in-blobs / zkEVM + DA
  - EIP-7999: unified multidimensional fee market
  - EIP-8200: EVMify long-tail precompiles
  - EIP-8141: frame transactions
  - EIP-8077: announce transactions with nonce
  - EIP-8184: LUCID encrypted mempool
  - EIP-8250/EIP-8272: keyed nonces and recent roots for frame transactions

## Sources

- Official EIP pages: `https://eips.ethereum.org/EIPS/eip-<id>` and `https://eip.tools/eip/8136`.

## EXPAND

- LEAD: Full fork inclusion mapping for EIP-7773 and EIP-8081 — WHY: distinguishes scheduled/proposed/declined items from strawmap positioning — ANGLE: fetch meta EIP sections and extract scheduled/proposed lists.
- LEAD: Exact interface details for EIP-8142, EIP-8272, EIP-8141, EIP-8184 — WHY: these drive execution/privacy dependencies — ANGLE: read specs and rationale sections.
- LEAD: Dependency and parameter crosswalks for EIP-7938, EIP-7999, EIP-8200 — WHY: gas/pricing/EVM hardening impacts Mantle assumptions — ANGLE: read rationale and backwards-compatibility sections.

## CLAIMS

- CLAIM: Most linked EIPs are Draft, while EIP-8025 and EIP-7919 are Stagnant — RISK: high — SOURCES: eips.ethereum.org/eip pages — COUNTER: re-fetch official EIP pages in source ledger — PRIMARY: official EIP pages.
- CLAIM: Created/status metadata is time-sensitive as of 2026-07-06 — RISK: high — SOURCES: official EIP pages — COUNTER: status re-check before final — PRIMARY: official EIP pages.
