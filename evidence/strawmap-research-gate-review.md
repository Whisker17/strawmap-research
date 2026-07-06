# Strawmap Research Gate Review

## recommendation

UNCONDITIONAL APPROVAL

## blockers

None.

## originalIntent

The user said the prior Ethereum Strawmap report was too high-level. They asked for a subagent planning step to group optimization points into standalone report directions, followed by multiple research subagents. The expected deliverable is a Mantle dev-team handoff pack: standalone reports or grouped directions, each explaining the bottleneck, how the item optimizes Ethereum, post-upgrade effect, and Mantle impact.

## desiredOutcome

A current, source-backed report pack for a Mantle researcher syncing to Mantle developers, with:

- recorded planning taxonomy;
- every planned direction covered as a standalone report;
- bottleneck, mechanism, future effect, dependencies/order, risks/open questions, Mantle impact, and action/monitoring recommendations in each numbered report;
- current/caveated status language as of 2026-07-06;
- ambiguous Strawmap labels treated as inferred/unresolved rather than canonical protocol names;
- Mantle implications framed as operational recommendations/inferences, not official Mantle commitments;
- rendered Markdown/HTML/PDF artifacts and verification ledgers.

## userOutcomeReview

The current artifact set satisfies the requested outcome. The planning digest records a planner-produced 14-report plus 2-appendix grouping, and the expansion log records wave-1 subagents for all 14 planned directions plus wave-2 subagents for status freshness, ambiguous labels, Mantle impact, and proof/native-rollup fault-line work.

The final deliverable includes all planned directions in `.omo/ulw-research/20260706-101026/reports/`: reports 01-14 plus appendices A and B. The combined pack, HTML, PDF, and extracted PDF text exist. The rendered PDF text contains key headings and Mantle sections, allowing for Markdown heading markers being stripped during extraction.

I directly read representative reports across the required categories:

- Consensus: `reports/04-consensus-resilience-pq-cl.md`
- DA: `reports/05-peerdas-da-capacity.md`
- Execution/proof: `reports/10-proof-heavy-execution-native-rollups.md`
- State/account/privacy: `reports/12-state-growth-statelessness-purges.md`, `reports/13-frame-transactions-account-auth.md`, `reports/14-private-l1-encrypted-mempool.md`
- Appendix/status/crosswalk: `reports/A-fork-status-and-north-star-caveats.md`, `reports/B-ambiguous-label-crosswalk.md`

These reports are not merely high-level: they include per-item tables for bottleneck/mechanism/effect, then separate narrative sections for current bottleneck, mechanism, future effect, dependency ordering, risks, Mantle impact, and Mantle monitoring/action items. The Mantle material is concrete enough for dev-team sync: DA fallback runbooks, EigenDA/blob/mixed DA cost modeling, prover key/verifier routing, native-rollup compatibility checks, state/archive/prover-input SLOs, mempool validation policy, and privacy/fair-sequencing boundary language.

Status-sensitive claims are caveated correctly in the pack and appendices. Direct spot checks against primary sources confirmed the report's treatment of the high-risk status items: EIP-7594 PeerDAS is Final; BPO1/BPO2 are Final EIPs; EIP-7732/EIP-7928 are Glamsterdam scheduled via the Glamsterdam meta; EIP-7805 is Hegotá scheduled while EIP-8141 is only Hegotá considered; EIP-8184 is Draft and not fork-scheduled; EIP-7938 is Stagnant. The report pack repeatedly states Strawmap is draft/strawman, not a committed release schedule, and Appendix B classifies ambiguous labels such as `snail issuance`, `leanDA`, `PQ leanDA`, `partial binary tree`, `optional 2-of-3 proofs`, and `mandatory 1-of-1 proofs` as inferred or unresolved where appropriate.

Mantle-specific claims do not overstate official commitments. The pack distinguishes public Mantle facts, such as EigenDA use, AA material, fair sequencing research, and SP1/OP Succinct direction, from recommendations and implications. It uses "should", "needs to evaluate", and "watch/monitor" language for operational suggestions rather than asserting Mantle has committed to those roadmap actions.

## checkedArtifactPaths

- `.omo/ulw-research/20260706-101026/notepad.md`
- `.omo/ulw-research/20260706-101026/expansion-log.md`
- `.omo/ulw-research/20260706-101026/wave-0-plan-report-pack.md`
- `.omo/ulw-research/20260706-101026/reports/01-fast-l1-confirmation-finality.md`
- `.omo/ulw-research/20260706-101026/reports/02-block-production-censorship-resistance.md`
- `.omo/ulw-research/20260706-101026/reports/03-validator-scale-issuance-lean-specs.md`
- `.omo/ulw-research/20260706-101026/reports/04-consensus-resilience-pq-cl.md`
- `.omo/ulw-research/20260706-101026/reports/05-peerdas-da-capacity.md`
- `.omo/ulw-research/20260706-101026/reports/06-blob-propagation-custody-streaming.md`
- `.omo/ulw-research/20260706-101026/reports/07-resource-pricing-fees-futures.md`
- `.omo/ulw-research/20260706-101026/reports/08-gigagas-l1-p2p-throughput.md`
- `.omo/ulw-research/20260706-101026/reports/09-bals-explicit-state-access.md`
- `.omo/ulw-research/20260706-101026/reports/10-proof-heavy-execution-native-rollups.md`
- `.omo/ulw-research/20260706-101026/reports/11-evm-hardening-proving-substrates.md`
- `.omo/ulw-research/20260706-101026/reports/12-state-growth-statelessness-purges.md`
- `.omo/ulw-research/20260706-101026/reports/13-frame-transactions-account-auth.md`
- `.omo/ulw-research/20260706-101026/reports/14-private-l1-encrypted-mempool.md`
- `.omo/ulw-research/20260706-101026/reports/A-fork-status-and-north-star-caveats.md`
- `.omo/ulw-research/20260706-101026/reports/B-ambiguous-label-crosswalk.md`
- `.omo/ulw-research/20260706-101026/REPORT_PACK.md`
- `.omo/ulw-research/20260706-101026/REPORT_PACK.html`
- `.omo/ulw-research/20260706-101026/REPORT_PACK.pdf`
- `.omo/ulw-research/20260706-101026/REPORT_PACK-pdf.txt`
- `.omo/ulw-research/20260706-101026/source-ledger.md`
- `.omo/ulw-research/20260706-101026/claim-ledger.md`
- `.omo/ulw-research/20260706-101026/verify-report.md`
- `.omo/ulw-research/20260706-101026/evidence/structure-source-check.txt`
- `.omo/ulw-research/20260706-101026/evidence/detailed-source-refresh.tsv`

## directChecks

- Planning coverage: `wave-0-plan-report-pack.md` records 14 report directions plus appendices A/B, and `expansion-log.md` records matching wave-1 research agents for R1-R14.
- Report inventory: 14 numbered report files and 2 appendix files are present.
- Required headings: all 14 numbered reports contain `当前瓶颈`, `优化机制`, `未来效果`, `依赖与先后关系`, `风险与未决问题`, `对 Mantle 的影响`, `建议 Mantle 关注`, and `Sources`.
- Depth check: numbered reports are roughly 350-456 words each, include 6-8 row optimization tables, 9-17 URL citations per report, and Mantle action bullets.
- Render check: `REPORT_PACK.md`, `REPORT_PACK.html`, `REPORT_PACK.pdf`, and `REPORT_PACK-pdf.txt` exist; extracted PDF text contains Fast L1, PeerDAS, Proof-Heavy, Frame Transactions, Private L1, Appendix B, and Mantle references.
- Source refresh: `detailed-source-refresh.tsv` records 115 refreshed source URLs, all HTTP 200. The older `source-refresh-status.tsv` contains one preliminary `000ERR`, but the later detailed refresh supersedes it and shows the referenced class of source reachable.
- Status check: `claim-ledger.md`, Appendix A, and direct primary-source spot checks support the high-risk fork/EIP caveats.
- Ambiguous-label check: Appendix B provides the controlling crosswalk and does not falsely canonicalize unresolved Strawmap labels.

## removeAiSlopsAndProgrammingPass

`omo:remove-ai-slops` and `omo:programming` were consulted before approval. This is a research-artifact gate, not a production-code diff, so there are no changed source files, test files, implementation abstractions, deleted tests, or type-system escape hatches to inspect.

The analogous slop risks were false confidence from count-only verification, tautological coverage, over-broad source claims, stale status language, and generic Mantle implications. My direct pass did not find unresolved slop:

- Verification is not only count-based; I inspected representative reports and checked high-risk claims against ledgers and primary sources.
- The structure check is useful but not the sole basis for approval.
- The report does not add speculative formal taxonomy beyond the planner's grouping.
- Mantle recommendations are operational and caveated as implications.
- Ambiguous labels are classified rather than normalized into fake canonical protocol names.

## exactEvidenceGaps

None blocking. There is no separate code diff, test suite, or code-review report because the deliverable is a research report pack rather than a code change. The reviewed evidence consists of the planning digest, expansion log, report files, rendered artifacts, source ledger, claim ledger, verification report, source-refresh TSV, and direct report/source spot checks. The only discrepancy found is non-blocking: an early refresh file records one transient URL error, while the final detailed refresh covers 115 unique URLs with all HTTP 200.
