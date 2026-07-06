# Wave 1 — Data Economics, Pricing, and Blob/Gas Markets

Worker: `019f332c-9abf-7592-8cf8-5b6f56403ccc`

## Key Findings

- Economic cluster splits into:
  - fee-market redesigns: EIP-7918, EIP-7999, EIP-8011,
  - DA/payload plumbing: EIP-7928, EIP-8142, EIP-8256,
  - supply expansion/repricing: EIP-7938, EIP-8131, EIP-8279, EIP-8037.
- Important correction: EIP-7919 is Pureth Meta, not fee-market; EIP-8025 is optional execution proofs; EIP-7938 is a gas-limit ramp, not a fee-market change.
- Current bottleneck: when blob capacity rises and demand is low, blob base fee can sit at its minimum and stop carrying a meaningful price signal relative to execution/KZG verification costs. EIP-7918 and dual-variable fee research respond to this.
- EIP-7999 generalizes pricing across multiple resources under one aggregate max-fee/reserve-pricing framework, but introduces builder packing and UX concerns.
- EIP-8256 is closest to "short-dated blob futures" but is not financial futures; it is a ticketed AOT/JIT blob capacity and propagation design.
- Long-dated gas futures are exploratory research threads rather than a canonical EIP.

## Sources

- https://eips.ethereum.org/EIPS/eip-4844
- https://eips.ethereum.org/EIPS/eip-7918
- https://eips.ethereum.org/EIPS/eip-7999
- https://eips.ethereum.org/EIPS/eip-8011
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8256
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-7919
- https://ethresear.ch/t/multidimensional-eip-1559/11651
- https://ethresear.ch/t/a-practical-proposal-for-multidimensional-gas-metering/22668
- https://ethereum-magicians.org/t/eip-7918-blob-base-fee-bounded-by-execution-cost/23271
- https://ethereum-magicians.org/t/eip-7999-unified-multidimensional-fee-market/25010
- https://ethresear.ch/t/on-in-protocol-gas-futures/23698
- https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069

## EXPAND

- LEAD: Latest replies/objections on EIP-7918, EIP-7999, EIP-8011 — WHY: fee market design is contested — ANGLE: Magicians/ethresear.ch discussion scan.
- LEAD: EIP-8131, EIP-8279, EIP-8037, EIP-7981 data repricing cluster — WHY: likely maps to Strawmap `data repricing` and Hegotá repricing — ANGLE: official EIPs and Hegota repricing site.

## CLAIMS

- CLAIM: EIP-7918 says blob fee can drift to 1 wei and adds reserve pricing tied to execution base fee — RISK: high — SOURCES: EIP-7918 — COUNTER: current status/parameters need recheck — PRIMARY: EIP.
- CLAIM: EIP-8256 is closest to short-dated blob futures but is a ticketed AOT/JIT capacity reservation, not a financial futures market — RISK: normal — SOURCES: EIP-8256 — COUNTER: no canonical futures EIP found — PRIMARY: EIP-8256.
