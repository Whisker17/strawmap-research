# 12 State Growth, Statelessness and Purges

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
validity-only partial statelessness / VOPS, decentralized state, endgame state, hyper-scaling state, new state forms, Pureth purges, partial binary tree, Verkle vs binary tree, state expiry, history/state purges.

## One-Page Conclusion
State is the hardest layer of the scaling roadmap: DA has blobs/PeerDAS and execution has proofs/BALs, but state has no single magic bullet. The path is more likely a combination of partial statelessness, tiered state, new state forms, expiry/purge, binary-tree/PQ-friendly commitments, and verifiable RPC. Fable's correction on Verkle/binary holds: EIP-6800 Verkle is now Stagnant, and EIP-7864 unified binary tree is the more active Draft direction; if the ethereum.org Verkle page continues to be cited, it should be flagged as lagging behind current research/fork meta. For Mantle, the focus is RPC/archive/witness/prover input availability, not "once L1 is stateless, L2 has it easy."

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| VOPS | Weak statelessness would break public mempool validity | Retain enough account state to validate pending txs. [VOPS](https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236) | Reduces local state while preserving censorship-resistance/mempool health |
| Hyper-scaling state | State growth has no single DAS/ZK-style solution | Permanent/temporary/UTXO-like/tiered state. [hyper-scaling state](https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052) | Different state resources get different prices and availability |
| State expiry | Absent-state proofs / resurrection are hard | Leaf expiry is still a research direction; EIP-7736 depends on Verkle and is currently Stagnant. [EIP-7736](https://eips.ethereum.org/EIPS/eip-7736) | Old state can be deleted, but proof/recovery mechanisms are needed |
| Binary tree direction | Verkle witnesses are small but curve-based; binary is more PQ-friendly | EIP-6800 Verkle is Stagnant; EIP-7864 unified binary tree is an active Draft with stronger directionality. [EIP-6800](https://eips.ethereum.org/EIPS/eip-6800), [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) | Certainty about a PQ-friendly state commitment rises, but the migration path is still undecided |
| Pureth / purges | RPC/data correctness and historical bloat are different problems | EIP-7919 is the Pureth Meta and currently Stagnant; purges address history/state/feature bloat. [EIP-7919](https://eips.ethereum.org/EIPS/eip-7919), [The Purge](https://vitalik.eth.limo/general/2024/10/26/futures5.html) | Reduces RPC trust and client burden, but is not a single state-expiry feature |
| Partial binary tree | The exact label is not canonical | Maps to unified binary tree / binary Merkle tree. [EIP-7864](https://eips.ethereum.org/EIPS/eip-7864) | Serves as a caveat on the PQ-friendly state commitment direction |

## Current Bottleneck
Full state storage, historical data, RPC correctness, witness generation, proof of inexistence, and mempool validation are all coupled to each other. Deleting state is easy; safely resurrecting it and proving "non-existence" is hard.

## Optimization Mechanism
VOPS takes the partial state retention route; hyper-scaling state takes the resource-tiering route; the state commitment direction has clearly shifted from Verkle to binary/hash-based; Pureth changes verifiable data access; and the Purge cleans up history/state/feature complexity.

## Future Effect
Node burden drops, light-client/RPC trust decreases, and state access becomes more provable. But RPCs, archives, state providers, and Portal/witness services become more critical, and L2s/provers become more dependent on replayable inputs.

## Dependencies & Sequencing
BALs and Block-in-Blobs lay the groundwork for state/payload availability under proof-heavy execution; state expiry depends on the commitment structure; Pureth is distinct from state expiry and should be placed on the verifiable data/RPC track.

## Risks & Open Questions
Strong statelessness is not the current official expectation; EIP-6800/7736/7919/7503 are all Stagnant and should not be written up as active workstreams; `Pureth purges` links to EIP-7919 on the Strawmap, so a confirmed label can be written, but the body text must still separate Pureth data/RPC verification from purge/state expiry; partial binary tree is not an EIP title; and the UX and recovery costs of state expiry remain high.

## Impact on Mantle
Mantle's proving, bridge, indexing, explorer, and RPC all depend on replayable state/inputs. Even if Ethereum validators do not re-execute, Mantle still needs SLOs for archive access, witness construction, the DA bridge, and prover input derivation. An RPC outage may be a proof-availability incident, not merely a frontend problem.

## Recommended Mantle Watchpoints
- Include archive/replay/prover-input derivation in core SLOs.
- Design an internal abstraction for witness/state proof APIs.
- Prioritize tracking binary/hash-based state commitments, because PQ and proof compatibility will affect the long-term roadmap; citations of the Verkle page need a lag caveat.
- Separate Pureth, purges, and state expiry from one another in reports.

## Sources
- https://ethresear.ch/t/a-pragmatic-path-towards-validity-only-partial-statelessness-vops/22236
- https://ethresear.ch/t/hyper-scaling-state-by-creating-new-forms-of-state/24052
- https://ethereum.org/roadmap/statelessness/
- https://ethereum.org/roadmap/verkle-trees/
- https://eips.ethereum.org/EIPS/eip-6800
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-7736
- https://eips.ethereum.org/EIPS/eip-7919
- https://vitalik.eth.limo/general/2024/10/26/futures5.html
