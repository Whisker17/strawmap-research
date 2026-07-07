# 09 BALs: Explicit State Access and Block-Level Access Lists

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
BALs / EIP-7928, block-level access lists, Glamsterdam execution headliner, EIP-8159 BAL transport, EIP-8189 snap/2 healing, EIP-7862 state root, EIP-8279 BAL-byte repricing, EIP-8268 storage roots.

## One-Page Conclusion
BALs address the hidden bottleneck of "not knowing which state will be read or written before execution." EIP-7928 turns the accounts and storage slots touched within a block into a header-committed data structure, letting clients read from disk ahead of time, validate in parallel, reconstruct state diffs, and improve healing. It is not magic that directly raises gas, but it is the foundational plumbing for high gas, proof-heavy execution, and state sync. For Mantle, the most important value of BALs lies in prover witness planning and state access profiling.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| EIP-7928 BALs | State access is hidden inside execution; clients cannot parallelize I/O ahead of time | The block header commits to `block_access_list_hash`, and the EL verifies that the generated BAL exactly matches the provided BAL. [EIP-7928](https://eips.ethereum.org/EIPS/eip-7928) | State prefetching, parallel validation, state-root computation, and sync/healing become easier |
| EIP-8159 | When the BAL is not in the block body, it needs to be exchanged over p2p | eth/71 adds BAL exchange. [EIP-8159](https://eips.ethereum.org/EIPS/eip-8159) | Syncing nodes can obtain BALs independently |
| EIP-8189 | snap healing's per-trie-node requests are inefficient | Improve healing with BAL-driven state diffs. [EIP-8189](https://eips.ethereum.org/EIPS/eip-8189) | State recovery becomes more direct |
| EIP-7862 | BALs only expose accesses; they do not automatically solve the same-slot state-root critical path | Use BAL data to move/accelerate state-root computation. [EIP-7862](https://eips.ethereum.org/EIPS/eip-7862) | Shorter execution/validation critical path |
| EIP-8279 | BAL bytes could bypass tx-content byte floors | Meter BAL bytes at runtime and include them in the floor accumulator. [EIP-8279](https://eips.ethereum.org/EIPS/eip-8279) | Prevents BALs from becoming a new cheap-byte channel |
| EIP-8268 | Some state nodes need post-block storage roots | Add per-account storage root information to the BAL. [EIP-8268](https://eips.ethereum.org/EIPS/eip-8268) | More complete state reconstruction / verification |

## Current Bottleneck
Today, execution clients often only discover which state they need in the middle of execution, making disk reads, prefetching, parallel execution, and root computation hard to schedule ahead of time. For high-gas blocks, proof-heavy execution, and statelessness, this hidden access surface becomes a bottleneck.

## Optimization Mechanism
BALs lift access lists to the block level and bind them via a header commitment. Nodes can obtain the access surface before execution and check its accuracy after execution. The BAL transport/healing/repricing/storage-root extensions form a small ecosystem rather than a single EIP operating in isolation.

## Future Effect
Clients can better parallelize disk reads, validation, and state reconstruction; proof systems can use BALs to plan witnesses in advance; sync/healing can move from trie-node hunting to block diffs. BALs are also one of the prerequisites for mandatory proofs/BiB, because under proof-heavy validation every validator no longer obtains this data by re-executing by default.

## Dependencies & Sequencing
EIP-7928, as a Glamsterdam scheduled item, is the foundation; EIP-8159 and EIP-8189 have entered Glamsterdam CFI networking; EIP-7862/8279/8268 are follow-on companions. EIP-8279 depends on EIP-7928, and proof-heavy execution / EIP-8142 also depends on BAL availability. [EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8142](https://eips.ethereum.org/EIPS/eip-8142)

## Risks & Open Questions
Risks include phantom storage reads griefing, BAL size propagation, validation overhead, cheap-byte bypass, and application sensitivity to gas repricing. BALs are not cost-free metadata; they become a new object of networking and pricing.

## Impact on Mantle
Mantle's prover can use a BAL-like state access profile to construct witnesses ahead of time; L2 workload profiling can use it to understand high-storage workloads; and if the L1/rollup proof interface is standardized in the future, BAL/payload-separated transport could become a compatibility point in Mantle's prover/derivation pipeline.

## Recommended Mantle Watchpoints
- Reserve an explicit state access list / witness manifest abstraction in the prover pipeline.
- Do state access profiling on Mantle workloads to assess the future cost impact of EIP-8038/8279.
- Watch interface changes between BAL transport and Block-in-Blobs.
- Avoid misreading BALs as direct scaling; position them as scaling plumbing.

## Sources
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8159
- https://eips.ethereum.org/EIPS/eip-8189
- https://eips.ethereum.org/EIPS/eip-7862
- https://eips.ethereum.org/EIPS/eip-8279
- https://eips.ethereum.org/EIPS/eip-8268
- https://eips.ethereum.org/EIPS/eip-8142
