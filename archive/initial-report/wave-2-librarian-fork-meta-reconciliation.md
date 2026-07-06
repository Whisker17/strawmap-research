# Wave 2 — Fork Meta Reconciliation

Worker: `019f332f-559e-76f3-a4e6-2cb499712cba`

## Key Findings

- EIP-7773 Glamsterdam inclusion buckets:
  - Scheduled: EIPs 7708, 7732, 7778, 7843, 7928, 7954, 7976, 7981, 8024, 8037.
  - Considered: EIPs 2780, 7688, 7904, 7997, 8038, 8045, 8061, 8080, 8246.
  - Proposed: EIPs 7610, 7979, 8163.
  - Declined: includes EIP-7805 FOCIL, EIP-7782, EIP-7919, and others.
- EIP-8081 Hegotá inclusion buckets:
  - Scheduled: EIP-7805 only.
  - Considered: EIP-8141.
  - Proposed: EIPs 4758, 7709, 7716, 7851, 7979, 8025, 8131, 8146, 8148, 8151, 8163, 8173, 8182, 8188, 8205, 8237, 8250, 8253, 8279.
  - Declined: empty.
- EIP-7723 status language is upgrade-scoped: proposals do not carry over automatically. Use "scheduled for Glamsterdam" or "proposed for Hegotá"; avoid "will be included" unless scheduled.
- Forkcast is useful planning context but less committal than official meta EIPs.
- Current safe fork-state mapping:
  - ePBS / EIP-7732: scheduled for Glamsterdam.
  - BALs / EIP-7928: scheduled for Glamsterdam.
  - FOCIL / EIP-7805: declined for Glamsterdam, scheduled for Hegotá.
  - Frame tx / EIP-8141: considered for Hegotá.
  - Hegotá data/pricing/access-list follow-ons: proposed bucket, not scheduled.

## Sources

- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-7723
- https://raw.githubusercontent.com/ethereum/forkcast/main/src/data/upgrades.ts
- https://raw.githubusercontent.com/ethereum/forkcast/main/src/data/pending-proposals.ts
- https://raw.githubusercontent.com/ethereum/forkcast/main/src/data/eips/7773.json
- https://raw.githubusercontent.com/ethereum/forkcast/main/src/data/eips/8081.json

## EXPAND

- none — fork-state reconciliation is sufficient for final synthesis.

## CLAIMS

- CLAIM: EIP-7805 FOCIL is declined for Glamsterdam but scheduled for Hegotá in official meta pages — RISK: high — SOURCES: EIP-7773/EIP-8081 — COUNTER: final re-fetch if time — PRIMARY: official EIP meta pages.
- CLAIM: EIP-7723 says statuses are upgrade-scoped and do not automatically carry over — RISK: normal — SOURCES: EIP-7723 — PRIMARY: EIP.
