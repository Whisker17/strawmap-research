# EIP wave 2 research

## EIP-8142: Block-in-Blobs (BiB)

- Official spec: https://eips.ethereum.org/EIPS/eip-8142
- Magicians thread: https://ethereum-magicians.org/t/eip-8142-block-in-blobs-bib/27621

### Mechanism

- BiB requires execution-payload data, specifically transactions and `blockAccessList`, to be published in blobs in the same beacon block that carries the payload header.
- The execution layer adds `payload_blob_count` to the execution payload header, computes payload blobs during `engine_getPayload`, and verifies the expected payload blob count and versioned hashes during `engine_newPayload`.
- The consensus layer uses `payload_blob_count` to interpret the ordering of blob commitments and otherwise reuses existing blob DA and networking rules.

### Dependencies

- Requires EIP-4844, EIP-7594, EIP-7732, EIP-7892, and EIP-7928.
- Reuses existing blob networking and KZG proof machinery.

### Risks

- Blob congestion / DoS: payload blobs consume blob gas, so large payloads are bounded by blob limits, but they can still increase blob base fee.
- Data withholding: the design is specifically meant to prevent withholding execution payload data once proofs replace re-execution.
- Fork risk: nodes that do not implement BiB cannot validate post-activation blocks.

### Layer mapping

- Execution layer: header change, Engine API changes, STF changes.
- Consensus layer: blob ordering / validation interpretation, no new blob-specific validation beyond 4844 / 7594.
- Networking: unchanged blob transport.

### Strawmap connection

- Mandatory proofs: this is the DA complement when zkEVM proofs become mandatory.
- Native rollups / zkEVM: directly aligned; BiB preserves DA once validators stop downloading full payloads.
- Mandatory proofs plus DA: payload availability is enforced by blob commitments, not by re-execution.

## EIP-8272: Recent Roots for Frame Transactions

- Official spec: https://eips.ethereum.org/EIPS/eip-8272
- Magicians thread: https://ethereum-magicians.org/t/eip-8272-recent-roots-for-frame-transactions/28621

### Mechanism

- Extends the EIP-8141 frame transaction payload with `recent_root_references = [[source_id, slot, root], ...]`.
- Each reference is checked before frame execution against the node’s current head.
- `TXPARAM` / `RECENTROOTREFLOAD` expose verified references to validation code after the pre-execution check.

### Dependencies

- Requires EIP-7843 and EIP-8141.
- The root source is a system-contract-backed write path keyed by `(source_id, slot)`.

### Risks

- The spec treats `root` as opaque; applications must bind `(source_id, slot, root)` themselves in validation logic.
- Inclusion is not guaranteed: apps that depend on timely root publication need their own publication path or redundant root sources.
- Mempool churn risk: nodes should reject or evict transactions when references fall outside the recent-root window.

### Layer mapping

- Protocol validation / mempool: recent roots are checked before validation runs and are visible only through introspection.
- Application state: privacy tree roots, wallet authorization roots, and account validation roots are the intended use cases.

### Strawmap connection

- Recent roots: this is the direct interface for recent-root commitments.
- Mandatory proofs: can bind proofs to the verified tuple instead of arbitrary mutable storage reads.
- Privacy mempool: lets public mempool validation avoid reading arbitrary mutable state.

## EIP-8141: Frame Transaction

- Official spec: https://eips.ethereum.org/EIPS/eip-8141
- Magicians thread: https://ethereum-magicians.org/t/eip-8141-frame-transaction/27617

### Mechanism

- Introduces a new EIP-2718 transaction type `0x06`.
- Payload fields are `chain_id, nonce, sender, frames, signatures, max_priority_fee_per_gas, max_fee_per_gas, max_fee_per_blob_gas, blob_versioned_hashes`.
- Frames are `[mode, flags, target, gas_limit, value, data]`.
- The protocol adds `APPROVE` for validating sender / payer, plus introspection opcodes `TXPARAM`, `FRAMEDATALOAD`, `FRAMEDATACOPY`, `FRAMEPARAM`, and `SIGPARAM`.
- The mempool only propagates transactions whose validation prefix depends on constrained, inspectable state.

### Dependencies

- Requires EIP-1559, EIP-2718, EIP-3607, EIP-4844, EIP-7623, and EIP-7702.
- The design is explicitly built around existing blob-fee logic and account-delegation context.

### Risks

- Mempool DoS: arbitrary EVM validation can be used to force repeated tracing and later invalidation.
- Shared-state invalidation: a single state write can invalidate many pending transactions.
- Deploy-frame front-running: deterministic deploy frames can be preempted if code is already present at `tx.sender`.
- `ORIGIN` semantics change for frame transactions, so contracts relying on `ORIGIN == CALLER` can behave differently.

### Layer mapping

- Execution layer: new tx type, new opcodes, changed `ORIGIN` behavior.
- Public mempool: validation-prefix rules are central to propagation safety.
- UX / AA: native batching, gas sponsorship, key rotation, and post-quantum-friendly auth model.

### Strawmap connection

- Frame transactions: this is the primary interface.
- Keyed nonces: adjacent but not natively specified here; the model still centers on explicit sender / payer approval and transaction nonce handling.
- Privacy / sponsored execution: the validation-prefix model is what lets frame transactions coexist with the public mempool.

## EIP-8184: LUCID encrypted mempool

- Official spec: https://eips.ethereum.org/EIPS/eip-8184
- Magicians thread: https://ethereum-magicians.org/t/eip-8184-lucid-encrypted-mempool/28017

### Mechanism

- Carries encrypted transactions through Ethereum’s public inclusion pipeline while keeping contents hidden until after the scheduling decision is fixed.
- The core object is a sealed transaction: a signed ticket transaction plus an off-chain ciphertext envelope.
- Builders commit first, keys are released later, and decrypted transactions execute after that fixed point.
- The spec extends inclusion lists with sealed transactions and sealed bundles, and adds engine / beacon RPC paths for inclusion-list and key propagation.

### Dependencies

- Requires EIP-2718 and EIP-7805.
- The spec explicitly avoids enshrining one encryption scheme; it keeps decryption off-protocol and allows trustless self-decryption or other schemes.

### Risks

- Reveal optionality / free-option risk: if users can withhold reveal or decryption, they can convert the transaction into a conditional bet.
- DoS risk: low-fee or low-commitment sealed transactions can be spam vectors.
- Trust risk: users and wallets must treat key-publisher choice as a security decision.
- Key reuse risk: the DEM uses ChaCha20-Poly1305 and the protocol-defined nonce must not be reused with the same key.

### Layer mapping

- Consensus + execution: hard-fork changes to block validity rules, `ExecutionPayloadBid`, `ExecutionPayload`, `InclusionList`, Engine API, beacon-chain RPC, and P2P handling.
- Inclusion pipeline: commit-before-reveal, then decrypt and execute after the scheduling decision.

### Strawmap connection

- Encrypted / privacy mempool: this is the direct interface.
- Mandatory proofs: less direct than BiB, but the same high-level goal is to keep sensitive order flow private until inclusion is fixed.
- Native rollups / zkEVM: relevant only indirectly via privacy-preserving transaction flow, not execution correctness.

## Cross-cutting synthesis

- `8141` supplies the programmable transaction envelope.
- `8272` adds a safe way to bind recent mutable roots into that envelope without letting validation read arbitrary third-party storage.
- `8184` adds a privacy-preserving transport and reveal flow for the public mempool.
- `8142` closes the DA gap that appears once zkEVM proofs make re-execution optional.

## Discussion objections to carry forward

- `8141`: Magicians discussion raises mempool DoS, state-churn invalidation, deploy-frame front-running, and compatibility concerns around legacy smart accounts and `ORIGIN`.
- `8184`: Magicians discussion raises reveal optionality, spam/DoS, trust assumptions around key publishers, and fee-accounting edge cases.
- `8272`: the main caveat is that applications still need to bind the root tuple themselves; consensus only checks that a recent root exists.

