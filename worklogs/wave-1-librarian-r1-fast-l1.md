# Wave 1 Digest: R1 Fast L1 Confirmation, Slots, and Finality

Agent: `019f3538-84cd-7a62-8264-f5decfb8b6e5`

## Key Findings

- Fast L1 decomposes into three distinct mechanisms: client-side fast confirmation (FCR), infrastructure for shorter slots (EIP-8198), and protocol-level finality research (SSF / one-round / decoupled consensus).
- FCR is best framed as an operational head-confidence signal, not finality. It can improve deposit/bridge UX but should remain separate from irreversible settlement semantics.
- EIP-8198 is an enabler for slot-duration reduction by making slot timing runtime-configurable; shorter slots increase propagation, hardware, and adverse-network pressure.
- SSF and one-round finality target the deeper finality bottleneck: current Ethereum finality trades validator-scale load against finality latency.
- Decoupled consensus separates block production and finality so shorter slots do not automatically imply slower finality, but it remains research and depends on robust committee/finality-gadget design.

## Sources Surfaced

- https://fastconfirm.it/
- https://eips.ethereum.org/EIPS/eip-8198
- https://ethereum.org/roadmap/single-slot-finality/
- https://notes.ethereum.org/%40vbuterin/single_slot_finality
- https://ethresear.ch/t/unblocking-faster-finality-with-decoupled-consensus/24527
- https://github.com/ethereum/pm/issues/1939

## Mantle Implications

- Mantle should distinguish `fast confirmed`, `L1 finalized`, and `L2 proof/withdrawal finalized` in product language and risk logic.
- FCR-style confirmation can improve bridge/deposit perceived latency, but should not shorten safety-critical finality assumptions without separate policy.
- Shorter slots and SSF tighten deadlines for L1 fallback, proof posting, and bridge watchdog logic.

## EXPAND Markers

- LEAD: Compare `EIP-8198` against latest consensus-call notes — WHY: check whether 8-second slots remain the preferred target — ANGLE: EIP-8198 plus Ethereum PM call notes.
- LEAD: Check whether FCR implementation has moved into client-side deployment assumptions — WHY: FCR value to Mantle depends on adoption, not just concept — ANGLE: ethereum/pm issue 1939 and client discussions.
- DEAD END: Treating Strawmap fast-L1 labels as commitments — WHY: sources support north-star framing only.
