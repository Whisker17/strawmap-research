# Wave 1 — Skeptic Evidence Audit

Worker: `019f332d-0777-73c3-84be-21ebd50afaa1`

## Key Findings

- Strawmap explicitly disclaims prediction/stability; it is work-in-progress, not authoritative or representative of all EF/stakeholder views.
- North-star numeric claims (`1 Ggas/sec`, `1 GB/sec`, `10K TPS`, `10M TPS`) are aspirational, not measured/scheduled delivery targets.
- EIP status risk: EIP-7732, EIP-7928, EIP-7805 remain Draft despite being discussed as headliners/inclusion candidates.
- Concrete drift/contradiction: EIP-7778 six-second slots appears removed in ACDE #218 due to BAL conflict, while ethereum.org Glamsterdam still lists it as actively tested. Must not assert current inclusion without qualification.
- ePBS has stakeholder objections: free-option problem, complexity, late-stage operational risk.
- BAL implementation details remain contingent; ACDE #218 selected RLP over SSZ for now.
- The seven-forks-by-2029 / six-month-cadence schedule is fragile and should be framed as coordination heuristic.
- Hegotá is under-specified: ethereum.org says proposals under discussion while Forkcast tracks FOCIL as selected headliner.

## Sources

- https://strawmap.org/
- https://ethereum.org/roadmap/
- https://ethereum.org/roadmap/glamsterdam/
- https://eips.ethereum.org/EIPS/eip-7732
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethereum-magicians.org/t/all-core-devs-execution-acde-218-august-14-2025/24979
- https://ethereum-magicians.org/t/soliciting-stakeholder-feedback-on-glamsterdam-headliners/24885
- https://forkcast.org/eips/
- https://forkcast.org/upgrade/glamsterdam/
- https://forkcast.org/upgrade/hegota/

## EXPAND

- LEAD: Reconcile Forkcast decision pages for Glamsterdam/Hegotá against ethereum.org and EIP meta pages — WHY: avoid stale/inconsistent schedule claims — ANGLE: Forkcast, EIPs, ACD notes.
- LEAD: Exact label-to-link mapping from Google Drawing — WHY: underlines/links may be ambiguous — ANGLE: SVG coordinate extraction and visual inspection.
- LEAD: Recheck status of EIP-7732, EIP-7928, EIP-7805 — WHY: final report should not use stale status — ANGLE: official EIP pages.

## CLAIMS

- CLAIM: Seven forks by 2029 and one fork every six months are speculative planning assumptions — RISK: high — SOURCES: Strawmap FAQ — COUNTER: none, Strawmap itself qualifies — PRIMARY: Strawmap.
- CLAIM: EIP-7778 current Glamsterdam inclusion is conflicted across ACDE and ethereum.org — RISK: high — SOURCES: ethereum.org Glamsterdam and ACDE #218 — COUNTER: current Forkcast/meta page needed — PRIMARY: mixed.
