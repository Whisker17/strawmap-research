# Strawmap Ethereum Roadmap Research Notepad

## Bootstrap

Tier: HEAVY. Justification: external due-diligence research for Mantle dev team across consensus, data, and execution roadmap layers; user explicitly invoked `omo:ulw-research`.

Skills surveyed:
- `omo:ulw-research`: selected; user explicitly invoked exhaustive research.
- `omo:ultimate-browsing`: reserved for blocked/dynamic pages such as `strawmap.org` if plain fetch is insufficient.
- `omo:teammode`: relevant in principle, but Codex native subagents are available and sufficient for independent research axes.
- `research` / `learn`: relevant descriptions, skipped because `omo:ulw-research` is stricter and already active.
- `read`: relevant for URL reading, but web/browser tools and subagent librarian roles cover source retrieval.

Core question: Explain EF's Strawmap Ethereum roadmap for a Mantle researcher: every optimization point, its mechanism, bottleneck, expected impact, layer taxonomy, and dependencies/order between features.

Axes:
1. Strawmap inventory and taxonomy: enumerate every roadmap item and linked source from `https://strawmap.org/`.
2. Consensus-layer roadmap: slots/finality, SSF, EIP-7251, DAS-adjacent consensus duties, validator set scaling.
3. Data layer roadmap: blobs, PeerDAS, full DAS, PeerDAS/2D sampling, EIP-4844 follow-ons, L2 DA implications.
4. Execution layer roadmap: EOF, statelessness/Verkle, gas limit/scaling, EVM/object-format changes, account abstraction if present.
5. Cross-layer dependency graph: which features unlock or constrain later features.
6. Mantle-specific implications: L2 cost, DA strategy, sequencer/prover/operator assumptions, risks.
7. Skeptic/reviewer lens: claims needing stronger evidence, contradictions, missing links, and overclaim risk.

Codebase relevant: no.
External: yes.
Browsing: yes.
Verification likely: yes, via source cross-check and link extraction; no production code changes.
Final material format: HTML/PDF default plus Markdown synthesis.

Success criteria:
1. Every Strawmap-linked roadmap item is covered or explicitly marked out of scope/unavailable.
2. Each covered item has bottleneck, mechanism, layer, dependencies, expected impact, and Mantle relevance.
3. At least two expansion waves are run; leads are closed or marked unresolved.
4. High-risk dated/numeric claims are backed by primary sources and at least one counter-search, or omitted/unresolved.
5. Final report has inline citations and a source list.
6. Reviewer gate gives unconditional approval.

Manual QA scenarios:
- HTTP surface: `curl -L -sS https://strawmap.org/` must return HTML/JS containing roadmap data or asset references; PASS if status 200 and roadmap data/link extraction path is identified.
- Report surface: parse generated Markdown for every source marker and roadmap item; PASS if no missing citation markers and item checklist is complete.
- PDF/HTML surface: render generated report; PASS if output file exists, non-empty, and key headings/items are present.

## Progress

- Created session directory: `/Users/whisker/Work/research/work/strawmap-research/.omo/ulw-research/20260706-004216`.
- Completed saturation wave, expansion wave, claim ledger, synthesis, Markdown report, HTML render, and PDF render.
- Verification artifacts:
  - `REPORT.md`
  - `REPORT.html`
  - `REPORT.pdf`
  - `REPORT-pdf.txt`
  - `verify-report.md`

## Final status

- Reviewer gate returned **UNCONDITIONAL APPROVAL** in `.omo/evidence/strawmap-research-gate-review.md`.
- Final deliverables include `REPORT.md`, `REPORT.html`, `REPORT.pdf`, `REPORT-pdf.txt`, `SYNTHESIS.md`, `claim-ledger.md`, `final-source-ledger.md` / `.json`, and `verify-report.md`.
- Final semantic checks: 59 cited references / 59 source definitions, 61 optimization rows, no missing/unused report sources, no uncited or unmarked optimization rows, and `source_intent_checks 8 failures 0`.
