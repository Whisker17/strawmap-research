# Wave 1 Digest: R11 EVM Hardening and Proving Substrates

Agent: `019f3538-fcef-75b2-bcde-43b5e47f7a9e`

## Key Findings

- `evm-asm` targets compiler trust and zkEVM guest complexity by writing guest code directly in Lean 4 verified RISC-V.
- `state-asm` is not a standardized label; best mapping is SAsm / structured assembly inside `evm-asm`.
- `leanVM` is a minimal hash-based zkVM with recursive aggregation and explicit security/performance tradeoffs.
- `leanSig` is a synchronized hash-based signature system shaped for leanVM aggregation efficiency, but it is not production-audited.
- EIP-8200 EVMifies selected precompiles by deploying EVM bytecode at the same addresses, reducing client/zkEVM special cases but changing gas/performance properties.
- The long-term RISC-V replacement proposal argues direct RISC-V contracts could improve proving efficiency but carries compatibility and native-execution regression risk.

## Repo Heads

- `evm-asm`: `f53336814041e98245bddb51be84eecb034ba1e1`
- `leanVM`: `12e61512416548e743040aab4daf83c58a5c5476`
- `leanSig`: `c08a3bae74b0d85379cab72dcbefa4091546ecbb`
- `leanSpec`: `57d4339929e4bb8e87a190ea2838408cb9057d82`
- `eth2030`: `14497b5fefa08cdba038f92bd2c29f82ad09b625`

## Sources Surfaced

- https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/README.md#L28-L72
- https://github.com/Verified-zkEVM/evm-asm/blob/f53336814041e98245bddb51be84eecb034ba1e1/docs/sasm-design.md#L441-L536
- https://github.com/leanEthereum/leanVM/blob/12e61512416548e743040aab4daf83c58a5c5476/README.md#L15-L91
- https://github.com/leanEthereum/leanSig/blob/c08a3bae74b0d85379cab72dcbefa4091546ecbb/README.md#L18-L27
- https://github.com/leanEthereum/leanSig/blob/c08a3bae74b0d85379cab72dcbefa4091546ecbb/README.md#L114-L121
- https://eips.ethereum.org/EIPS/eip-8200
- https://ethereum-magicians.org/t/long-term-l1-execution-layer-proposal-replace-the-evm-with-risc-v/23617
- https://www.mantle.xyz/blog/announcements/op-succinct-mantle-network-testnet
- https://succinctlabs.github.io/op-succinct/
- https://blog.succinct.xyz/case-studies/mantle/

## Mantle Implications

- Mantle's OP Succinct/SP1/Kona direction makes it relatively portable toward zkVM-aligned prover stacks.
- EIP-8200 is attractive for compatibility because it preserves precompile addresses while reducing special cases.
- RISC-V replacement is a more radical substrate change and should be tracked as a long-term compatibility/prover-alignment risk.

## EXPAND Markers

- LEAD: state-asm guest-frame invariants — WHY: exact label is inferred and may need stronger evidence — ANGLE: SAsm docs and evm-asm design.
