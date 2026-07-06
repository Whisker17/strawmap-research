# Wave 1 Digest: R13 Frame Transactions and Account/Auth Modernization

Agent: `019f3539-1710-7d43-a749-ef03868d458a`

## Key Findings

- EIP-8141 is the central frame-transaction proposal and is considered for Hegotá, but remains draft.
- The main bottleneck is safe public-mempool validation under arbitrary account logic, not transaction encoding alone.
- EIP-8141 splits transactions into validation, payment approval, and user-op frames, enabling native batching, sponsorship, key rotation, and PQ auth paths.
- EIP-8250 keyed nonces remove the single sender nonce bottleneck by introducing independent nonce domains.
- EIP-8272 recent roots binds validation to explicit recent state roots, avoiding arbitrary mutable storage reads during mempool validation.
- EIP-8202 is a flat-envelope alternative for scheme agility and ephemeral keys.
- SPHINCS-/leanSPHINCS is useful research, but not standardized Ethereum PQ transaction auth.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8081
- https://ethereum-magicians.org/t/hegota-headliner-proposal-frame-transaction/27618
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://eips.ethereum.org/EIPS/eip-8202
- https://eips.ethereum.org/EIPS/eip-8209
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165

## Mantle Implications

- Frame txs could give Mantle wallets a native route to batching, sponsorship, key rotation, and PQ migration without relying only on ERC-4337-style infra.
- Mantle sequencer/relayer policies should enforce bounded validation and shared-state limits or inherit the same DoS risks.
- PQ user-auth migration is layered: frame txs, scheme-agile alternatives, keyed nonces, and hash-based signature research all matter.

## EXPAND Markers

- LEAD: Compare EIP-8141 vs EIP-8202 as likely long-term Mantle transaction envelope — WHY: divergent architecture choices for account/auth modernization — ANGLE: frame recursion vs flat scheme agility.
- LEAD: Map Mantle wallet flows needing keyed nonces — WHY: keyed nonces may be essential only for specific shared-sender/privacy/session-key flows — ANGLE: Mantle relayer/sequencer/wallet scenarios.
- LEAD: Separate PQ migration-now options from PQ standardization-later options — WHY: leanSPHINCS is not enshrined standard — ANGLE: AA, frame tx, SPHINCS research.
