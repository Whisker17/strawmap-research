# Verify Report: Detailed Strawmap Report Pack

Verification date: 2026-07-06

## Artifact Inventory

- Numbered standalone reports: 14
- Appendices: 2
- Combined Markdown: `REPORT_PACK.md` (104973 bytes)
- HTML: `REPORT_PACK.html` (124870 bytes)
- PDF: `REPORT_PACK.pdf` (458850 bytes)
- PDF text: `evidence/REPORT_PACK-pdf.txt` (97718 bytes)
- Source ledger: `evidence/source-ledger.md`
- Claim ledger: `evidence/claim-ledger.md`
- Fable fix log: `evidence/fable-review-fix-log.md`

## Structure Checks

- Required section errors: 0
- Report files missing from pack: 0
- Inline URL references across numbered reports: 233
- Current unique URLs in reports/index/README/claim ledger: 122
- Source ledger total: 122
- Source ledger missing URLs: 0

## Source Reachability

Current refresh output:

- `evidence/source-refresh-current.tsv`
- Checked URLs: 122
- OK: 120
- Restricted: 2
- Bad: 0

Restricted URLs:

- `https://docs.google.com/document/d/e/2PACX-1vRtpbntq45GCTG3srzetWDkjsF1d-60iXL1rVeumnJW-Gbm343oV5Xvm3O6rALKJjXgr4mpL1a0uT4t/pub` returned 401; it is retained as an official Strawmap-linked but inaccessible source.
- `https://thedefiant.io/news/blockchains/ethereum-glamsterdam-final-devnet-200m-gas-limit-target` returned 403 in this environment; it is treated as restricted external reporting, not protocol-grade evidence.

## Fable Review Fix Checks

- Mantle DA/proof P0 corrected: reports now use Ethereum blobs/calldata main DA plus OP Succinct/SP1 validity proofs, not the old external-DA-first fallback framing.
- Appendix B corrected: optional 2-of-3 proofs, mandatory 1-of-1 proofs, and Pureth purges are no longer unresolved/likely-corruption entries.
- Horn corrected: report 03 separates full-validator-set BLS aggregation from small heartbeat committee/trailing-finality routes.
- EIP-8142 corrected: report 10 says transactions and BAL execution-payload data go into blobs, not the full execution payload.
- EIP-8094 corrected: report 08 assigns sidecar/vhash RBF behavior to 8094 and sampling to 8070.
- EIP-8250 corrected: report 13 uses `(nonce_keys, nonce_seq)` with shared sequence and strict key list.
- Glamsterdam repricing coverage added: 7976/7981/8037 SFI and 8038 CFI are covered in report 07 and Appendix A.
- State-tree status corrected: Verkle/state-expiry/Pureth stale EIPs are marked Stagnant where relevant; binary/hash-based state commitments are the stronger current direction.

## Manual QA Surfaces

- Data surface: parsed all Markdown reports and checked required headings plus URL citations. PASS.
- Artifact surface: regenerated `REPORT_PACK.md`, `REPORT_PACK.html`, `REPORT_PACK.pdf`; extracted `evidence/REPORT_PACK-pdf.txt` and found Mantle, PeerDAS, OP Succinct, Appendix B, EIP-7976, EIP-8250, and 60M references. PASS.
- Source surface: refreshed 122 unique URLs with curl; 120 OK, 2 restricted, 0 bad. PASS with caveat.

## Residual Caveats

- Some Mantle implications are explicit inferences from Mantle public docs, Succinct, L2Beat, and Ethereum sources; reports label them as recommendations/implications, not Mantle official commitments.
- Strawmap remains a draft/strawman roadmap rather than a committed release schedule.
- Some Strawmap labels remain inferred/unresolved; Appendix B is the controlling crosswalk.
