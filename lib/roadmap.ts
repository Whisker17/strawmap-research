import type { LayerSummary, MantleTrack } from "./types"

export const layerSummaries: readonly LayerSummary[] = [
  {
    id: "consensus",
    label: "共识层",
    accent: "violet",
    problem: "确认、终局性、出块角色、验证者通信和 PQ 迁移被同一个共识预算牵住。",
    change:
      "通过 FCR、ePBS/FOCIL、heartbeat/finality 解耦、PQ key registry 和 lean specs，把低延迟与长期安全分层。",
    reportNumbers: ["01", "02", "03", "04"],
  },
  {
    id: "data",
    label: "数据层",
    accent: "teal",
    problem:
      "Blob DA 已成为 rollup 主路径，但容量、传播、custody、定价和 fallback 成本会彼此制约。",
    change:
      "PeerDAS/BPO 提供容量上移，sparse blobpool、streaming、custody proofs 与多维费用防止新瓶颈迁移。",
    reportNumbers: ["05", "06", "07"],
  },
  {
    id: "execution",
    label: "执行层",
    accent: "amber",
    problem:
      "更高 gas、并行验证、proof-heavy execution 和 state growth 会把状态访问和 prover input 变成核心瓶颈。",
    change:
      "BALs、Block-in-Blobs、proving substrates、state redesign 和 purges 把执行从 universal re-execution 推向显式数据与证明验证。",
    reportNumbers: ["08", "09", "10", "11", "12"],
  },
  {
    id: "account",
    label: "账户 / 隐私层",
    accent: "green",
    problem:
      "EOA/global nonce/public mempool 难以支撑 AA、PQ auth、sponsorship、privacy 和 MEV-sensitive flow。",
    change:
      "Frame tx、keyed nonces、recent roots、scheme agility 与 encrypted mempool 将交易入口拆成可验证的多 lane。",
    reportNumbers: ["13", "14"],
  },
]

export const mantleTracks: readonly MantleTrack[] = [
  {
    id: "da",
    label: "DA / Blob 路径",
    body: "按 Ethereum blobs/calldata 主 DA 重新建模容量、fallback、Arsia L1 data fee 与 BPO 节奏。",
    reports: ["05", "06", "07", "10"],
  },
  {
    id: "proof",
    label: "Proof / Native Rollup",
    body: "把 OP Succinct/SP1 production path、BAL availability、BiB payload data 和 native-rollup compatibility 分开评估。",
    reports: ["09", "10", "11", "12"],
  },
  {
    id: "sequencer",
    label: "Sequencer / MEV",
    body: "L1 forced inclusion 和 encrypted mempool 会提高用户对 L2 forced tx、fair sequencing 与隐私边界的预期。",
    reports: ["02", "13", "14"],
  },
  {
    id: "product",
    label: "Product / UX",
    body: "面向用户拆分 L1 fast-confirmed、L1 finalized、L2 proven、withdrawal ready，避免把不同安全等级混写。",
    reports: ["01", "10", "13"],
  },
]
