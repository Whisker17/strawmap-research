# Wave 2 Digest: Ambiguous Label Crosswalk

Agent: `019f353e-9f97-7482-8e2e-66648b76d89d`

## Key Findings

Exact-label sweeps across EIPs, ethereum.org, EF blog, ethresear.ch, Magicians, and the eth2030 repo classified ambiguous Strawmap labels into confirmed, inferred, and unresolved buckets.

## Crosswalk

| Label | Class | Best mapping | Notes |
|---|---|---|---|
| snail issuance | unresolved | no protocol-grade mapping; issuance-policy meme | No EIP/EF/roadmap match; use issuance-policy/tempered issuance only as related context. |
| leanDA / PQ leanDA | inferred | PQ data roadmap: leanVM -> PQ blobs | No exact label; use PQ/lean data aggregation caveat. |
| short-dated blob futures | confirmed | `BLOBBASEFEE`-driven blob gas futures, plus possible reservation/streaming context | Stronger than prior ticket-only mapping; mention both futures and EIP-8256 reservation as distinct concepts. |
| long-dated gas futures | confirmed | `BASEFEE`-driven gas futures | Exact label in eth2030 and supported by BASEFEE futures framing. |
| Pureth purges | inferred | EIP-7919 Pureth Meta + misc purges | Not an exact upstream term. |
| partial binary tree | inferred | unified binary tree / binary Merkle tree | Closest official anchor is EIP-7864. |
| optional 2-of-3 proofs | unresolved | optional proofs | 2-of-3 threshold not canonical. |
| mandatory 1-of-1 proofs | unresolved | closest source says mandatory 3-of-5 proofs | 1-of-1 likely corruption/not canonical. |
| lean privacy wormholes | inferred | Zero-Knowledge Wormholes / burn-and-remint privacy | Lean prefix not separately canonical. |
| specs quantum | inferred | PQ roadmap / Lean Ethereum / cryptographic agility | No exact phrase. |
| PQ leanSPHINCS transactions | inferred | PQ transaction signatures / SPHINCS+ / SLH-DSA | No exact LeanSPHINCS Ethereum primitive. |

## Sources Surfaced

- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/GAP_ANALYSIS.md
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/ROADMAP.md
- https://ethereum.org/roadmap/
- https://blog.ethereum.org/2025/07/31/lean-ethereum
- https://pq.ethereum.org/
- https://ethereum.org/roadmap/future-proofing/quantum-resistance/
- https://eips.ethereum.org/EIPS/eip-7516
- https://ethereum-magicians.org/t/eip-4844-shard-blob-transactions/8430
- https://eips.ethereum.org/EIPS/eip-3198
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-7864
- https://github.com/ethereum/consensus-specs/blob/master/specs/_features/eip8025/zkevm.md
- https://eips.ethereum.org/EIPS/eip-7503
- https://ethresear.ch/t/wormholes-and-the-cost-of-plausible-deniability/23728
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165

## EXPAND Markers

- LEAD: Add likely OCR/transcription-corruption flag for threshold-like labels — WHY: optional 2-of-3 and mandatory 1-of-1 do not match current sources — ANGLE: final appendix taxonomy.
