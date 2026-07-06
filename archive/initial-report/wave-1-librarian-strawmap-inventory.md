# Wave 1 — Strawmap Inventory and Taxonomy

Worker: `019f332c-6dd4-7f12-b886-14084ac31562`

## Key Findings

- The worker built a normalized checklist from the landing page plus Google Drawing export and matched underlined links to cited EIPs/repos/forum threads.
- Five north stars:
  - fast L1 / finality in seconds
  - gigagas L1 / 1 Ggas/sec
  - teragas L2 / 1 Gbyte/sec
  - post quantum L1 / hash-based
  - private L1 / shielded transfers
- Main CL items include: fast confirmation, quick slots, ePBS, FOCIL, 1M attestations per slot, snail issuance, decoupled consensus, beacon/lean specs merge, post-quantum heartbeat, PQ pubkey registry, PQ leanXMSS attestations, real-time CL proofs, secret proposers.
- Main DL items include: sparse blobpool, cell-level deltas, data availability increases, local blob reconstruction, PQ leanDA sampling, blob streaming, proofs of custody, remove blob transaction type, short-dated blob futures, data repricing, multidimensional pricing.
- Main EL items include: gas limit increases, ethp2p broadcast/unification, evm-asm canonical guest, Glamsterdam repricing, BALs, optional/mandatory proofs, validity-only partial state, state-asm, EVMify precompiles, frame transactions, keyed nonces/recent roots, pureth purges, ephemeral keys, native rollups, sharded mempool, long-dated gas futures, decentralized/endgame state, zkzkRISC-V frames, PQ leanSPHINCS transactions, privacy/encrypted mempool.
- Ambiguous labels: `SFI`, `snail issuance`, `beacon & lean specs merge`, `specs quantum`, `short-dated blob futures`, `partial binary tree`, `long-dated gas futures`, `endgame state`, `lean privacy wormholes`.
- Google Drawing/PNG export succeeded; Google published doc link was not resolvable in worker environment and local curl returned HTTP 401.

## Sources

- https://strawmap.org/
- https://docs.google.com/drawings/d/1GkcGfQv9kxgrYQMyu0BYGcZya0gIDG_wQ7GsFJEsdzY/export/png
- https://fastconfirm.it/
- https://eips.ethereum.org/EIPS/eip-7732
- https://eips.ethereum.org/EIPS/eip-7805
- https://eips.ethereum.org/EIPS/eip-7928
- https://eips.ethereum.org/EIPS/eip-7938
- https://eips.ethereum.org/EIPS/eip-7999
- https://eips.ethereum.org/EIPS/eip-8007
- https://eips.ethereum.org/EIPS/eip-8025
- https://eips.ethereum.org/EIPS/eip-8070
- https://eips.ethereum.org/EIPS/eip-8079
- https://eips.ethereum.org/EIPS/eip-8141
- https://eips.ethereum.org/EIPS/eip-8142
- https://eips.ethereum.org/EIPS/eip-8184
- https://eips.ethereum.org/EIPS/eip-8198
- https://eips.ethereum.org/EIPS/eip-8200
- https://eips.ethereum.org/EIPS/eip-8250
- https://eips.ethereum.org/EIPS/eip-8272
- https://github.com/ethp2p/ethp2p
- https://github.com/Verified-zkEVM/evm-asm
- https://github.com/leanEthereum/leanMultisig
- https://hackmd.io/@gMH0wL_0Sr69C7I7inO8MQ/B125sCUtZx
- https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617

## EXPAND

- LEAD: unresolved/ambiguous label mapping — WHY: several boxes are concepts rather than exact EIP titles — ANGLE: use SVG coordinate extraction and source crosswalk; downgrade uncertain mappings.

## CLAIMS

- CLAIM: Strawmap FAQ names five north stars and says Glamsterdam headliners are ePBS and BALs — RISK: normal — SOURCES: Strawmap FAQ — COUNTER: local page export confirms FAQ text — PRIMARY: Strawmap.
- CLAIM: Several label-to-link mappings are likely but not definitive — RISK: high — SOURCES: drawing export and linked pages — COUNTER: mark as inferred in report — PRIMARY: drawing export.
