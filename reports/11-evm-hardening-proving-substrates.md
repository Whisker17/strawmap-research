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

## 深入机制拆解
### evm-asm / SAsm：把 zkEVM guest 的可信边界往下压
- 当前 zkEVM guest 往往由高级语言、编译器、runtime glue 和 hand-written patches 组成；这些组件不一定都在形式化证明边界内。
- evm-asm 尝试用 Lean 4 verified macro-assembler 直接生成 RISC-V guest，让 EVM semantics 到 zkVM guest 的路径更短、更可审计。
- SAsm 进一步限制动态行为：static frames、named regions、finite indirect-call tables 让栈、跳转和内存区域更容易被证明系统约束。

### EIP-8200：先消除 precompile 特例
- Precompile 是 EVM 里的特殊共识路径：client 直接实现，gas 与行为需要每个 client/zkEVM 特判，证明系统也要额外电路或 guest hook。
- EIP-8200 的方向是在相同地址部署等价 EVM bytecode，把“client 内置逻辑”移动到普通 EVM 执行路径。
- 收益是降低 special-case burden；风险是 gas cost、performance 和边界行为可能影响依赖 precompile 的合约与 rollup prover。

### LeanVM / leanSig：PQ-friendly proving substrate
- LeanVM 聚焦 hash-based、minimal zkVM 和可形式化的 proving substrate，服务长期 PQ 与 proof-heavy Ethereum。
- leanSig 关注 hash-based signature aggregation 的同步/epoch discipline，目标是让 PQ signatures 不把验证成本和 state 管理推到不可承受。
- 这条线仍是研究实现，不能写成 L1 已确定迁移路径；更适合作为 Mantle prover architecture 的长期观察对象。

### RISC-V replacement：为什么它是长期架构问题
- RISC-V 作为 zkVM-friendly ISA 可以减少 EVM-to-zkVM glue，但 Ethereum 主网还必须兼容历史合约、gas semantics、precompile、debug tooling 和客户端 native execution。
- dual-VM 或 interpreter 模式可以缓解迁移，但会引入新的复杂度和性能边界。
- 因此它更像 proof-heavy endgame 的架构压力测试，不是短期 hard fork roadmap。

## 当前瓶颈
- Spec conformance：EVM 边界行为、gas accounting、precompile semantics 都需要跨 client/prover 完全一致。
- Compiler trust：高级语言到 zkVM guest 的编译链越长，越难判断 bug 属于 compiler、guest 还是 circuit。
- 特例过多：precompiles、host calls、custom syscalls 会让 zkEVM 变成大量 patch 的集合。
- PQ readiness：BLS/KZG 与部分曲线依赖长期要面对量子风险，hash-based alternatives 又带来 proof size/throughput 成本。

## 优化机制
- 特例削减：EIP-8200 把 precompile 行为尽量转回普通 EVM bytecode。
- Guest hardening：evm-asm/SAsm 用更小、更静态、更可形式化的 guest 表达 EVM semantics。
- Substrate research：LeanVM、leanSig 和 RISC-V replacement 探索 PQ-friendly、zkVM-friendly 的长期执行/证明基础。
- Compatibility audit：任何 substrate 变化都需要同步检查 gas、precompile、contract assumptions 和 rollup derivation。

## 未来效果
- zkEVM/prover：可信代码边界缩小，guest 行为更容易验证，multi-prover input 更可能标准化。
- L1 clients：precompile 特例减少后，client diversity 和 prover diversity 的一致性更好。
- Rollups：OP Succinct、Kona、SP1 类 stack 更容易对齐 Ethereum proof-heavy future。
- 应用层：若 RISC-V 或 precompile EVMification 推进，gas-sensitive contracts 和 precompile-heavy apps 需要迁移评估。

## 依赖与先后关系
本方向依赖 proof-heavy execution 需求，也服务 PQ consensus/auth。EIP-8200 可较独立推进；evm-asm/LeanVM 是研究实现；RISC-V replacement 是长期架构讨论。

## 风险与未决问题
evm-asm 明确 experimental；leanVM/leanSig security parameters 未 production-grade；EIP-8200 会改变 gas 成本；RISC-V 可能导致 x86/ARM native execution regression；old EVM contracts 的 dual-VM/interpreter 兼容成本很高。

## 对 Mantle 的影响
- Prover alignment：Mantle 的 OP Succinct/SP1/Kona 路线已经站在 zkVM-aligned stack 上，能更早吸收 guest hardening 和 prover input standardization。
- Precompile 风险：EIP-8200 可能降低 proof 特例，但也可能改变 gas/performance 假设；Mantle 应盘点 L2 上 precompile-heavy 应用。
- Native future：RISC-V/native-rollup 讨论会放大 custom STF、MNT gas token、custom transaction path 的兼容问题。
- 安全治理：verifier key、guest binary、compiler version、Kona/SP1 release 应纳入变更审批，而不是只看合约升级。

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
