# 02 Block Production and Censorship Resistance: ePBS, FOCIL, and Role Separation

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a commitment-grade release schedule. The timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
ePBS / EIP-7732, FOCIL / EIP-7805, attester-proposer separation, attester-includer separation, distributed block building / MPBC, PBS relay trust, inclusion lists.

## One-Page Conclusion
This group of optimizations pushes Ethereum away from a structure where "a few builders/relays control the actual block production path" toward in-protocol role separation and verifiable inclusion. ePBS first brings PBS into the protocol and splits the execution payload out of the consensus hot path; FOCIL then uses inclusion lists to force public transactions to be included; attester/includer separation and multi-party block construction further split apart "who sees transactions, who commits to inclusion, and who executes state." Mantle should treat this group as a raising of the L1 censorship-resistance baseline.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| ePBS / EIP-7732 | Current PBS relies on relays and off-protocol trust, and the execution payload sits on the critical path | Builder commitment + Payload Timeliness Committee, with deferred execution validation. [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732) | Reduces relay trust and gives proposers/validators more time, but the builder free option still exists |
| FOCIL / EIP-7805 | Builders/proposers can censor public mempool transactions | A committee produces an inclusion list, and fork choice requires blocks to satisfy the IL. [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805) | Stronger public forced inclusion, but does not solve all MEV ordering problems |
| Attester-includer separation | Inclusion and state execution are mixed in the same path, with unclear incentives and fees | Split inclusion txs from state txs, and the includer role from the proposer/builder roles. [attester-includer](https://ethresear.ch/t/towards-attester-includer-separation/21306) | A clearer public inclusion path, leaving an independent lane for privacy/MEV-sensitive flow |
| Distributed block building / MPBC | A single builder is a chokepoint, and orderflow capture is concentrated | Multiple parties contribute block contents, broadening transaction sources and construction participants. [MPBC](https://ethresear.ch/t/building-towards-multi-party-block-construction/24975) | Reduces single-point control, but coordination, latency, and incentive complexity rise |
| LUCID relation | FOCIL can only force publicly propagated transactions and cannot protect encrypted MEV-sensitive flow | Encrypted txs rely on the FOCIL inclusion backbone, with delayed reveal on top. [EIP-8184](https://eips.ethereum.org/EIPS/eip-8184) | Censorship resistance and privacy/MEV protection start to compose rather than substitute for each other |

## Current Bottleneck
PBS has already made builders/relays the de facto center of block production, with relay trust, builder concentration, private orderflow, and censorship risk compounding. Even if L1 consensus itself is decentralized, whether user transactions enter blocks in a timely way can still be influenced by a small number of professional participants.

## Optimization Mechanism
EIP-7732 protocolizes proposer-builder separation, using commitments and the PTC to constrain payload timeliness; FOCIL has a committee maintain the inclusion list and uses fork choice enforcement so blocks cannot arbitrarily ignore it; role separation / MPBC continues to carve out responsibility boundaries between includer, builder, proposer, and other roles.

## Future Effect
The future block production path will look more like a multi-lane system: a public forced inclusion lane, a builder/private MEV lane, an encrypted lane, and a state execution lane. Ethereum's censorship resistance will become more verifiable, but complexity will also rise—especially the ePBS free option, the relay's residual role, IL spam, and builder coordination.

## Dependencies & Sequencing
ePBS is the foundational structure, FOCIL is the inclusion enforcement, and LUCID/encrypted mempools depend on FOCIL but are not replaced by it. The fork meta itself already gives the ordering: ePBS is scheduled for Glamsterdam, FOCIL is scheduled for Hegotá; the two should not be written up as commitments in the same phase. Short slots and higher gas/blob throughput will amplify block propagation pressure, so this report should be read alongside Fast L1, Blob propagation, and BALs.

## Risks & Open Questions
The main risks include builder withholding / the free option, relays continuing to exist, MEV concentration not disappearing, inclusion-list spam/DoS, and the incentive complexity of a multi-role system. Both EIP-7732 and EIP-7805 still need to be stated carefully per the fork meta: EIP-7732 is scheduled for Glamsterdam, EIP-7805 is scheduled for Hegotá. [EIP-7773](https://eips.ethereum.org/EIPS/eip-7773), [EIP-8081](https://eips.ethereum.org/EIPS/eip-8081)

## Impact on Mantle
Once L1 forced inclusion gets stronger, Mantle's sequencer censorship-resistance narrative will also be re-compared. If L1 has a protocol-level inclusion list while the L2 still relies on a single sequencer or weak forced-tx UX, users will naturally ask whether Mantle's escape hatch is equally clear. Mantle's fair sequencing, forced transaction, sequencer failover, and private orderflow strategies need to be aligned with the new L1 baseline.

## Recommended Mantle Watchpoints
- Establish a user-visible flow for sequencer downtime / forced transactions.
- Internally distinguish "fair ordering," "censorship resistance," "privacy," and "MEV capture"—do not blend them into one promise.
- Monitor status changes of ePBS/FOCIL/LUCID in Glamsterdam/Hegotá.
- Assess whether Mantle needs a contingency design for role separation or multi-operator sequencing.

## Sources
- https://eips.ethereum.org/EIPS/eip-7732
- https://eips.ethereum.org/EIPS/eip-7805
- https://ethresear.ch/t/towards-attester-includer-separation/21306
- https://ethresear.ch/t/building-towards-multi-party-block-construction/24975
- https://ethresear.ch/t/trustless-payments-and-relays/25125
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-7773
- https://eips.ethereum.org/EIPS/eip-8081
