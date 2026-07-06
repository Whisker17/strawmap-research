import type { GuideLayerId, LayerGuide, MantleTrack } from "./types"

export const layerGuides: readonly LayerGuide[] = [
  {
    id: "consensus",
    label: "共识层",
    enLabel: "Consensus Layer (CL)",
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
    enLabel: "Data Layer (DL)",
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
    enLabel: "Execution Layer (EL)",
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
    enLabel: "Accounts & Privacy",
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

export function getLayerGuide(id: string): LayerGuide | undefined {
  return layerGuides.find((guide) => guide.id === id)
}

export function layerHref(id: GuideLayerId): string {
  return `/layers/${id}`
}

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
