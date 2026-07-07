import type { Locale } from "./i18n"
import type { GuideLayerId, LayerGuide, MantleTrack } from "./types"

const layerGuidesZh: readonly LayerGuide[] = [
  {
    id: "consensus",
    label: "共识层",
    navLabel: "共识层",
    kicker: "Consensus Layer (CL)",
    accent: "violet",
    tagline: "确认、终局性与验证者集合——决定一笔交易什么时候算数。",
    role: [
      "共识层负责让全球数十万验证者对「链的下一个区块是什么、哪些区块永不回滚」达成一致。它规定了出块、投票（attestation）与终局性（finality）的节奏，也定义了 proposer、attester、builder 这些角色的分工。",
      "用户要等多久才能把一笔交易当作不可逆、交易所和跨链桥要设多少确认数，本质上都由这一层决定。",
    ],
    limits: [
      "确认太慢：slot 12 秒、终局性需要约两个 epoch（约 13 分钟），远达不到交易所和 L2 桥期望的秒级不可逆。",
      "角色耦合：proposer 在协议内同时负责共识与 execution payload，MEV 供应链（mev-boost）运行在协议外，抗审查目前只能靠协议外的社会共识兜底。",
      "规模与技术债：接近百万级验证者的签名聚合逼近网络极限，发行曲线还在鼓励集合继续膨胀，而老化的 beacon spec 让每一次改动都很贵。",
      "密码学有时限：BLS 签名不抗量子，整条投票与聚合管线需要在量子威胁成熟之前完成替换。",
    ],
    directions: [
      {
        id: "fast-finality",
        title: "更快的确认与终局性",
        northStar: "Fast L1 · finality in seconds",
        summary:
          "Fast confirmation rule 先在不改 slot 的前提下给出「几秒内的强确认」，随后 quick slots 缩短 slot、decoupled consensus 与 1-round finality 把终局性本身压到秒级。",
        reportNumbers: ["01"],
      },
      {
        id: "block-production",
        title: "出块角色拆分与抗审查",
        summary:
          "ePBS（Glamsterdam 已排期）把 execution payload 从共识热路径中拆出，FOCIL（Hegotá 已排期）给协议加上强制包含清单；更长期的方向是 attester-proposer separation 与分布式出块。",
        reportNumbers: ["02"],
      },
      {
        id: "validator-scale",
        title: "验证者规模、发行与规格瘦身",
        summary:
          "snail issuance 用更低的发行约束验证者集合规模，beacon & lean specs merge 与 tech debt reset 清理规格技术债，为百万级 attestation 和更短的 slot 扫清障碍。",
        reportNumbers: ["03"],
      },
      {
        id: "pq-resilience",
        title: "后量子密码学与共识韧性",
        summary:
          "PQ pubkey registry 和 post-quantum heartbeat 为签名迁移铺路，leanXMSS attestations 是目标签名方案；51% attack auto-recovery 等机制提高链被攻击后的自愈能力。",
        reportNumbers: ["04"],
      },
    ],
    reportNumbers: ["01", "02", "03", "04"],
  },
  {
    id: "data",
    label: "数据层",
    navLabel: "数据层",
    kicker: "Data Layer (DL)",
    accent: "teal",
    tagline: "Blob 与数据可用性——决定 rollup 的成本与规模上限。",
    role: [
      "数据层解决的是「rollup 和应用把数据发到哪里、网络如何保证这些数据在需要时可以被任何人下载验证」。自 EIP-4844 引入 blob 以来，它已经成为 L2 的主要数据可用性（DA）通道。",
      "blob 的容量与价格直接决定 rollup 的成本结构——包括 Mantle 当前以 Ethereum blobs 为主路径、calldata 为 fallback 的 DA 策略。",
    ],
    limits: [
      "容量仍差几个数量级：PeerDAS 与 BPO 已在主网激活，但当前 blob 吞吐距离 teragas L2（1 GByte/s）的北极星目标还差约三个数量级。",
      "网络会成为下一个瓶颈：blob 越多越大，mempool 传播、采样与重建的负担越重——容量问题解决后会立刻转化为传播与 custody 问题。",
      "定价维度不足：blob fee 剧烈波动、calldata fallback 与其他资源没有按真实消耗分别定价，扩容红利可能被最便宜的资源滥用吃掉。",
    ],
    directions: [
      {
        id: "da-capacity",
        title: "DA 容量持续上移",
        northStar: "Teragas L2 · 1 GByte/sec",
        summary:
          "PeerDAS 用抽样验证代替全量下载，把单节点带宽从容量公式里拆掉；BPO（blob parameter only forks）让 blob 数量可以在大版本硬分叉之外按节奏调升。",
        reportNumbers: ["05"],
      },
      {
        id: "propagation-custody",
        title: "传播、Custody 与 Streaming",
        summary:
          "sparse blobpool、cell-level deltas 与 local blob reconstruction 降低传播开销；blob streaming 与 proofs of custody 保证更大的 blob 也能被稳定托管、抽查与验证。",
        reportNumbers: ["06"],
      },
      {
        id: "resource-pricing",
        title: "资源定价与费用市场",
        summary:
          "多维 fee、byte floors 与 blob futures 把 blob、calldata、state 等资源各自定价，防止扩容后出现「便宜资源反噬」，也让 rollup 可以对冲数据成本波动。",
        reportNumbers: ["07"],
      },
    ],
    reportNumbers: ["05", "06", "07"],
  },
  {
    id: "execution",
    label: "执行层",
    navLabel: "执行层",
    kicker: "Execution Layer (EL)",
    accent: "amber",
    tagline: "EVM、状态与证明——决定 L1 能跑多快、能被谁验证。",
    role: [
      "执行层是 EVM 运行的地方：执行交易、更新世界状态、维护所有账户与合约。今天它的安全模型是「每个全节点重放每一笔交易」（universal re-execution）——这带来最强的可验证性，也带来最硬的天花板。",
      "Strawmap 在这一层押注的转变是：从「人人重放」走向「显式数据 + 证明验证」，让吞吐不再受制于最慢的家用节点。",
    ],
    limits: [
      "吞吐被重放模型锁死：gas limit 每上调一档，都要确认最慢的节点还能跟上执行、状态访问和区块广播。",
      "状态访问是隐式的：不真正执行交易就不知道它会读写哪些账户与存储，因此无法并行验证，也难以生成 stateless witness。",
      "状态无界增长：账户与存储只增不减，全节点的磁盘与同步门槛逐年上升。",
      "EVM 对 prover 不友好：长尾 precompile、动态跳转和 hash-heavy 的状态树让 zk 证明成本居高不下。",
    ],
    directions: [
      {
        id: "gigagas",
        title: "Gas limit 上调与 P2P 扩容",
        northStar: "Gigagas L1 · 1 Ggas/sec",
        summary:
          "gas limit 阶梯式上调，配合 ethp2p broadcast/unification 与 sharded mempool，让执行吞吐的提升不被区块与交易广播拖垮。",
        reportNumbers: ["08"],
      },
      {
        id: "bals",
        title: "BALs：显式状态访问",
        summary:
          "Block-level access lists（Glamsterdam 已排期）让区块提前声明它会读写哪些状态，解锁并行验证、更快的 state sync 与 witness 生成——它是后面几乎所有执行层升级的地基。",
        reportNumbers: ["09"],
      },
      {
        id: "proof-heavy",
        title: "Proof-heavy execution 与 native rollups",
        summary:
          "从 optional 2-of-3 proofs 过渡到 mandatory 1-of-1 proofs，节点验证证明而不是重放交易；native rollups 让 L2 直接复用 L1 的证明化 EVM，安全性与 L1 对齐。",
        reportNumbers: ["10"],
      },
      {
        id: "evm-hardening",
        title: "EVM 加固与 proving substrates",
        summary:
          "evm-asm、EVMify 长尾 precompiles、pureth purges 与 zkzkRISC-V frames，把 EVM 收敛成对 prover 友好的最小核心，降低证明成本与实现分歧。",
        reportNumbers: ["11"],
      },
      {
        id: "state-growth",
        title: "State growth、statelessness 与 purges",
        summary:
          "partial binary tree、state-asm、decentralized state 与 endgame state 控制状态增长、重构状态树，把「保存全部状态」从单机职责变成网络职责。",
        reportNumbers: ["12"],
      },
    ],
    reportNumbers: ["08", "09", "10", "11", "12"],
  },
  {
    id: "account",
    label: "账户 / 隐私层",
    navLabel: "账户/隐私层",
    kicker: "Accounts & Privacy",
    accent: "green",
    tagline: "交易格式、认证与隐私——决定用户以什么方式进入这条链。",
    role: [
      "这条线决定「一笔交易长什么样、谁能授权它、外界在确认前能看到多少」。今天的答案是：EOA + ECDSA 单签 + 全局递增 nonce + 完全公开的 mempool——它是所有用户交互的入口。",
      "在 strawmap 原图上，这些内容画在执行层的 cryptography / privacy 两行里；本研究把它们单独拆出来读，因为它们面对的是同一组用户侧问题。",
    ],
    limits: [
      "账户模型僵硬：单一签名算法（不抗量子）加全局 nonce，让账户抽象、gas 代付、批量与并行提交都只能绕到协议外实现。",
      "确认前零隐私：交易在公开 mempool 里完全可见，MEV 提取与抢跑是结构性收益；需要隐私的资金流现在只能离开 L1。",
      "认证难以升级：签名方案硬编码在交易格式里，任何新算法（包括后量子方案）都要等一次交易类型级别的硬分叉。",
    ],
    directions: [
      {
        id: "frame-tx",
        title: "Frame transactions 与账户现代化",
        summary:
          "frame transactions（CFI）给交易一个可扩展的封装格式；keyed nonces & recent roots 解决并行提交与重放保护，ephemeral keys 与 PQ leanSPHINCS 让签名方案可以按需替换。",
        reportNumbers: ["13"],
      },
      {
        id: "private-l1",
        title: "Private L1：加密内存池与隐蔽转账",
        northStar: "Private L1 · shielded transfers",
        summary:
          "privacy mempool 与 encrypted mempool 把「确认前可见性」关掉，从源头压缩抢跑空间；lean privacy wormholes 与 shielded transfers 是更长期的隐私北极星。",
        reportNumbers: ["14"],
      },
    ],
    reportNumbers: ["13", "14"],
  },
]

const layerGuidesEn: readonly LayerGuide[] = [
  {
    id: "consensus",
    label: "Consensus Layer",
    navLabel: "Consensus",
    kicker: "CL",
    accent: "violet",
    tagline:
      "Confirmation, finality, and the validator set — this layer decides when a transaction counts.",
    role: [
      "The consensus layer keeps hundreds of thousands of validators worldwide in agreement on what the next block is and which blocks can never be rolled back. It sets the cadence of block proposal, attestation, and finality, and defines the division of labor between proposers, attesters, and builders.",
      "How long users wait before treating a transaction as irreversible — and how many confirmations exchanges and bridges require — is ultimately decided by this layer.",
    ],
    limits: [
      "Confirmation is slow: 12-second slots and finality after roughly two epochs (about 13 minutes) fall far short of the seconds-level irreversibility exchanges and L2 bridges expect.",
      "Roles are entangled: the proposer handles both consensus and the execution payload in-protocol, the MEV supply chain (mev-boost) runs outside the protocol, and censorship resistance currently rests on out-of-protocol social consensus.",
      "Scale and tech debt: signature aggregation for a validator set approaching one million is pushing network limits, the issuance curve still encourages the set to grow, and an aging beacon spec makes every change expensive.",
      "Cryptography has a deadline: BLS signatures are not quantum-resistant, and the entire voting and aggregation pipeline must be replaced before quantum threats mature.",
    ],
    directions: [
      {
        id: "fast-finality",
        title: "Faster confirmation and finality",
        northStar: "Fast L1 · finality in seconds",
        summary:
          "The fast confirmation rule first delivers strong confirmation within seconds without touching the slot; quick slots then shorten the slot itself, and decoupled consensus plus 1-round finality push finality proper into the seconds range.",
        reportNumbers: ["01"],
      },
      {
        id: "block-production",
        title: "Block-production role separation and censorship resistance",
        summary:
          "ePBS (scheduled for Glamsterdam) pulls the execution payload out of the consensus hot path, and FOCIL (scheduled for Hegotá) adds protocol-level forced-inclusion lists; the longer-term direction is attester-proposer separation and distributed block building.",
        reportNumbers: ["02"],
      },
      {
        id: "validator-scale",
        title: "Validator scale, issuance, and lean specs",
        summary:
          "Snail issuance uses lower issuance to bound the validator set, while the beacon & lean specs merge and a tech-debt reset clear spec debt — opening the way for million-scale attestation and shorter slots.",
        reportNumbers: ["03"],
      },
      {
        id: "pq-resilience",
        title: "Post-quantum cryptography and consensus resilience",
        summary:
          "A PQ pubkey registry and post-quantum heartbeat pave the signature migration path, leanXMSS attestations are the target scheme, and mechanisms like 51%-attack auto-recovery improve the chain's ability to heal after an attack.",
        reportNumbers: ["04"],
      },
    ],
    reportNumbers: ["01", "02", "03", "04"],
  },
  {
    id: "data",
    label: "Data Layer",
    navLabel: "Data",
    kicker: "DL",
    accent: "teal",
    tagline:
      "Blobs and data availability — this layer sets the cost and scale ceiling for rollups.",
    role: [
      "The data layer answers where rollups and applications publish their data, and how the network guarantees anyone can download and verify that data when needed. Since EIP-4844 introduced blobs, it has been the primary data-availability (DA) channel for L2s.",
      "Blob capacity and pricing directly shape rollup cost structures — including Mantle's current DA strategy of Ethereum blobs as the main path with calldata as fallback.",
    ],
    limits: [
      "Capacity is still orders of magnitude short: PeerDAS and BPO are live on mainnet, but current blob throughput is roughly three orders of magnitude away from the teragas L2 (1 GByte/s) north star.",
      "The network is the next bottleneck: more and bigger blobs put growing load on mempool propagation, sampling, and reconstruction — once capacity is solved, the problem immediately becomes propagation and custody.",
      "Pricing lacks dimensions: blob fees swing violently, and calldata fallback and other resources are not priced by real consumption, so scaling headroom can be eaten by whichever resource is cheapest to abuse.",
    ],
    directions: [
      {
        id: "da-capacity",
        title: "Continuously rising DA capacity",
        northStar: "Teragas L2 · 1 GByte/sec",
        summary:
          "PeerDAS replaces full downloads with sampling, removing single-node bandwidth from the capacity formula; BPO (blob-parameter-only) forks let blob counts step up on their own cadence, outside major hard forks.",
        reportNumbers: ["05"],
      },
      {
        id: "propagation-custody",
        title: "Propagation, custody, and streaming",
        summary:
          "Sparse blobpool, cell-level deltas, and local blob reconstruction cut propagation overhead; blob streaming and proofs of custody keep larger blobs reliably hosted, spot-checked, and verifiable.",
        reportNumbers: ["06"],
      },
      {
        id: "resource-pricing",
        title: "Resource pricing and fee markets",
        summary:
          "Multidimensional fees, byte floors, and blob futures price blobs, calldata, and state separately — preventing cheap-resource blowback after scaling and letting rollups hedge data-cost volatility.",
        reportNumbers: ["07"],
      },
    ],
    reportNumbers: ["05", "06", "07"],
  },
  {
    id: "execution",
    label: "Execution Layer",
    navLabel: "Execution",
    kicker: "EL",
    accent: "amber",
    tagline:
      "The EVM, state, and proofs — this layer decides how fast L1 can run and who can verify it.",
    role: [
      "The execution layer is where the EVM runs: executing transactions, updating the world state, maintaining every account and contract. Its security model today is universal re-execution — every full node replays every transaction — which delivers the strongest verifiability and the hardest ceiling.",
      "The strawmap's bet for this layer is a shift from everyone re-executes to explicit data plus proof verification, so throughput is no longer bounded by the slowest home node.",
    ],
    limits: [
      "Throughput is locked by the replay model: every gas-limit raise must confirm that the slowest nodes can still keep up with execution, state access, and block propagation.",
      "State access is implicit: without actually executing a transaction you cannot know which accounts and storage it touches, so validation cannot be parallelized and stateless witnesses are hard to generate.",
      "State grows without bound: accounts and storage only accumulate, raising the disk and sync bar for full nodes year after year.",
      "The EVM is prover-unfriendly: long-tail precompiles, dynamic jumps, and a hash-heavy state trie keep zk proving costs high.",
    ],
    directions: [
      {
        id: "gigagas",
        title: "Gas-limit raises and P2P scaling",
        northStar: "Gigagas L1 · 1 Ggas/sec",
        summary:
          "Stepwise gas-limit increases, paired with ethp2p broadcast/unification and a sharded mempool, keep execution throughput gains from being dragged down by block and transaction propagation.",
        reportNumbers: ["08"],
      },
      {
        id: "bals",
        title: "BALs: explicit state access",
        summary:
          "Block-level access lists (scheduled for Glamsterdam) make a block declare up front which state it reads and writes, unlocking parallel validation, faster state sync, and witness generation — the foundation for almost every later execution-layer upgrade.",
        reportNumbers: ["09"],
      },
      {
        id: "proof-heavy",
        title: "Proof-heavy execution and native rollups",
        summary:
          "Moving from optional 2-of-3 proofs to mandatory 1-of-1 proofs lets nodes verify proofs instead of replaying transactions; native rollups let L2s reuse L1's proven EVM directly, aligning their security with L1.",
        reportNumbers: ["10"],
      },
      {
        id: "evm-hardening",
        title: "EVM hardening and proving substrates",
        summary:
          "evm-asm, EVMifying long-tail precompiles, pureth purges, and zkzkRISC-V frames converge the EVM into a prover-friendly minimal core, cutting proving cost and implementation divergence.",
        reportNumbers: ["11"],
      },
      {
        id: "state-growth",
        title: "State growth, statelessness, and purges",
        summary:
          "Partial binary tree, state-asm, decentralized state, and endgame state contain state growth and restructure the state trie — turning 'store all state' from a single-machine duty into a network one.",
        reportNumbers: ["12"],
      },
    ],
    reportNumbers: ["08", "09", "10", "11", "12"],
  },
  {
    id: "account",
    label: "Accounts & Privacy",
    navLabel: "Accounts",
    kicker: "EL · cryptography / privacy rows",
    accent: "green",
    tagline:
      "Transaction format, authentication, and privacy — this layer decides how users enter the chain.",
    role: [
      "This line decides what a transaction looks like, who can authorize it, and how much the world sees before it confirms. Today's answer: EOAs + single ECDSA signatures + a global incrementing nonce + a fully public mempool — the entry point for all user interaction.",
      "On the original strawmap these items sit inside the execution layer's cryptography and privacy rows; this research pulls them out as their own reading line because they face the same set of user-side problems.",
    ],
    limits: [
      "The account model is rigid: a single signature algorithm (not quantum-resistant) plus a global nonce forces account abstraction, gas sponsorship, and batched or parallel submission to be built outside the protocol.",
      "Zero pre-confirmation privacy: transactions are fully visible in the public mempool, making MEV extraction and front-running structural income; flows that need privacy currently have to leave L1.",
      "Authentication is hard to upgrade: signature schemes are hard-coded into the transaction format, so any new algorithm — including post-quantum ones — waits for a transaction-type-level hard fork.",
    ],
    directions: [
      {
        id: "frame-tx",
        title: "Frame transactions and account modernization",
        summary:
          "Frame transactions (CFI) give transactions an extensible envelope; keyed nonces & recent roots solve parallel submission and replay protection, while ephemeral keys and PQ leanSPHINCS make signature schemes swappable.",
        reportNumbers: ["13"],
      },
      {
        id: "private-l1",
        title: "Private L1: encrypted mempool and shielded transfers",
        northStar: "Private L1 · shielded transfers",
        summary:
          "A privacy mempool and encrypted mempool switch off pre-confirmation visibility, squeezing front-running at the source; lean privacy wormholes and shielded transfers are the longer-term privacy north stars.",
        reportNumbers: ["14"],
      },
    ],
    reportNumbers: ["13", "14"],
  },
]

const mantleTracksZh: readonly MantleTrack[] = [
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

const mantleTracksEn: readonly MantleTrack[] = [
  {
    id: "da",
    label: "DA / blob path",
    body: "Re-model capacity, fallback, the Arsia L1 data fee, and BPO cadence around Ethereum blobs/calldata as the primary DA.",
    reports: ["05", "06", "07", "10"],
  },
  {
    id: "proof",
    label: "Proof / native rollup",
    body: "Evaluate the OP Succinct/SP1 production path, BAL availability, BiB payload data, and native-rollup compatibility separately.",
    reports: ["09", "10", "11", "12"],
  },
  {
    id: "sequencer",
    label: "Sequencer / MEV",
    body: "L1 forced inclusion and the encrypted mempool will raise user expectations for L2 forced transactions, fair sequencing, and privacy boundaries.",
    reports: ["02", "13", "14"],
  },
  {
    id: "product",
    label: "Product / UX",
    body: "Present L1 fast-confirmed, L1 finalized, L2 proven, and withdrawal-ready as distinct states instead of blending different security levels.",
    reports: ["01", "10", "13"],
  },
]

export const layerGuidesByLocale: Readonly<Record<Locale, readonly LayerGuide[]>> = {
  zh: layerGuidesZh,
  en: layerGuidesEn,
}

export const mantleTracksByLocale: Readonly<Record<Locale, readonly MantleTrack[]>> = {
  zh: mantleTracksZh,
  en: mantleTracksEn,
}

export function getLayerGuide(locale: Locale, id: string): LayerGuide | undefined {
  return layerGuidesByLocale[locale].find((guide) => guide.id === id)
}

export function layerHref(id: GuideLayerId): string {
  return `/layers/${id}`
}
