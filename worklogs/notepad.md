# Strawmap Detailed Report Expansion Notepad

## Bootstrap

Tier: HEAVY. Justification: user explicitly invoked omo:ulw-research and requested subagent planning plus multiple research agents for detailed per-optimization reports.

Core question: Expand the previous Ethereum Strawmap report into a series of standalone detailed reports, grouping related optimization points where appropriate, each covering bottleneck, optimization mechanism, post-upgrade effect, and Mantle impact.

Axes:
1. Planning taxonomy: decide how many standalone reports and which optimization points belong together.
2. Consensus latency/inclusion/security reports: fast slots/finality/ePBS/FOCIL/inclusion lists/validator scaling/security recovery/PQ consensus.
3. Data availability and blob economics reports: PeerDAS/full DAS/2D DAS/blob gas targets/BPO/blob pricing/DA proofs/futures.
4. Execution scaling/proving/state reports: gas limit/RISC-V or zkVM/EOF/precompiles/state expiry/statelessness/native rollups.
5. Privacy/account/user-interface reports: private transfers/private reads/AA/key management/preconfirmations/interop.
6. Mantle translation layer: DA cost/settlement/prover/sequencer/bridge/product implications.

Codebase relevant: no. External: yes. Browsing: yes. Verification likely: yes, via source-link checks, citation checks, PDF text extraction, and consistency scripts. Final material format: Markdown report pack plus HTML/PDF index.

Skills surveyed:
- omo:ulw-research: selected because user explicitly invoked it and asked for exhaustive research orchestration.
- omo:teammode: relevant for teams, but user specifically requested subagents; Codex native subagents are available and sufficient.
- research/learn/read: relevant in principle, skipped because ulw-research is the stricter active workflow.

Success criteria:
1. Planning agent returns a concrete grouping plan with report count, report titles, included optimization points, and rationale.
2. Every group in the approved working plan has a standalone report covering bottleneck, optimization mechanism, future effect, dependencies, risks/open questions, and Mantle impact.
3. Each standalone report has citations to primary or high-quality sources and notes unresolved Strawmap labels rather than pretending certainty.
4. A top-level index explains how the standalone reports connect and how to read them as an Ethereum roadmap narrative.
5. Verification confirms source-reference integrity, coverage of planned groups, rendered HTML/PDF outputs, and reviewer unconditional approval.

Manual QA scenarios:
- Data surface: parse generated Markdown reports and verify every report has required sections and citations; PASS if no missing required sections and source IDs resolve.
- Artifact surface: render index/report pack to HTML/PDF and run pdftotext; PASS if key headings and report links/titles survive extraction.
- Reviewer surface: independent gate reviewer audits the pack against the user request; PASS only on UNCONDITIONAL APPROVAL.

## Progress
- Session initialized: .omo/ulw-research/20260706-101026
- Source refresh completed for 59 previous-ledger URLs; one timeout/000ERR observed for Ethereum Magicians RISC-V thread and will be rechecked or caveated.
- Rechecked the prior timeout source successfully with HTTP 200.
- Completed 14 standalone reports + 2 appendices in `reports/`.
- Generated `INDEX.md`, `SYNTHESIS.md`, `REPORT_PACK.md`, `REPORT_PACK.html`, `REPORT_PACK.pdf`, `source-ledger.md`, `claim-ledger.md`, and `verify-report.md`.
- Verification summary: 14 numbered reports, 2 appendices, 0 missing required sections, 0 PDF title misses, 115 unique source URLs refreshed with `bad_urls 0`.
- First gate reviewer returned `APPROVE`, which is positive but not the required exact ULW verdict string; resubmitted the same evidence for an explicit `UNCONDITIONAL APPROVAL` verdict.
- Final strict gate reviewer returned **UNCONDITIONAL APPROVAL** and wrote the gate artifact to `.omo/evidence/strawmap-research-gate-review.md`.
