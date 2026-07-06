# Wave 1 Digest: R8 Gigagas L1, Gas Limit, and P2P Throughput

Agent: `019f3538-d5d4-77d2-bca5-cedc1faaa786`

## Key Findings

- Gigagas is a north-star target; current research benchmarks show high-throughput execution possibilities but not a settled network parameter.
- EIP-7938 uses client-default exponential gas-limit voting, not consensus enforcement, and the worker reports it as stagnant.
- Gas-limit increases alone are unsafe because client bugs, disk I/O, CPU, block propagation, gossip size, and worst-case block construction become constraints.
- P2P/networking work attacks execution payload broadcast, blobpool bandwidth, PeerDAS cell dissemination, and mempool metadata/redundant fetches.
- Repricing is a companion control knob: higher gas limits increase state growth and worst-case blocks unless bytes/state are priced more accurately.
- Mantle currently reduces costs with modular DA/EigenDA while retaining L1 fallback paths through OP Stack-derived mechanisms.

## Sources Surfaced

- https://ethresear.ch/t/achieving-10gigagas-s-evm-execution-with-bal-and-parallel-execution/23632
- https://eips.ethereum.org/EIPS/eip-7938
- https://ethereum-magicians.org/t/eip-7938-exponential-gas-limit-increase-via-default-client-voting-behavior/23884
- https://eips.ethereum.org/EIPS/eip-7935
- https://ethresear.ch/t/on-increasing-the-block-gas-limit-technical-considerations-path-forward/21225
- https://github.com/ethp2p/ethp2p
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8136
- https://eips.ethereum.org/EIPS/eip-8077
- https://eips.ethereum.org/EIPS/eip-8094
- https://ethresear.ch/t/a-new-design-for-das-and-sharded-blob-mempools/22537
- https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476
- https://ethresear.ch/t/worst-case-block-size-and-calldata-repricing-for-glamsterdam/23895
- https://www.mantle.xyz/blog/developers/mantle-unlocking-the-potential-of-modular-blockchain-scaling
- https://www.mantle.xyz/blog/announcements/mantle-network-eigenda
- https://specs.optimism.io/protocol/configurability.html
- https://specs.optimism.io/protocol/derivation.html
- https://l2beat.com/scaling/projects/mantle

## Mantle Implications

- L1 capacity improvements can reduce settlement/fallback costs, but Mantle should not assume calldata/blob fallback becomes permanently cheap.
- OP Stack fallback choices between blobs/calldata remain strategically important under changing pricing.
- Mantle should monitor p2p and repricing changes because they affect L1 congestion and fallback reliability.

## EXPAND Markers

- none returned explicitly.
