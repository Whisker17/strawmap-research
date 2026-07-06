# Wave 1 Digest: R9 BALs and Explicit State Access

Agent: `019f3538-e730-71f0-ae93-3ca80ee2f2dc`

## Key Findings

- The hidden bottleneck is unknown state access: clients cannot parallelize disk reads, execution, or root computation until touched accounts/slots are known.
- EIP-7928 BALs commit a block-wide access list in the block header and require the EL to verify the generated BAL exactly matches the provided BAL.
- BALs improve parallel reads, validation, state-root work, state reconstruction, snap-style healing, and p2p sync.
- BALs do not solve all state-root bottlenecks, do not remove hard-fork needs, and introduce phantom-read / cheap-byte / propagation-size risks.
- EIP-7928 is scheduled for Glamsterdam; follow-ons include eth/71 BAL exchange, snap/2 BAL-based healing, state-root computation work, BAL-byte repricing, and storage-root extensions.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8159
- https://eips.ethereum.org/EIPS/eip-8189
- https://eips.ethereum.org/EIPS/eip-7862
- https://eips.ethereum.org/EIPS/eip-8279
- https://eips.ethereum.org/EIPS/eip-8007
- https://ethereum-magicians.org/t/soliciting-stakeholder-feedback-on-glamsterdam-headliners/24885
- https://ethereum-magicians.org/t/eip-8038-state-access-gas-cost-update/25693
- https://eips.ethereum.org/EIPS/eip-8268

## Mantle Implications

- BALs can help prover witness planning because they make touched accounts/slots explicit.
- They enable better state-access profiling for L2 workload analysis.
- Mantle should design future-proof interfaces around execution payload plus separate BAL transport.
- BALs become more important if Ethereum moves to proof-heavy execution where payload/state availability must be explicit.

## EXPAND Markers

- none returned explicitly.
