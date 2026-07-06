# Wave 2 Digest: Proof-System Fault Line

Agent: `019f353e-b678-7a60-9381-75b9028495a0`

## Key Findings

- EIP-8025 is optional and consensus-layer-only: a proof plumbing / proving-ground path, not the end state.
- EIP-8142 is the mandatory-regime DA answer: if validators stop downloading payloads, payload data and BALs must be made available in blobs.
- EIP-8079 native rollups move STF execution/verification into an L1 precompile; this is different from optional consensus-side proofs.
- Vitalik's framing favors multiple proving systems in the medium term, with enshrined verification later.
- A proof-market / standardized input interface is a third lane between one canonical proof system and purely optional proofs.
- Mantle's SP1 path is compatible with validity proving over a custom OP Stack, but not automatically equivalent to EIP-8079-style native rollup adoption.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8079
- https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517
- https://vitalik.eth.limo/general/2023/09/30/enshrinement.html
- https://vitalik.eth.limo/general/2024/03/28/blobs.html
- https://vitalik.eth.limo/general/2025/01/23/l1l2future.html
- https://ethresear.ch/t/zk-evm-prover-input-standardization/21626
- https://ethresear.ch/t/an-ethereum-prover-market-proposal/22834
- https://ethresear.ch/t/native-proof-verification/24798
- https://blog.succinct.xyz/case-studies/mantle/
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://blog.succinct.xyz/optimism-superchain/

## Mantle Implications

- Mantle's current SP1 direction aligns with a validity-proof future and proof-market/client-choice direction.
- EIP-8079-native compatibility would require more than SP1: the chain architecture must align with L1-enshrined execution verification, anchoring, and DA semantics.
- The team should track DA/BAL availability because proof-only validation without reconstructible data is unsafe for bridge/indexer/security narratives.

## EXPAND Markers

- LEAD: Side-by-side matrix of optional proofs vs mandatory proofs vs proof market vs native rollup — WHY: useful for final report pack.
- LEAD: Mantle-specific native-rollup risk memo — WHY: clarify what would have to change for EIP-8079 compatibility.
