# Fable Review Fix Log

Review source:

`/Users/whisker/.codex/attachments/eee11dc1-9bab-4954-b86b-38e29e9357a0/pasted-text-1.txt`

## Accepted And Fixed

- Mantle P0: current Mantle framing was stale. Reports now describe Mantle as Ethereum blobs/calldata main DA plus OP Succinct/SP1 validity proofs, not EigenDA-first plus Ethereum blob fallback.
- Appendix B crosswalk: optional 2-of-3 proofs, mandatory 1-of-1 proofs, and Pureth purges were updated using the Strawmap link ledger and primary EIP sources.
- Horn: report 03 now separates Horn's full-validator-set BLS aggregation route from small heartbeat committee / trailing-finality routes.
- EIP-8142: report 10 now says Block-in-Blobs encodes transactions and BAL execution-payload data into blobs, not the full execution payload including header/withdrawals/execution requests.
- EIP-8094: report 08 now describes sidecar separation and versioned-hash blob fetch; sampling is attributed to EIP-8070.
- EIP-8070/8136/8159/8189 status: reports now treat these as Glamsterdam CFI networking items.
- Repricing coverage: report 07 and Appendix A now include EIP-7976/7981/8037 SFI, EIP-8038 CFI, and the 7976/7981 -> 8131 -> 8311 byte-floor sequence.
- State tree direction: report 12 now treats EIP-6800 Verkle, EIP-7736, EIP-7919, and EIP-7503 as Stagnant where relevant, and upgrades binary/hash-based state commitments as the stronger current direction.
- EIP-8250: report 13 now uses `(nonce_keys, nonce_seq)` with a shared sequence and strict key list, not per-key `(key, seq)` pairs.
- Baselines: Appendix A now includes 6/9 -> 10/15 -> 14/21 blob parameters and EIP-7935's 60M gas-limit baseline.

## Adjusted Or Downgraded

- Media-only claims about BPO3/BPO4 pausing and FOCIL politics were not made protocol-grade. The report now says later BPOs should depend on demand and telemetry, and uses EIP-7773/EIP-8081 as authoritative fork-meta evidence.
- The Block article cited in the review returned a Cloudflare challenge/403 in this environment, so it was not included as a report source.
- The previous `detailed-source-refresh.tsv` is now described as HTTP reachability evidence, not proof of every claim's correctness.

## Files Updated

- `INDEX.md`
- `SYNTHESIS.md`
- `README.md`
- `reports/01-fast-l1-confirmation-finality.md`
- `reports/02-block-production-censorship-resistance.md`
- `reports/03-validator-scale-issuance-lean-specs.md`
- `reports/04-consensus-resilience-pq-cl.md`
- `reports/05-peerdas-da-capacity.md`
- `reports/06-blob-propagation-custody-streaming.md`
- `reports/07-resource-pricing-fees-futures.md`
- `reports/08-gigagas-l1-p2p-throughput.md`
- `reports/09-bals-explicit-state-access.md`
- `reports/10-proof-heavy-execution-native-rollups.md`
- `reports/12-state-growth-statelessness-purges.md`
- `reports/13-frame-transactions-account-auth.md`
- `reports/14-private-l1-encrypted-mempool.md`
- `reports/A-fork-status-and-north-star-caveats.md`
- `reports/B-ambiguous-label-crosswalk.md`
- `evidence/claim-ledger.md`
- `evidence/source-ledger.md`
- `evidence/README.md`

## Pending Verification

After these edits, regenerate `REPORT_PACK.md`, `REPORT_PACK.html`, `REPORT_PACK.pdf`, and `evidence/REPORT_PACK-pdf.txt`; then refresh `evidence/verify-report.md`.
