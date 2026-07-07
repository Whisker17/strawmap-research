# ULW-Research Synthesis: Ethereum Strawmap Detailed Report Pack

Workers: 19+ · Waves: planning + saturation + expansion · Reports: 14 + 2 appendices · Source refresh: 115 report URLs checked for reachability; 59 old-ledger URLs were separately rechecked during expansion.

## Executive Summary

This follow-up research splits the previous high-level report into 14 direction reports, each independently forwardable. Every report is organized around the four questions the Mantle dev team cares about: the current bottleneck, the optimization mechanism, the effect after the upgrade, and the impact on Mantle. The overall conclusion: the Ethereum Strawmap is not a linear upgrade path but three interdependent capability stacks: fast confirmation / ePBS / FOCIL / PQ heartbeat at the consensus layer; PeerDAS / blob propagation / pricing at the data layer; and BALs / proof-heavy execution / state redesign / account/privacy modernization at the execution layer.

For Mantle, what matters most is not any single EIP but the upward shift of the Ethereum L1 baseline, together with the fact that Mantle's own status has changed: Mantle should now be analyzed with Ethereum blobs/calldata as primary DA and OP Succinct/SP1 validity proofs already live. The capacity and pricing of the blob primary path become more critical; forced inclusion and encrypted mempool will raise the bar for L2 censorship-resistance and privacy narratives; proof-heavy execution and native rollups will require Mantle to distinguish more clearly between the in-production SP1 validity path, payload/BAL availability, and native-rollup compatibility; and state/RPC/witness/prover-input availability will become a first-class SLO.

## Findings by Theme

- Consensus layer: FCR/quick slots/SSF/decoupled consensus jointly compress the confirmation/finality experience, but their security semantics differ; ePBS/FOCIL/role separation reshape block production and censorship resistance; PQ CL is a phased migration, not a single fork.
- Data layer: PeerDAS/Fusaka/BPO have entered the live-on-mainnet/activated context; further scaling depends on sparse blobpool, cell deltas, streaming, and pricing; teragas/1GB/s remains a north-star. The Mantle sections have been corrected from the outdated external-DA-first premise to Ethereum blobs as primary DA.
- Execution layer: BALs are the plumbing for high gas and proof-heavy execution; optional proofs are only a proving ground, and a mandatory proof regime requires Block-in-Blobs; state growth remains the hardest layer.
- Accounts and privacy: Frame tx/keyed nonces/recent roots pave the way for AA/PQ/privacy validation; LUCID/GhostPool/shielded transfers respectively address content privacy, admission metadata, and value privacy.

## Verified Claims

- EIP-7918 is Final; PeerDAS/EIP-7594 is Final and Fusaka is live on mainnet; BPO1/BPO2 are activated.
- EIP-7928/EIP-7732 scheduled for Glamsterdam; EIP-7805 scheduled for Hegotá; EIP-8141 considered for Hegotá; EIP-8184 not listed in any fork meta.
- EIP-7938 is Stagnant and should not be written as an active gas-limit plan.
- Several Strawmap exact labels need to be graded as confirmed/inferred/unresolved, see Appendix B; among them, optional 2-of-3 proofs, mandatory 1-of-1 proofs, and Pureth purges have been corrected to confirmed based on the SVG links.

## Gaps

- Some labels on the Strawmap diagram may come from eth2030/internal shorthand/visual compression and cannot all be mapped to canonical EIPs.
- Some conclusions in the Mantle impact sections are synthesized inferences based on Mantle public docs, the Succinct case study, L2Beat, and the Ethereum roadmap; they are marked in each report as recommendations/inferences rather than official Mantle commitments.

## Expansion Trace

- Wave 0: the planning agent produced the 14-report + 2-appendix structure.
- Wave 1: 14 librarian agents covered the individual report directions.
- Wave 2: 4 expansion agents verified fork/status, freshness, ambiguous labels, the Mantle matrix, and the proof fault-line.
- Convergence: every report direction had a dedicated worker; newly found leads were integrated into Appendix A/B, the proof fault-line, and the Mantle action matrix; the remaining leads are optional follow-up memos and do not block the user's request.
