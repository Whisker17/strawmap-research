# Ethereum Strawmap Detailed Report Pack Index

> For Mantle dev team / researcher handoff. Generated: 2026-07-06.

## How to Read

This material splits the previous top-level report into 14 direction reports and 2 appendices. Every report answers the same structured questions: what the bottleneck is, how it is being optimized, the expected future effect, dependencies and ordering, risks/open questions, impact on Mantle, and recommended points of attention for Mantle.

Recommended reading order: read Appendix A/B first to avoid misreading statuses and ambiguous labels; then read by consensus layer, data layer, execution layer, and account/privacy layer; finally return to the Mantle impact matrix.

## Report List

| # | Report | Layer | Purpose |
|---|---|---|---|
| 1 | [Fast L1: Fast Confirmation, Short Slots, and Fast Finality](reports/01-fast-l1-confirmation-finality.md) | Consensus | Standalone deep dive |
| 2 | [Block Production and Censorship Resistance: ePBS, FOCIL, and Role Separation](reports/02-block-production-censorship-resistance.md) | Consensus/Execution boundary | Standalone deep dive |
| 3 | [Validator Scale, Issuance Policy, and Lean Specs](reports/03-validator-scale-issuance-lean-specs.md) | Consensus | Standalone deep dive |
| 4 | [Consensus-Layer Resilience and Post-Quantum CL](reports/04-consensus-resilience-pq-cl.md) | Consensus/Cryptography | Standalone deep dive |
| 5 | [Teragas L2: PeerDAS and DA Capacity Growth](reports/05-peerdas-da-capacity.md) | Data | Standalone deep dive |
| 6 | [Blob Propagation, Custody, and Streaming](reports/06-blob-propagation-custody-streaming.md) | Data/Networking | Standalone deep dive |
| 7 | [Resource Pricing: Blobs, Byte Floors, Multidimensional Fees, and Futures](reports/07-resource-pricing-fees-futures.md) | Data/Execution economics | Standalone deep dive |
| 8 | [Gigagas L1: Gas Limit and P2P Throughput](reports/08-gigagas-l1-p2p-throughput.md) | Execution/Networking | Standalone deep dive |
| 9 | [BALs: Explicit State Access and Block-Level Access Lists](reports/09-bals-explicit-state-access.md) | Execution/State | Standalone deep dive |
| 10 | [Proof-Heavy Execution and Native Rollups](reports/10-proof-heavy-execution-native-rollups.md) | Execution/Data boundary | Standalone deep dive |
| 11 | [EVM Hardening and Proving Substrates](reports/11-evm-hardening-proving-substrates.md) | Execution/Proving | Standalone deep dive |
| 12 | [State Growth, Statelessness, and Purges](reports/12-state-growth-statelessness-purges.md) | Execution/State | Standalone deep dive |
| 13 | [Frame Transactions and Account/Auth Modernization](reports/13-frame-transactions-account-auth.md) | Accounts/Transactions | Standalone deep dive |
| 14 | [Private L1: Encrypted Mempool, Shielded Transfers, and the Privacy Roadmap](reports/14-private-l1-encrypted-mempool.md) | Privacy/Transactions | Standalone deep dive |
| 15 | [Appendix A: Fork Status, North Stars, and Timeline Caveats](reports/A-fork-status-and-north-star-caveats.md) | Appendix | Status/label calibration |
| 16 | [Appendix B: Ambiguous Strawmap Label Crosswalk](reports/B-ambiguous-label-crosswalk.md) | Appendix | Status/label calibration |

## Key Dependencies

| Upstream capability | Unlocks / impact | Related reports |
|---|---|---|
| FCR / quick slots / decoupled consensus | Faster L1 confirmation and finality semantics, but does not automatically shorten L2 proof finality | 01, 03 |
| ePBS | Splits the execution payload out of the consensus hot path, creating room for FOCIL, Block-in-Blobs (BiB), and shorter slots | 02, 10 |
| FOCIL | Strengthens public forced inclusion; the inclusion backbone for LUCID/encrypted mempool | 02, 14 |
| PeerDAS/Fusaka/BPO | Raises Ethereum blob DA headroom; the foundation for Mantle's current blob primary path and EIP-8142 payload-data DA | 05, 06, 10 |
| BALs | Explicit state access, underpinning parallel validation, proof-heavy execution, state sync, and witness planning | 09, 10, 12 |
| Repricing / multidimensional fees | Prevents cheap bytes/state from becoming the new bottleneck after scaling; affects blob primary-path and calldata fallback costs | 07, 08, 09 |
| Proof-heavy execution | Shifts from universal re-execution to proof verification + explicit DA/BAL availability | 10, 11, 12 |
| Frame tx / keyed nonces / recent roots | Provides the transaction-format foundation for AA, PQ auth, privacy validation, and relayers | 13, 14 |
| PQ / lean stack | Long-term impact on CL attestations, user auth, proof substrates, and DA commitments | 04, 11, 13 |

## Most Important Reading Threads for Mantle

- DA: read 05/06/07 first, through the lens of Mantle's current Ethereum-blobs primary DA, calldata fallback, Arsia L1 data fee model, and batch posting strategy.
- Proof: read 09/10/11/12 first, focusing on the already-live OP Succinct/SP1 validity proofs, native-rollup compatibility, BAL/payload availability, and witness SLOs.
- Sequencer/MEV: read 02/13/14 first, focusing on forced inclusion, fair sequencing, and whether to pursue encrypted mempool parity.
- Product/UX: read 01/10/13 first, focusing on separating confirmation/finality/proof/withdrawal states.

## Status Corrections

- PeerDAS/Fusaka/BPO1/BPO2 should, as of this date, be written as live on mainnet / activated, not pending deployment.
- EIP-7928 and EIP-7732 are Glamsterdam scheduled, but Glamsterdam is still in development.
- EIP-7805 is Hegotá scheduled; EIP-8141 is only Hegotá considered.
- EIP-8184, EIP-8079, EIP-8142, and similar are still Draft / research-stage and should not be written as fork commitments.
- `snail issuance`, `leanDA`, `partial binary tree`, `lean privacy wormholes`, and similar labels require the confirmed/inferred/unresolved caveats from Appendix B.
