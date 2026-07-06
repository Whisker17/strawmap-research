# Wave 1 Digest: R5 Teragas L2, PeerDAS, and DA Capacity Growth

Agent: `019f3538-b5e1-72b1-af33-d781f099c913`

## Key Findings

- `teragas L2` / `1 Gbyte/sec` is a Strawmap north star, not a current Ethereum parameter.
- The current DA bottleneck is full blob download/replication: higher blob counts linearly stress node bandwidth if every node downloads every blob.
- PeerDAS uses erasure coding, cells/columns, custody, and random sampling so nodes need only sample a subset of blob data.
- The DA scaling ladder is staged: EIP-7691 short-term blob bump, EIP-7594 PeerDAS, EIP-7892 BPO forks, then follow-on sparse blobpool / streaming / FullDAS work.
- `leanDA` and `PQ leanDA` remain unresolved public labels; no canonical source was found.

## Sources Surfaced

- https://ethereum.org/roadmap/fusaka/peerdas/
- https://eips.ethereum.org/EIPS/eip-7594
- https://eips.ethereum.org/EIPS/eip-7691
- https://eips.ethereum.org/EIPS/eip-7892
- https://eips.ethereum.org/EIPS/eip-7840
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-8256
- https://eips.ethereum.org/EIPS/eip-7918
- https://ethereum.org/roadmap/danksharding/
- https://www.mantle.xyz/
- https://www.mantle.xyz/blog/community/community-catch-up-with-bybits-ben-zhou-ama-recap

## Mantle Implications

- Ethereum blobs become a stronger fallback and benchmark as PeerDAS/BPO improves capacity, but this does not make EigenDA irrelevant.
- Mantle should model EigenDA-first, Ethereum-blob fallback, and mixed DA scenarios.
- `leanDA` should be caveated as unresolved shorthand rather than a concrete protocol dependency.

## EXPAND Markers

- LEAD: Verify PeerDAS/Fusaka/BPO deployment and parameter status — WHY: worker surfaced time-sensitive mainnet claims — ANGLE: official EF blog, ethereum.org, EIPs.
- LEAD: Mantle DA cost-sensitivity surface — WHY: highest-value Mantle-specific angle — ANGLE: EigenDA-only vs Ethereum fallback vs mixed DA.
