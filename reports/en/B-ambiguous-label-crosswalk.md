# Appendix B: Ambiguous Strawmap Label Crosswalk

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## How to Read This
This appendix sorts Strawmap labels that lack a clear canonical EIP/source into three classes: confirmed, inferred, and unresolved. `inferred` may be used to explain what the roadmap means, but it must be flagged explicitly as a mapping; `unresolved` should not be written up as a definite feature.

| Label | Class | Best mapping | Writing guidance |
|---|---|---|---|
| snail issuance | unresolved | issuance policy / tempered issuance research | Write it as informal shorthand on the official Strawmap diagram; the main text should discuss only issuance policy |
| leanDA / PQ leanDA | inferred | PQ data roadmap, leanVM -> PQ blobs | Write it as long-term PQ DA shorthand |
| short-dated blob futures | confirmed + dual meaning | BLOBBASEFEE-driven blob futures; separately, EIP-8256 ticketed reservation | Distinguish price futures from capacity reservation |
| long-dated gas futures | confirmed | BASEFEE-driven gas futures / derivatives | Write it as a research-only treasury hedge direction |
| Pureth purges | confirmed | Strawmap links to EIP-7919 Pureth Meta + misc purges | Separate Pureth data/RPC verification from purge/state expiry, and note EIP-7919 is Stagnant |
| partial binary tree | inferred | unified binary tree / binary Merkle tree / EIP-7864 | Write it as the binary-tree state commitment direction |
| optional 2-of-3 proofs | confirmed | Strawmap links to EIP-8025; Vitalik's Surge post describes the 2-of-3 multi-proof framing | Write it as optional proofs + multi-prover threshold research, and note EIP-8025 is Stagnant/Hegotá PFI |
| mandatory 1-of-1 proofs | confirmed | Strawmap links to EIP-8142 / Block-in-Blobs; mandatory proof regime | Write it as a mandatory proof regime + BiB DA binding, no longer as a mislabeled item |
| attester-proposer separation | confirmed label/link mismatch | The Strawmap label reads attester-proposer separation, but the link points to the attester-includer separation research post | The main text may use attester-includer separation to explain it, while flagging the label/link mismatch |
| lean privacy wormholes | inferred | Zero-Knowledge Wormholes / native privacy | Write it as a privacy primitive mapping, not a lean-specific spec |
| specs quantum | inferred | PQ roadmap / Lean Ethereum / cryptographic agility | Write it as PQ spec modernization shorthand |
| PQ leanSPHINCS transactions | inferred | PQ transaction signatures / SPHINCS+ / SLH-DSA / AA | Write it as PQ auth research, not a standardized transaction type |

## Constraints on the Main Reports
- If a label is inferred/unresolved, the main text must carry an explicit caveat.
- eth2030/Strawmap gap-analysis labels must not be equated with the finalized Ethereum roadmap; eth2030 is a third-party personal repository and should be marked as unofficial supporting material.
- `short-dated blob futures` is clearer in this deep dive than in the previous version: it can refer to BLOBBASEFEE-backed blob gas futures, and it may also overlap narratively with EIP-8256 capacity reservation; the two should be kept separate.
- The official SVG also contains a Google Doc link that returns 401/is inaccessible in the current environment; the related labels can only be treated as official links that cannot be re-verified.

## Sources
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/GAP_ANALYSIS.md
- https://github.com/jiayaoqijia/eth2030/blob/14497b5fefa08cdba038f92bd2c29f82ad09b625/docs/ROADMAP.md
- https://eips.ethereum.org/EIPS/eip-7516
- https://eips.ethereum.org/EIPS/eip-3198
- https://eips.ethereum.org/EIPS/eip-7919
- https://eips.ethereum.org/EIPS/eip-7864
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-8142
- https://vitalik.eth.limo/general/2024/10/17/futures2.html
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://eips.ethereum.org/EIPS/eip-7503
- https://ethresear.ch/t/wormholes-and-the-cost-of-plausible-deniability/23728
- https://ethresear.ch/t/sphincs-minus-efficient-stateless-post-quantum-signature-verification-on-the-evm/25165
- https://pq.ethereum.org/
