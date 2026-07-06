# Verification Evidence

## Surface: Strawmap HTTP / artifact extraction

- `curl -L -sS -D strawmap.headers.txt https://strawmap.org/ -o strawmap.html`
- Result: HTTP/2 200, `content-type: text/html`, 16,929 bytes.
- Extracted Google Drawing iframe: `https://docs.google.com/drawings/d/1GkcGfQv9kxgrYQMyu0BYGcZya0gIDG_wQ7GsFJEsdzY/preview`.
- Exported drawing:
  - `strawmap.svg`: 2,213,181 bytes.
  - `strawmap.pdf`: 239,409 bytes.
  - `strawmap.png`: 518,984 bytes, 2500 x 1906.
- Extracted clean outbound link inventory: 43 unique non-data URLs.

## Surface: Linked sources

- Local bulk fetch wrote `sources-fetch-index.json`.
- Non-X links fetched successfully except the Google published doc link, which returned HTTP 401 locally and was excluded from claims.
- Key source examples:
  - `fastconfirm.it`: HTTP/2 200.
  - EIP-7773: HTTP/2 200.
  - EIP-8081: HTTP/2 200.
  - EIP-7732: HTTP/2 200.
  - EIP-7805: HTTP/2 200.
  - EIP-7928: HTTP/2 200.
  - EIP-8184: HTTP/2 200.

## Surface: Report render

- Markdown source: `REPORT.md`, 30 KB.
- HTML render: `REPORT.html`, 35 KB.
- PDF render: `REPORT.pdf`, 312 KB.
- Renderer invocation: `uv run --with markdown --with weasyprint python ...`.
- PDF text extraction: `pdftotext REPORT.pdf REPORT-pdf.txt`.
- Key headings found in PDF text:
  - `Ethereum L1 Strawmap 研究报告`.
  - `共识层优化点`.
  - `数据层优化点`.
  - `执行层优化点`.
  - `Mantle dev team`.
  - `Sources`.

## Citation/completeness check

Script result:

```text
refs ['1', '2', ..., '46']
defs ['1', '2', ..., '46']
missing []
unused []
共识层优化点 OK
数据层优化点 OK
执行层优化点 OK
Mantle dev team OK
主要不确定性 OK
Sources OK
Fast confirmation OK
Quick slots OK
ePBS OK
FOCIL OK
PeerDAS OK
Sparse blobpool OK
Cell-level deltas OK
Blob streaming OK
BALs OK
Gas limit increases OK
Frame transactions OK
Encrypted / privacy mempool OK
Native rollups OK
EVMify OK
VOPS OK
```

## Semantic checks added after gate rejection

The gate reviewer rejected the first draft because the verification only checked shallow citation syntax. The second pass added semantic checks for the specific failure modes:

```text
missing_refs []
unused_defs []
uncited_or_unmarked_rows 0
51% attack auto-recovery OK
sharded mempool OK
PQ leanSPHINCS transactions OK
lean privacy wormholes OK
Snail issuance OK
VDF randomness OK
Secret proposers OK
Long-dated gas futures OK
Glamsterdam repricing / EIP-8007 OK
EIP-8007 S47 OK
EIP-8272 S30 OK
EIP-8131 S21 OK
EIP-8279 S22 OK
EIP-8311 S23 OK
```

Additional source evidence:

- `final-source-ledger.md` and `final-source-ledger.json` enumerate all 59 final-report sources.
- All final-report source URLs returned HTTP 200 in the final ledger pass, except `S41` which returned HTTP 301 because `leanEthereum/leanMultisig` redirects to leanVM; that redirect was already described in the research journal.
- Raw EIP sources now include exact URLs for `S21`, `S22`, and `S23`.
- `EIP-8007` is now source `S47`, correcting the earlier incorrect `S30` citation.

## Semantic checks after second gate rejection

The second gate rejection found consensus source-ID drift. The report now adds CL-specific final sources:

- `S56` Towards Attester-Includer Separation.
- `S57` Unblocking faster finality with decoupled consensus.
- `S58` Horn signature collection for faster finality.
- `S59` LMD GHOST with 256 validators and fast-following finality gadget.

Row/source-intent check:

```text
refs_count 59 defs_count 59
missing_refs []
unused_defs []
uncited_or_unmarked_rows []
source_intent_checks 8 failures 0
98 attester/includer OK
100 decoupled consensus OK
101 1M attestations OK
137 attester/includer OK
139 decoupled consensus OK
140 1M attestations OK
293 decoupled consensus OK
36 consensus paragraph OK
```

## Cleanup

- No dev server was started.
- No tmux/browser sessions were left open.
