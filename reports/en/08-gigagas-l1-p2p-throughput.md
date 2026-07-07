# 08 Gigagas L1: Gas Limit and P2P Throughput

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not as committed parameters.

## Optimization Coverage
gigagas L1, 1 Ggas/sec, gas limit increases / EIP-7938, EIP-7935/7783/7790, ethp2p broadcast/unification, sharded mempool, EIP-8077, EIP-8094, worst-case block propagation.

## One-Page Conclusion
Gigagas L1 is not as simple as "raising the gas limit". The real path is execution parallelism, BALs, repricing, p2p broadcast, and blobpool/mempool optimizations advancing together. EIP-7935 is Final and pushed the default post-Fusaka gas limit target to 60M; EIP-7938 should currently be written as Stagnant; 7783/7790 also cannot be placed alongside the already-landed 7935 as one and the same real-world strategy. For Mantle, this affects L1 settlement/calldata fallback costs, but cannot be taken to mean "L1 will always be cheap".

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| Gas limit increases / EIP-7938 | Capacity is limited by the gas limit and client coordination | Client-default exponential voting, not consensus enforcement. [EIP-7938](https://eips.ethereum.org/EIPS/eip-7938) | Raises L1 capacity in theory; currently Stagnant, cannot be treated as an active plan |
| EIP-7935 | Directly raising the gas limit carries client bug / worst-case risk | Final: recommends a 60M default gas limit for execution clients after Fusaka. [EIP-7935](https://eips.ethereum.org/EIPS/eip-7935) | 60M becomes the realistic baseline, but still depends on client defaults and monitoring |
| ethp2p broadcast | Generic gossip struggles to support large payloads | Object-specific / erasure-coded broadcast. [ethp2p](https://github.com/ethp2p/ethp2p) | More efficient propagation of large objects, supporting bigger blocks/blobs |
| Sharded mempool | High redundancy in tx/blobpool propagation and fetching | EIP-8077 uses source/nonce hints to reduce wasted fetches; EIP-8094 uses sidecar separation and versioned-hash retrieval to make blob tx RBF cheaper. [EIP-8077](https://eips.ethereum.org/EIPS/eip-8077), [EIP-8094](https://eips.ethereum.org/EIPS/eip-8094) | Reduces wasted fetches and bandwidth; sampling belongs to EIP-8070, not EIP-8094 |
| Repricing companion | A rising gas limit amplifies cheap bytes/state attacks | Calldata/BAL/state repricing and worst-case block analysis. [state growth](https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476) | Ensures gas growth does not equal unconstrained state/byte growth |

## Current Bottleneck
Execution throughput is jointly limited by CPU, I/O, state access, the longest transaction critical path, block propagation, CL gossip size, and mempool fetch efficiency. Raising the gas limit alone would push the system toward worst-case blocks, state bloat, and propagation failure.

## Optimization Mechanism
Technically this requires BALs to expose state access, parallel execution to raise CPU utilization, ethp2p/8077/8094 to improve network propagation, and repricing to control worst-case bytes/state. EIP-7935 established the 60M realistic baseline; even if EIP-7938 is revived in the future, it is only a client voting path, not a protocol-enforced capacity guarantee. The numbers in the 10 Ggas/s research post need a caveat: they are a pure execution upper bound under experimental conditions such as preloaded state, pre-recovered senders, and skipped state roots — not a mainnet end-to-end throughput commitment.

## Future Effect
Once mature, L1 can support larger blocks and higher gas throughput, and L2 fallback, settlement, and forced inclusion costs may fall. But gigagas numbers should be treated as experimental/benchmark north-stars, not mainnet parameter commitments.

## Dependencies & Sequencing
Repricing/BALs/p2p first, then safely raising the gas limit. PeerDAS/blob propagation solve DA, while bigger gas expands the execution envelope; the two are complementary. EIP-7938 is currently Stagnant and needs an Appendix A annotation.

## Risks & Open Questions
Worst-case blocks can approach the gossip ceiling; state growth may be unsustainable; changes to RBF/nonce/mempool metadata affect client strategies; ethp2p remains a research/implementation stack rather than a single EIP.

## Impact on Mantle
Higher L1 capacity may lower fallback and settlement costs, but Mantle should still retain multiple paths across external DA/blobs/calldata. If L1 congestion eases, users may expect lower bridging/settlement fees; if repricing simultaneously raises byte/state costs, actual costs may rise rather than fall.

## Recommended Mantle Watchpoints
- Do not write gigagas into product fee-rate assumptions.
- Simulate gas-limit growth and repricing together in the fee model.
- Track OP Stack blob/calldata fallback costs under high L1 capacity and high byte floors.
- Monitor the impact of ethp2p/EIP-8077/EIP-8094 on forced inclusion and batcher propagation.

## Sources
- https://ethresear.ch/t/achieving-10gigagas-s-evm-execution-with-bal-and-parallel-execution/23632
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-7935
- https://github.com/ethp2p/ethp2p
- https://eips.ethereum.org/EIPS/eip-8077
- https://eips.ethereum.org/EIPS/eip-8094
- https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476
- https://ethresear.ch/t/worst-case-block-size-and-calldata-repricing-for-glamsterdam/23895
- https://specs.optimism.io/protocol/configurability.html
