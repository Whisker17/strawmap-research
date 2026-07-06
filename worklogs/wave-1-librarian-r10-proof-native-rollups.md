# Wave 1 Digest: R10 Proof-Heavy Execution and Native Rollups

Agent: `019f3538-f249-78e2-a6dc-697487587e8d`

## Key Findings

- The target bottleneck is re-execution plus payload download bandwidth plus the implicit DA guarantee that re-execution currently provides.
- EIP-8025 provides optional execution proofs so beacon nodes can validate payloads without running an execution client; it is a proving ground rather than mandatory consensus proofing.
- EIP-8142 Block-in-Blobs addresses the DA hole created when validators stop re-executing: execution payload data, transactions, and BALs must be available via blobs.
- EIP-8079 native rollups expose Ethereum's STF through an `EXECUTE` precompile and let rollups inherit L1 execution semantics more directly.
- PeerDAS, BALs, and ePBS are dependencies for proof-heavy execution because proof verification alone does not solve payload bandwidth or data availability.
- Optional/mandatory and 2-of-3/1-of-1 wording should be handled carefully: optional is current proof availability; mandatory is a future regime; 2-of-3 comes from multi-prover safety framing; 1-of-1 is inferred, not canonical.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-8025
- https://github.com/ethereum/consensus-specs/blob/master/specs/_features/eip8025/proof-engine.md
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8079
- https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517
- https://ethresear.ch/t/a-native-zkevm-scales-bandwidth-not-just-execution/25254
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7732
- https://github.com/ethereum/consensus-specs/issues/5140
- https://vitalik.eth.limo/general/2024/10/17/futures2.html
- https://www.mantle.xyz/blog/announcements/mantle-network-advances-technical-roadmap-as-the-first-zk-validity-rollup-with-succincts-sp1
- https://www.mantle.xyz/blog/announcements/mantle-network-security-evolution-scalability-decentralization

## Mantle Implications

- Mantle's SP1/ZK-validity direction is compatible with proof-heavy execution, but native-rollup compatibility depends on avoiding custom opcodes/precompiles/transaction types inside its STF.
- Proof-only narratives must be paired with DA/BAL availability; EIP-8142 is the Ethereum-side answer to proof-without-data risk.
- Mantle should track multi-prover vs single-prover fault lines because they affect bridge/security narratives and prover decentralization expectations.

## EXPAND Markers

- LEAD: one canonical proof path vs multiple proof systems vs proof market/client-choice fallback — WHY: biggest unresolved technical fault line — ANGLE: EIP-8025, EIP-8142, EIP-8079, Vitalik multi-prover framing, native zkEVM discussions.
- LEAD: optional does not mean optional forever — WHY: report must explain staged transition to mandatory proof regimes — ANGLE: source trail from EIP-8025 to EIP-8142.
