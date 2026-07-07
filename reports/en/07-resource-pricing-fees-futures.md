# 07 Resource Pricing: Blobs, Byte Floors, Multidimensional Fees, and Futures

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not as committed parameters.

## Optimization Coverage
EIP-7918 blob fee floor, EIP-7999 unified multidimensional fee market, EIP-8007 repricing meta, Glamsterdam SFI repricing (EIP-7976/7981/8037) and CFI repricing (EIP-8038), EIP-8131/8279/8311 byte floors, short/long-dated gas futures.

## One-Page Conclusion
Scaling without pricing corrections turns the bottleneck from "not enough capacity" into "the wrong resources are too cheap". This group of optimizations reprices resources such as blobs, calldata, BAL bytes, and state creation/access, and attempts to unify multi-resource budgets. For Mantle, this is a core input to Ethereum blobs as primary DA, calldata fallback, MNT gas economics, user fee stability, and treasury hedging.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| EIP-7918 | Blob fees can be too cheap relative to execution cost | Ties a blob base-fee floor to execution cost. [EIP-7918](https://eips.ethereum.org/EIPS/eip-7918) | Blob prices better reflect L1 resources; already Final/Fusaka |
| EIP-7999 | Fee caps for gas/blob and other resources are fragmented, causing users to over-reserve | A single aggregate `max_fee` + vectorized accounting. [EIP-7999](https://eips.ethereum.org/EIPS/eip-7999) | More unified fee UX, but more complex builder packing |
| EIP-8007 | Repricing proposals are scattered | A Meta EIP cataloging the Glamsterdam repricings. [EIP-8007](https://eips.ethereum.org/EIPS/eip-8007) | Clearer governance/discussion, but not itself a fee rule |
| EIP-7976/7981 | Calldata floor and access-list costs are too low and can become a cheap-byte/state-access bypass | Glamsterdam SFI: raise the calldata floor and access-list cost. [EIP-7976](https://eips.ethereum.org/EIPS/eip-7976), [EIP-7981](https://eips.ethereum.org/EIPS/eip-7981) | The near-term repricing that most affects rollup calldata fallback and high-byte transactions |
| EIP-8037/8038 | State creation/access costs are underpriced; a rising gas limit would accelerate state bloat | EIP-8037 is Glamsterdam SFI, EIP-8038 is Glamsterdam CFI; they address state creation bytes and state access/account writes respectively. [EIP-8037](https://eips.ethereum.org/EIPS/eip-8037), [EIP-8038](https://eips.ethereum.org/EIPS/eip-8038) | More sustainable gas-limit growth, but with application compatibility impact |
| EIP-8131/8279/8311 | Calldata, tx content, and BAL bytes can form a cheap-byte bypass | 8131 continues/unifies the 7976/7981 transaction-content floor; 8279 addresses BAL bytes; 8311 proposes a higher floor. [EIP-8131](https://eips.ethereum.org/EIPS/eip-8131), [EIP-8279](https://eips.ethereum.org/EIPS/eip-8279), [EIP-8311](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md) | Reduces worst-case block bytes, leaving room for gas scaling |
| Gas/blob futures | L2s/applications struggle to budget future L1 costs | Research on BASEFEE/BLOBBASEFEE-driven futures/advance purchase. [BASEFEE](https://eips.ethereum.org/EIPS/eip-3198), [gas advance](https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069) | May support treasury hedging, but most of it remains research-only |

## Current Bottleneck
Ethereum's resources cannot be accurately represented by a single gas dimension: execution, bytes, state growth, blob DA, BALs, and KZG/proof workloads all differ. Without repricing before scaling, attackers will pick the cheapest resource to saturate the bottleneck.

## Optimization Mechanism
In the short term, specific bypasses are patched via the blob floor, Glamsterdam SFI repricing, byte floors, and state repricing; in the medium term, EIP-7999 attempts to unify multidimensional resource budgets; in the long term, futures/advance-purchase research attempts to turn future fees into a plannable or hedgeable asset. The calldata/byte floor timeline should be narrated as 7976/7981 (Glamsterdam SFI) -> 8131 (Hegotá PFI / subsequent unified floor) -> 8311 (newer proposal, higher floor), rather than building the narrative around unscheduled EIPs alone. The Strawmap's `data repricing` box also links to the Hegotá repricing catalog page, which can serve as a cross-EIP entry point rather than a separate mechanism.

## Future Effect
If landed, the L1 costs Mantle faces will be both more truthful and more predictable: the era of cheap DA may end, but extreme congestion and mispricing attacks will decrease. User fees may become more stable and the treasury can budget better, but the cost of high-byte / high-state workloads will rise.

## Dependencies & Sequencing
EIP-7918 is already Final; EIP-7976/7981/8037 are Glamsterdam SFI; EIP-8038 is Glamsterdam CFI; EIP-7999 depends on foundations such as EIP-7918; EIP-8279 depends on BALs; EIP-8131 is Hegotá PFI; futures remain primarily at the research layer and should not be written into the near-term roadmap.

## Risks & Open Questions
The main controversies are fee market recoupling, builder centralization from multidimensional packing, repricing breakage for applications, whether the complexity outweighs the benefits, and the tension between futures and the EIP-1559 burn mechanism. [in-protocol futures](https://ethresear.ch/t/on-in-protocol-gas-futures/23698)

## Impact on Mantle
Mantle's primary DA cost will be affected by the blob floor, the blob base fee, and multidimensional pricing; calldata fallback is directly exposed to the byte-floor line of EIP-7976/7981/8131/8311. The MNT gas token together with L1 posting expenditure forms a treasury exposure. Under the Arsia L1 data fee model, Mantle should build a joint sensitivity model of blob cost, calldata fallback, batch compression, and MNT gas demand.

## Recommended Mantle Watchpoints
- Build a DA fee model: Ethereum blobs as the primary path, calldata fallback, batch compression, posting cadence.
- Run treasury stress tests on the MNT gas token and L1 DA costs.
- Track the impact of EIP-7918/7976/7981/7999/8037/8038/8131/8279/8311 on batcher costs.
- Treat futures as treasury research, not as a short-term product commitment.

## Sources
- https://eips.ethereum.org/EIPS/eip-7918
- https://eips.ethereum.org/EIPS/eip-7999
- https://eips.ethereum.org/EIPS/eip-8007
- https://eips.ethereum.org/EIPS/eip-7976
- https://eips.ethereum.org/EIPS/eip-7981
- https://eips.ethereum.org/EIPS/eip-8037
- https://eips.ethereum.org/EIPS/eip-8038
- https://eips.ethereum.org/EIPS/eip-8131
- https://eips.ethereum.org/EIPS/eip-8279
- https://misilva73.github.io/hegota-repricings/
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md
- https://ethresear.ch/t/pricing-gas-fee-derivatives/19898
- https://ethresear.ch/t/on-in-protocol-gas-futures/23698
