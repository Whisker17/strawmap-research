# 11 EVM Hardening and Proving Substrates

> Shared caveat: the Strawmap is an EF/community roadmap draft, not a committed release schedule. Timing and status judgments in this report are based on public sources as of 2026-07-06; north-star numbers are treated as directional targets, not committed parameters.

## Optimization Coverage
evm-asm canonical guest, state-asm / SAsm, zkzkRISC-V frames, LeanVM, leanSig, EVMify long-tail precompiles / EIP-8200, long-term RISC-V replacement.

## One-Page Conclusion
This group of workstreams addresses the complexity of the proving substrate: the EVM, precompiles, compiler trust, and zkVM guests all make proof-heavy execution hard to standardize. evm-asm takes the Lean-verified RISC-V guest route; LeanVM/leanSig take the hash-based, PQ-friendly zkVM/signature-aggregation route; EIP-8200 EVM-ifies precompile special cases; and the RISC-V proposal more radically considers replacing the execution substrate. Mantle already uses SP1/Kona and is naturally closer to a zkVM-aligned future, but it still needs to guard against precompile, gas semantics, and custom STF compatibility risks.

## Item-by-Item Breakdown
| Optimization | Bottleneck | How It Is Optimized | Future Effect |
|---|---|---|---|
| evm-asm canonical guest | High-level-language compilers sit outside the proof trust boundary | A Lean 4 verified macro-assembler generates the RISC-V guest directly. [evm-asm](https://github.com/Verified-zkEVM/evm-asm) | Shrinks the zkEVM guest TCB and raises correctness confidence |
| state-asm / SAsm | zkEVM guests have dynamic stack/dispatch, which is hard to prove | Static frames, named regions, finite indirect-call tables. [SAsm design](https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md) | Guest behavior becomes more static, boundable, and verifiable |
| LeanVM | PQ/hash-based proving must trade off proof size, throughput, and security | A minimal hash-based zkVM with WHIR/SuperSpartan/Logup. [leanVM](https://github.com/leanEthereum/leanVM) | Provides a substrate for PQ signatures/proofs, but parameters are still under research |
| leanSig | The state/epoch discipline of hash-based signatures is complex | A synchronized hash-based signature tuned for leanVM aggregation. [leanSig](https://github.com/leanEthereum/leanSig) | Provides a research path for PQ attestations/auth |
| EIP-8200 | Precompiles are special cases for clients and zkEVMs | Deploy equivalent EVM bytecode at the same addresses. [EIP-8200](https://eips.ethereum.org/EIPS/eip-8200) | Reduces consensus special cases, but gas/perf changes may break dependents |
| RISC-V replacement | EVM proving cost and execution-layer complexity are high | A dual-VM or RISC-V interpreter / direct RISC-V contracts. [RISC-V proposal](https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617) | Could drastically reduce prover glue, but compatibility and native execution performance risks are high |

## Current Bottleneck
A zkEVM is not just a matter of having a circuit. The real hard parts include EVM spec conformance, precompile special cases, compiler trust, the guest memory/stack model, the RISC-V/native performance gap, and PQ hash proof parameters.

## Optimization Mechanism
The route has three layers: first reduce special cases (EIP-8200), then make the guest more verifiable (evm-asm/SAsm), and finally consider whether the execution substrate should move from the EVM to a zkVM-friendly ISA of the RISC-V/LeanVM kind.

## Future Effect
Proof systems become more portable, precompile special cases shrink, the guest TCB gets smaller, and the PQ/hash-based proof stack becomes clearer. In the long term, if the RISC-V route advances, the application layer may face a new compatibility/migration boundary.

## Dependencies & Sequencing
This direction depends on the demand for proof-heavy execution and also serves PQ consensus/auth. EIP-8200 can advance relatively independently; evm-asm/LeanVM are research implementations; the RISC-V replacement is a long-term architecture discussion.

## Risks & Open Questions
evm-asm is explicitly experimental; leanVM/leanSig security parameters are not production-grade; EIP-8200 changes gas costs; RISC-V could cause an x86/ARM native execution regression; and the dual-VM/interpreter compatibility cost for old EVM contracts is very high.

## Impact on Mantle
Mantle's OP Succinct/SP1/Kona direction makes it easier to adapt to a zkVM-aligned prover stack. EIP-8200 may reduce the precompile proving burden; RISC-V may change long-term STF/prover portability. Mantle should include its precompile usage, custom gas token, and custom transaction path in a native/proving compatibility audit.

## Recommended Mantle Watchpoints
- Build an inventory of Mantle contracts/precompiles/prover compatibility.
- Track EIP-8200's impact on gas-sensitive contracts.
- Watch the security parameters and production readiness of evm-asm, LeanVM, and RISC-V.
- Make decoupling the STF from the prover machinery a long-term architecture principle.

## Sources
- https://github.com/Verified-zkEVM/evm-asm
- https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://eips.ethereum.org/EIPS/eip-8200
- https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617
- https://succinctlabs.github.io/op-succinct/
- https://blog.succinct.xyz/case-studies/mantle/
