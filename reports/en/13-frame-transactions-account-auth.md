# 13 Frame Transactions and Account/Auth Modernization

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
frame transactions / EIP-8141, keyed nonces / EIP-8250, recent roots / EIP-8272, EIP-8202 scheme-agile tx, EIP-8209 commit/reveal frames, ephemeral keys, PQ leanSPHINCS transactions, AA / sponsorship / key rotation.

## One-Page Conclusion
This track changes the transaction envelope and account validation, not just wallet UX. EIP-8141 turns validation/payment/execution into frames; EIP-8250 removes single-sender nonce serialization; EIP-8272 lets validation reference bounded recent roots; EIP-8202 offers a flat, scheme-agile alternative. For Mantle, it will affect smart wallets, gas sponsorship, relayer/sequencer mempool policy, and PQ auth migration.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| EIP-8141 Frame Tx | Current tx format constrains AA/PQ/key rotation/sponsorship | validation/payment/user-op frames + APPROVE step. [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | Native batching, sponsorship, key rotation, and PQ auth become easier |
| Public mempool validation | Arbitrary validation code is prone to DoS and shared-state invalidation | Restrict public propagation to a validation prefix. [EIP-8141](https://eips.ethereum.org/EIPS/eip-8141) | Keeps a permissionless mempool while reducing DoS |
| Keyed nonces / EIP-8250 | Single-sender nonce serializes shared-sender/privacy/relayer flows | `(nonce_keys, nonce_seq)`: up to 16 strictly increasing keys share one uint64 sequence, stored in `NONCE_MANAGER`; not a per-key `(key, seq)` pair. [EIP-8250](https://eips.ethereum.org/EIPS/eip-8250) | The same sender can run multiple flows concurrently, but the replay-ordering dependency is lifted only across disjoint key sets |
| Recent roots / EIP-8272 | Validation wants to read recent state, but mutable storage affects mempool validity | Pre-declare `(source_id, slot, root)` and verify before execution. [EIP-8272](https://eips.ethereum.org/EIPS/eip-8272) | Bounded state dependency, supporting privacy/wallet roots |
| EIP-8202 | Frame recursion is complex; scheme agility is insufficient | Flat envelope + authorization capabilities + scheme IDs. [EIP-8202](https://eips.ethereum.org/EIPS/eip-8202) | An alternative PQ/AA envelope track |
| PQ leanSPHINCS | Exact label is non-standard; PQ auth has signature-size/verification-cost issues | SPHINCS+/SLH-DSA research, AA/frame/scheme agility. [SPHINCS research](https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165) | Leaves a path for user-auth PQ migration, but not a settled design |

## Current Bottleneck
The current EOA/global nonce/tx envelope is hostile to account abstraction, sponsorship, session keys, privacy relayers, and PQ keys. Meanwhile the public mempool must prevent DoS from arbitrary validation code.

## Optimization Mechanism
Frame tx splits validation, payment, and execution into frames; keyed nonces split the replay domain using a shared `nonce_seq` plus multiple key sets; recent roots front-declare state dependencies; scheme-agile tx leaves an interface for signature-scheme migration; PQ auth is introduced gradually via AA/frames or a new envelope. The Strawmap's `ephemeral keys` box has a canonical ethresear.ch source and should be treated as a supplementary PQ/account-abstraction migration path, not inferred solely from SPHINCS/AA.

## Future Effect
Wallet experience will come closer to native AA: batching, gas sponsorship, key rotation, passkey/PQ auth, and shared-sender concurrency become more natural. But mempool policy grows more complex, and relayers/sequencers need to simulate and constrain validation.

## Dependencies & Sequencing
EIP-8141 is the centerpiece; EIP-8250/8272/8209 are deltas; EIP-8202 is an alternative architecture. Status verification shows EIP-8141 is Draft and considered for Hegotá, not scheduled. [EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## Risks & Open Questions
Risks include public mempool DoS, deploy frame front-running, ORIGIN semantic drift, paymaster throttling, recent-root storage growth, ephemeral-key mempool exposure, and the PQ standardization gap. `PQ leanSPHINCS transactions` should be treated as an inferred label.

## Impact on Mantle
Mantle already has AA tutorials and an OP Stack AA/P256 ecosystem; frame tx will affect wallets, relayers, sponsorship, and sequencer mempools. If Mantle supports stronger AA/PQ auth, it should simultaneously define a public vs private mempool validation policy to avoid importing L1's DoS problems onto the L2.

## Recommended Mantle Watchpoints
- Assess which wallet flows need keyed nonces: session keys, privacy pools, shared senders, relayers.
- Design bounded validation / paymaster throttling / stale-state recheck policies.
- Compare the compatibility of the EIP-8141 frame model versus the EIP-8202 flat envelope for Mantle.
- Split PQ auth into a now path (AA/scheme agility) and a later path (standardized PQ signatures).

## Sources
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8081
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://eips.ethereum.org/EIPS/eip-8202
- https://eips.ethereum.org/EIPS/eip-8209
- https://ethresear.ch/t/achieving-quantum-safety-through-ephemeral-key-pairs-and-account-abstraction/24273
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://www.mantle.xyz/blog/developers/account-abstraction-mantle-etherspot-prime-sdk
