# 11 EVM Hardening 与 Proving Substrates

> 共同 caveat：Strawmap 是 EF/社区路线图草案，不是承诺型 release schedule。本文的时间与状态判断以 2026-07-06 的公开来源为准；north-star 数字按方向性目标处理，不按已承诺参数处理。

## 优化点覆盖
evm-asm canonical guest、state-asm / SAsm、zkzkRISC-V frames、LeanVM、leanSig、EVMify long-tail precompiles / EIP-8200、long-term RISC-V replacement。

## 一页结论
这组路线处理的是 proving substrate 的复杂性：EVM、precompiles、compiler trust 和 zkVM guest 都让 proof-heavy execution 难以标准化。evm-asm 走 Lean-verified RISC-V guest；LeanVM/leanSig 走 hash-based PQ-friendly zkVM/signature aggregation；EIP-8200 把 precompile 特例 EVM 化；RISC-V proposal 则更激进地考虑替换执行 substrate。Mantle 已经使用 SP1/Kona，天然更接近 zkVM-aligned future，但仍需防 precompile、gas semantics、custom STF 兼容风险。

## 逐项拆解
| 优化点 | 瓶颈是什么 | 怎么优化 | 未来效果 |
|---|---|---|---|
| evm-asm canonical guest | 高级语言编译器在 proof trust boundary 外 | Lean 4 verified macro-assembler 直接生成 RISC-V guest。[evm-asm](https://github.com/Verified-zkEVM/evm-asm) | 降低 zkEVM guest TCB，提高 correctness 信心 |
| state-asm / SAsm | zkEVM guest 有动态 stack/dispatch，难证明 | static frames、named regions、finite indirect-call tables。[SAsm design](https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md) | guest 行为更静态、可界定、可验证 |
| LeanVM | PQ/hash-based proving 需在 proof size、throughput、安全间折中 | minimal hash-based zkVM with WHIR/SuperSpartan/Logup。[leanVM](https://github.com/leanEthereum/leanVM) | 为 PQ signatures/proofs 提供 substrate，但参数仍研究中 |
| leanSig | hash-based signatures state/epoch discipline 复杂 | synchronized hash-based signature tuned for leanVM aggregation。[leanSig](https://github.com/leanEthereum/leanSig) | 为 PQ attestations/auth 提供研究路径 |
| EIP-8200 | precompiles 是 client 与 zkEVM special cases | 在相同地址部署等价 EVM bytecode。[EIP-8200](https://eips.ethereum.org/EIPS/eip-8200) | 减少共识特例，但 gas/perf 改变可能破坏依赖 |
| RISC-V replacement | EVM proving 成本和执行层复杂度高 | dual-VM 或 RISC-V interpreter / direct RISC-V contracts。[RISC-V proposal](https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617) | 可能大幅降低 prover glue，但兼容性和 native 执行性能风险高 |

## 当前瓶颈
zkEVM 不是只要有 circuit 就行。真正难点包括 EVM spec conformance、precompile special cases、compiler trust、guest memory/stack model、RISC-V/native performance gap、PQ hash proof 参数。

## 优化机制
路线分为三层：先减少特例（EIP-8200），再让 guest 更可验证（evm-asm/SAsm），最后考虑执行 substrate 是否从 EVM 走向 RISC-V/LeanVM 类 zkVM-friendly ISA。

## 未来效果
证明系统可移植性更好，precompile 特例减少，guest TCB 更小，PQ/hash-based proof stack 更清晰。长期若 RISC-V 路线推进，应用层可能面对新的兼容/迁移边界。

## 依赖与先后关系
本方向依赖 proof-heavy execution 需求，也服务 PQ consensus/auth。EIP-8200 可较独立推进；evm-asm/LeanVM 是研究实现；RISC-V replacement 是长期架构讨论。

## 风险与未决问题
evm-asm 明确 experimental；leanVM/leanSig security parameters 未 production-grade；EIP-8200 会改变 gas 成本；RISC-V 可能导致 x86/ARM native execution regression；old EVM contracts 的 dual-VM/interpreter 兼容成本很高。

## 对 Mantle 的影响
Mantle 的 OP Succinct/SP1/Kona 方向使其更容易适配 zkVM-aligned prover stack。EIP-8200 可能降低 precompile proof 负担；RISC-V 则可能改变长期 STF/prover portability。Mantle 应把 precompile 使用、custom gas token、custom transaction path 纳入 native/proving compatibility audit。

## 建议 Mantle 关注
- 建立 Mantle contracts/precompiles/prover compatibility inventory。
- 跟踪 EIP-8200 对 gas-sensitive contracts 的影响。
- 关注 evm-asm、LeanVM、RISC-V 的 security parameter 和 production readiness。
- 将 STF 与 prover machinery 解耦成长期架构原则。

## Sources
- https://github.com/Verified-zkEVM/evm-asm
- https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md
- https://github.com/leanEthereum/leanVM
- https://github.com/leanEthereum/leanSig
- https://eips.ethereum.org/EIPS/eip-8200
- https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617
- https://succinctlabs.github.io/op-succinct/
- https://blog.succinct.xyz/case-studies/mantle/
