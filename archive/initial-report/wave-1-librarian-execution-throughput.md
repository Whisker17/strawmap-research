# Wave 1 — Execution Throughput and Gas Scaling

Worker: `019f332c-a527-7c00-8e8b-f34543562ccc`

## Key Findings

- Execution throughput path:
  - Keep ETH-transfer cost as bandwidth/execution anchor.
  - Reprice byte-dense cases that leak around the floor.
  - Raise gas limit only after calldata/BAL/gas-density bypasses are controlled.
- Hegotá repricing explainer's minimal bundle: EIP-8131 + EIP-8279 + EIP-8311; EIP-7999 is a more ambitious alternative separating execution and bandwidth limits.
- Target framing from explainer: 450M gas as minimal safe path; 600M only if execution and propagation limits are uncoupled further. Treat as analysis target, not commitment.
- Networking:
  - ethp2p shifts from generic store-and-forward to object-specific broadcast with erasure coding for large objects and specialized paths for smaller ones.
  - ethp2p names BAL, blob/DAS, and PTC/IL as broadcast-layer objects and treats privacy/control as first-class.
- Proof taxonomy:
  - EIP-8025 anchors optional execution proofs.
  - EIP-8070 and ethp2p cover mandatory per-object validation for blob/cell delivery and broadcast verification.
  - Worker could not verify formal primary-source categories named "optional 2-of-3 proofs" or "mandatory 1-of-1 proofs"; treat as interpretation.

## Bottlenecks

- Execution ceiling: Hegotá analysis models worst-case execution around 100 Mgas/s.
- Bandwidth ceiling: Hegotá model uses propagation formula `t = 569 + 0.443*KB ms`.
- Mixed-block bypass: cheap calldata plus cold SLOAD/BAL growth can bypass simple floors.
- EL blobpool bandwidth: EIP-8070 says full-replication blobpool traffic dominates EL bandwidth in devnets.
- Cell-level churn: EIP-8136 targets missing-cell exchange when most blobs are already in mempool.
- DoS/poisoning: ethp2p broadcast framework notes stream exhaustion, chunk flooding, routing poisoning.

## Sources

- https://misilva73.github.io/hegota-repricings/
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8131.md
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8279.md
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8311.md
- https://eips.ethereum.org/EIPS/eip-7999
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8070.md
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8136.md
- https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-8025.md
- https://github.com/ethp2p/ethp2p/blob/741d8d9cf682ff93b7d8eb56e0377ba8eea83a7e/specs/001-ethp2p.md
- https://github.com/ethp2p/ethp2p/blob/741d8d9cf682ff93b7d8eb56e0377ba8eea83a7e/specs/002-ec-broadcast.md
- https://github.com/ethp2p/ethp2p/blob/741d8d9cf682ff93b7d8eb56e0377ba8eea83a7e/specs/003-ec-broadcast-rs.md

## EXPAND

- none needed for synthesis; optional numeric derivation table if report wants a deeper appendix.

## CLAIMS

- CLAIM: 450M gas at 12s implies about 1,786 pure-transfer TPS; 600M implies about 2,857 TPS — RISK: high — SOURCES: derived from gas math and Hegotá analysis — COUNTER: report must state this is a ceiling calculation, not realized TPS/commitment.
- CLAIM: EIP-8070 claims ~4x EL blobpool bandwidth reduction and EIP-8279 claims ~42% block-content reduction under draft assumptions — RISK: high — SOURCES: draft EIPs — COUNTER: use as proposal claims only.
