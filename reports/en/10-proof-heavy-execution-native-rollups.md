# 10 Proof-Heavy Execution and Native Rollups

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
optional execution proofs / EIP-8025, optional proofs, mandatory proofs, 2-of-3 / multi-prover framing, Block-in-Blobs / EIP-8142, native rollups / EIP-8079, native zkEVM, remove blob transaction type, proof market / prover input standardization.

## One-Page Conclusion
Proof-heavy execution is not as simple as "replace execution with a proof." EIP-8025 is the optional proving ground; EIP-8142 handles the transactions/BAL DA hole left after mandatory proofs; and EIP-8079 native rollups expose the Ethereum STF as an L1 primitive. The real path is a combined stack of proof correctness, payload availability, BAL/state access, a prover market, and multi-prover safety. Mantle is already running OP Succinct/SP1 validity proofs on mainnet, which upgrades this report's recommendations from "future preparation" to "production operations": prover key lifecycle, fallback mode, DA/payload availability, and STF equivalence are already part of the day-to-day risk surface. [Succinct Mantle case study](https://blog.succinct.xyz/case-studies/mantle/)

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| EIP-8025 optional proofs | Beacon nodes depend on EL re-execution; validation cost grows with gas | Proof-generating nodes gossip execution proofs; stateless validators verify the proofs. [EIP-8025](https://eips.ethereum.org/EIPS/eip-8025) | Test the proof plumbing first, without making consensus depend on it immediately |
| Mandatory proof regime | If validators do not download payload data, a producer can proof-withhold-data | EIP-8142 encodes the transactions and BAL from the execution-payload data into blobs, rather than putting the header/withdrawals/execution requests entirely into blobs. [EIP-8142](https://eips.ethereum.org/EIPS/eip-8142) | Correctness relies on proofs; availability relies on blobs/PeerDAS |
| Native rollups / EIP-8079 | Rollups maintain independent proof games/circuits/bridge trust | An L1 `EXECUTE` precompile exposes the Ethereum STF, and rollups reuse L1 execution semantics. [EIP-8079](https://eips.ethereum.org/EIPS/eip-8079) | Closer to inheriting L1 security and synchronous composability, but restricts custom STFs |
| Block-in-Blobs | Proof-only validation does not guarantee that RPC/indexers/builders have the data | Payload data is bound to blob commitments. [EIP-8142](https://eips.ethereum.org/EIPS/eip-8142) | Payload/BAL can be reconstructed, preventing proof-without-data |
| Multi-prover / 2-of-3 | A single prover/circuit bug is a systemic risk | Multiple proof systems + security council / fallback. [Vitalik Surge](https://vitalik.eth.limo/general/2024/10/17/futures2.html) | Reduces single-implementation risk, but raises cost and coordination complexity |
| Proof market / input standardization | Provers may centralize, and interfaces are not unified | Standardize prover input and market-ize prover supply. [prover input](https://ethresear.ch/t/zk-evm-prover-input-standardization/21626), [prover market](https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834) | Multiple provers can compete, but a stable interface is required |

## Current Bottleneck
Today every full validator/client obtains correctness and data availability implicitly through re-execution. Proofs can lower the cost of correctness verification, but without payload/BAL availability, RPCs, indexers, builders, and downstream provers still cannot reconstruct the chain.

## Optimization Mechanism
In the short term, EIP-8025 optional proofs let the network test proof generation/gossip/verification; in the medium term, multi-prover/market efforts standardize inputs; in the long term, mandatory proofs require DA binding of the EIP-8142 kind; and native rollups turn the rollup STF into an L1-verifiable primitive.

## Future Effect
Ethereum validation can move from everyone re-executing to proof verification + explicit DA. Rollups may move from an "external bridge/proof stack" toward a more native L1 execution-shard style. But prover latency, proof centralization, and multi-proof economics will become the new bottlenecks.

## Dependencies & Sequencing
PeerDAS/EIP-7594 provides blob DA; BALs/EIP-7928 provide state access data; ePBS/EIP-7732 improves payload timing; EIP-8142 connects proof-heavy execution with DA; EIP-8079 is the native rollup architecture layer.

## Risks & Open Questions
The unresolved fault line is the choice among one canonical proof path, multi-prover redundancy, and a proof market/client-choice fallback. Fable's correction to Appendix B holds: `optional 2-of-3 proofs` on the Strawmap can be mapped to EIP-8025 optional proofs + Vitalik's 2-of-3 multi-proof framing; `mandatory 1-of-1 proofs` can be mapped to EIP-8142/the mandatory proof regime. But EIP-8025 is currently Stagnant and Hegotá PFI, and should not be written up as an active fork commitment.

## Impact on Mantle
Mantle is already running OP Succinct/SP1 validity proofs on mainnet, which aligns with the proof-heavy future, but it also turns verifier keys, fallback mode, prover-input derivation, and custom STF equivalence into production risks. EIP-8079 native-rollup compatibility still requires that Mantle's STF, custom gas token, precompiles/tx types, and Ethereum blob/calldata DA path be compatible with the L1 `EXECUTE`/anchoring model — it is not something completed just by swapping the prover. The bridge security narrative must cover both proof correctness and DA/BAL availability.

## Recommended Mantle Watchpoints
- Establish monitoring for the SP1/prover key lifecycle, verifier routing, and fallback mode.
- Assess whether Mantle's STF contains native-rollup-incompatible custom semantics.
- Track EIP-8142's requirements for DA/BAL/payload availability.
- Treat verification-key hotfixes and prover/client equivalence incidents as risk case studies for multi-prover / input-standardization postmortems.
- Feed the proof market / multi-prover work into the long-term decentralization roadmap.

## Sources
- https://eips.ethereum.org/EIPS/eip-8025
- https://github.com/ethereum/consensus-specs/blob/master/specs/_features/eip8025/proof-engine.md
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8079
- https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517
- https://ethresear.ch/t/a-native-zkevm-scales-bandwidth-not-just-execution/25254
- https://ethresear.ch/t/zk-evm-prover-input-standardization/21626
- https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://blog.succinct.xyz/case-studies/mantle/
