# Wave 1 Digest: R7 Resource Pricing, Blob/Data Repricing, Multidimensional Fees, Futures

Agent: `019f3538-caa3-7e03-a777-b5d2181a9667`

## Key Findings

- EIP-7918 sets a blob base-fee floor tied to execution cost, addressing blob underpricing relative to execution resources.
- EIP-7999 proposes a unified multidimensional fee market with one aggregate max fee over multiple resource dimensions.
- EIP-8007 is an informational repricing directory, not a direct fee rule or fork-governance mechanism.
- EIP-8037/8038 target state creation/access repricing; EIP-8131/8279/8311 target byte floors for transaction content, BAL bytes, and calldata.
- Gas futures are research-only and split into long-dated hedging, short-dated advance purchase, and in-protocol futures ideas; they are not canonical EIPs.
- Objections cluster around recoupling, complexity, builder centralization, app impact, and whether repricing changes real behavior enough.

## Sources Surfaced

- https://eips.ethereum.org/EIPS/eip-7918
- https://ethereum-magicians.org/t/eip-7918-blob-base-fee-bounded-by-execution-cost/23271
- https://eips.ethereum.org/EIPS/eip-7999
- https://ethereum-magicians.org/t/eip-7999-unified-multidimensional-fee-market/25010
- https://eips.ethereum.org/EIPS/eip-8007
- https://blog.base.dev/glamsterdam-proposals
- https://eips.ethereum.org/EIPS/eip-8037
- https://eips.ethereum.org/EIPS/eip-8038
- https://eips.ethereum.org/EIPS/eip-8131
- https://eips.ethereum.org/EIPS/eip-8279
- https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8311.md
- https://ethresear.ch/t/state-growth-scenarios-and-the-impact-of-repricings/23476
- https://ethresear.ch/t/pricing-gas-fee-derivatives/19898
- https://ethresear.ch/t/how-to-purchase-ethereum-gas-in-advance/19069
- https://ethresear.ch/t/on-in-protocol-gas-futures/23698

## Mantle Implications

- DA fallback economics change if blob fees get stronger reserve floors or multidimensional pricing.
- EIP-7999 could simplify fee budgeting for sequencers/users by reducing separate cap overprovisioning.
- Gas futures are relevant to treasury hedging but remain research, not a protocol-ready tool.
- Byte/state repricing can alter the economics of calldata-heavy fallback and high-byte workloads.

## EXPAND Markers

- LEAD: Build proposal/objection matrix — WHY: report needs to distinguish protocol proposals from research-only futures — ANGLE: source matrix by proposal and objection class.
