export const locales = ["en", "zh"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path
  return path === "/" ? "/zh" : `/zh${path}`
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en"
}

type ReadingStep = {
  readonly title: string
  readonly body: string
}

type UiStrings = {
  readonly skipToContent: string
  readonly navHome: string
  readonly navSynthesis: string
  readonly navPdf: string
  readonly languageToggle: string
  readonly heroEyebrow: string
  readonly heroTitle: string
  readonly heroLead: string
  readonly readingPathLabel: string
  readonly readingSteps: readonly ReadingStep[]
  readonly strawmapEyebrow: string
  readonly strawmapTitle: string
  readonly strawmapLead: string
  readonly strawmapAlt: string
  readonly strawmapCaptionSource: string
  readonly strawmapCaptionNote: string
  readonly layerNavEyebrow: string
  readonly layerNavTitle: string
  readonly layerNavLead: string
  readonly layerNavMeta: (directions: number, reports: number) => string
  readonly appendixEyebrow: string
  readonly appendixTitle: string
  readonly appendixLead: string
  readonly teaserEyebrow: string
  readonly teaserTitle: string
  readonly teaserBody: string
  readonly teaserSynthesisLink: string
  readonly teaserPdfLink: string
  readonly backToHome: string
  readonly layerRoleTitle: string
  readonly limitsEyebrow: string
  readonly limitsTitle: string
  readonly directionsEyebrow: string
  readonly directionsTitle: string
  readonly layerReportsEyebrow: string
  readonly layerReportsTitle: string
  readonly pagerPrevious: string
  readonly pagerNext: string
  readonly pagerAfterLayers: string
  readonly pagerSynthesis: string
  readonly pagerLabel: string
  readonly synthesisEyebrow: string
  readonly synthesisTitle: string
  readonly findingsEyebrow: string
  readonly findingsTitle: string
  readonly dependencyEyebrow: string
  readonly dependencyTitle: string
  readonly dependencyLead: string
  readonly mantleEyebrow: string
  readonly mantleTitle: string
  readonly mantleLinesTitle: string
  readonly evidenceEyebrow: string
  readonly evidenceTitle: string
  readonly metricReports: string
  readonly metricReportsValue: (reports: number, appendices: number) => string
  readonly metricSources: string
  readonly metricReachability: string
  readonly metricStructure: string
  readonly statusCorrectionsTitle: string
  readonly sourceHostsTitle: string
  readonly appendixALink: string
  readonly appendixBLink: string
  readonly verifyReportLink: string
  readonly backToLayerGuide: (layerLabel: string) => string
  readonly lensSectionLabel: string
  readonly lensBottleneck: string
  readonly lensMechanism: string
  readonly lensFutureEffect: string
  readonly lensMantleImpact: string
  readonly breakdownEyebrow: string
  readonly breakdownTitle: string
  readonly reportBodyLabel: string
  readonly sourcesRailLabel: string
  readonly reportIndexLabel: string
  readonly reportIndexHeading: string
  readonly indexGroups: Readonly<Record<string, string>>
  readonly notFoundTitle: string
  readonly notFoundBody: string
  readonly notFoundLink: string
  readonly siteTitle: string
  readonly siteDescription: string
  readonly synthesisMetaTitle: string
  readonly synthesisMetaDescription: string
}

export const ui: Readonly<Record<Locale, UiStrings>> = {
  en: {
    skipToContent: "Skip to content",
    navHome: "Home",
    navSynthesis: "Synthesis & Evidence",
    navPdf: "PDF",
    languageToggle: "中文",
    heroEyebrow: "Mantle research handoff · 2026-07-06",
    heroTitle: "Ethereum Strawmap Roadmap Research Atlas",
    heroLead:
      "strawmap.org is the Ethereum L1 draft roadmap maintained by EF Architecture (a strawman: rough consensus, not commitments). This research unpacks the 2026-06-26 strawmap into 4 reading lines, 14 deep-dive reports, and 2 calibration appendices — answering the same questions for every optimization: what bottleneck it solves, how, what it depends on, and what it means for Mantle.",
    readingPathLabel: "Recommended reading path",
    readingSteps: [
      {
        title: "See the map",
        body: "Start with the original strawmap to build the layer-by-time frame: three big layers, six hard-fork windows, and the north-star goals on the right.",
      },
      {
        title: "Pick a layer",
        body: "Open a layer guide: first understand what the layer is responsible for and where it is stuck, then how the roadmap intends to change it.",
      },
      {
        title: "Read the reports",
        body: "Follow each optimization direction into its deep-dive report; when you need evidence, check the report sources, the synthesis, and the two calibration appendices.",
      },
    ],
    strawmapEyebrow: "Step 1 · The original map",
    strawmapTitle: "Start with the original map: the L1 draft roadmap on strawmap.org",
    strawmapLead:
      "The horizontal axis is hard-fork windows (Glamsterdam → Hegotá → longer term); the vertical axis is the three big layers: Consensus (CL), Data (DL), and Execution (EL). Dark blocks are each layer's headliners; the gray-black blocks on the right are north-star goals. Click the image for the full-size version.",
    strawmapAlt:
      "The original strawmap.org roadmap: optimizations and north-star goals for the consensus, data, and execution layers across the 2026-2029 hard-fork windows",
    strawmapCaptionSource: "Source: ",
    strawmapCaptionNote:
      " (maintained by EF Architecture, updated 2026-06-26). Labels on the map are drafts, not commitments — before trusting any specific status, run through the two calibration appendices below.",
    layerNavEyebrow: "Step 2 · Pick a layer",
    layerNavTitle: "Then pick a layer: four reading lines",
    layerNavLead:
      "Every reading line follows the same structure: what the layer does → its current flaws and limits → future optimization directions → the deep-dive reports. Accounts/privacy is drawn inside the execution layer on the original map; here it gets its own line.",
    layerNavMeta: (directions, reports) =>
      `${directions} direction${directions === 1 ? "" : "s"} · ${reports} report${reports === 1 ? "" : "s"}`,
    appendixEyebrow: "Before you trust a label",
    appendixTitle: "Calibrate first, then read deeply",
    appendixLead:
      "A strawmap label is not a commitment: some items are live on mainnet, others are research drafts. The two appendices calibrate statuses and ambiguous labels — read them before citing any conclusion.",
    teaserEyebrow: "Step 3 · Cross-layer view",
    teaserTitle: "Synthesis, dependencies, and Mantle impact",
    teaserBody:
      "After the individual layers, switch to the cross-layer view: key findings, the dependency spine between optimizations, Mantle's four watch tracks, and the full source and verification records.",
    teaserSynthesisLink: "Open synthesis & evidence",
    teaserPdfLink: "Download the full PDF (Chinese)",
    backToHome: "Back to home",
    layerRoleTitle: "What this layer does",
    limitsEyebrow: "Why change",
    limitsTitle: "Current flaws and limits",
    directionsEyebrow: "Where it goes",
    directionsTitle: "Future optimization directions",
    layerReportsEyebrow: "Deep dives",
    layerReportsTitle: "Research reports in this layer",
    pagerPrevious: "Previous reading line",
    pagerNext: "Next reading line",
    pagerAfterLayers: "After the four reading lines",
    pagerSynthesis: "Synthesis & evidence",
    pagerLabel: "Adjacent reading lines",
    synthesisEyebrow: "Cross-layer synthesis",
    synthesisTitle: "Synthesis & Evidence",
    findingsEyebrow: "Findings",
    findingsTitle: "Key findings",
    dependencyEyebrow: "Dependency spine",
    dependencyTitle: "How the optimizations depend on each other",
    dependencyLead:
      "These optimizations are not a flat list: upstream capabilities decide whether downstream ones can land. When judging any single item's timeline, first locate it on this spine.",
    mantleEyebrow: "Mantle reading board",
    mantleTitle: "Landing on Mantle: four watch tracks",
    mantleLinesTitle: "Most important reading threads for Mantle",
    evidenceEyebrow: "Evidence",
    evidenceTitle: "Verification records and sources",
    metricReports: "Reports",
    metricReportsValue: (reports, appendices) => `${reports} + ${appendices} appendices`,
    metricSources: "Unique sources",
    metricReachability: "Reachability",
    metricStructure: "Structure checks",
    statusCorrectionsTitle: "Status corrections",
    sourceHostsTitle: "Frequent source hosts",
    appendixALink: "Appendix A · Fork status",
    appendixBLink: "Appendix B · Ambiguous label crosswalk",
    verifyReportLink: "Verify report",
    backToLayerGuide: (layerLabel) => `Back to the ${layerLabel} guide`,
    lensSectionLabel: "Four-question overview",
    lensBottleneck: "What is the bottleneck",
    lensMechanism: "How it is optimized",
    lensFutureEffect: "Future effect",
    lensMantleImpact: "Impact on Mantle",
    breakdownEyebrow: "Optimization breakdown",
    breakdownTitle: "Item-by-item breakdown",
    reportBodyLabel: "Report body",
    sourcesRailLabel: "Report sources",
    reportIndexLabel: "Report index",
    reportIndexHeading: "Reports",
    indexGroups: {
      consensus: "Consensus",
      data: "Data",
      execution: "Execution",
      account: "Accounts / Privacy",
      appendix: "Appendix",
    },
    notFoundTitle: "Page not found",
    notFoundBody: "The page you are looking for does not exist or has been moved.",
    notFoundLink: "Back to the atlas",
    siteTitle: "Ethereum Strawmap Dossier for Mantle",
    siteDescription:
      "A guided reader for the Ethereum Strawmap research pack and its Mantle impact analysis.",
    synthesisMetaTitle: "Synthesis & Evidence | Ethereum Strawmap Dossier",
    synthesisMetaDescription:
      "Cross-layer findings, the optimization dependency spine, Mantle watch tracks, and full source verification records.",
  },
  zh: {
    skipToContent: "跳到正文",
    navHome: "首页",
    navSynthesis: "综合与证据",
    navPdf: "PDF",
    languageToggle: "EN",
    heroEyebrow: "Mantle research handoff · 2026-07-06",
    heroTitle: "Ethereum Strawmap 路线图研究图册",
    heroLead:
      "strawmap.org 是 EF Architecture 团队维护的 Ethereum L1 草案路线图（strawman：粗共识、非承诺）。这套研究把 2026-06-26 版 strawmap 拆成 4 条阅读线、14 篇深挖报告和 2 个校准附录，为每个优化点回答同一组问题：它解决什么瓶颈、怎么解、依赖谁、对 Mantle 意味着什么。",
    readingPathLabel: "推荐阅读路径",
    readingSteps: [
      {
        title: "看原图",
        body: "从 strawmap 原始路线图开始，建立「层 × 时间」的整体框架：三个大层、六次硬分叉窗口、右侧的北极星目标。",
      },
      {
        title: "选一层",
        body: "进入一个 layer 的导读页：先弄清这层负责什么、现在卡在哪里，再看路线图准备怎么改。",
      },
      {
        title: "读报告",
        body: "从每个优化方向进入对应的深挖报告；需要证据时查报告来源、综合结论与两个校准附录。",
      },
    ],
    strawmapEyebrow: "Step 1 · The original map",
    strawmapTitle: "先看原图：strawmap.org 的 L1 草案路线图",
    strawmapLead:
      "横轴是硬分叉窗口（Glamsterdam → Hegotá → 更远期），纵轴是三个大层：共识层（CL）、数据层（DL）、执行层（EL）。深色块是各层的 headliner，右侧灰黑块是北极星目标。点击图片可查看大图。",
    strawmapAlt:
      "strawmap.org 原始路线图：共识层、数据层、执行层三大层在 2026-2029 各硬分叉窗口的优化项与北极星目标",
    strawmapCaptionSource: "来源：",
    strawmapCaptionNote:
      "（EF Architecture 维护，2026-06-26 更新）。图上标签是草案而非承诺——阅读任何具体状态前，请先过一遍下方的两个校准附录。",
    layerNavEyebrow: "Step 2 · Pick a layer",
    layerNavTitle: "再选一层深入：四条阅读线",
    layerNavLead:
      "每条阅读线都按同一结构组织：这层做了什么 → 现在的缺陷与限制 → 未来的优化方向 → 逐篇深挖报告。账户/隐私在原图上画在执行层内，这里单独拆出来读。",
    layerNavMeta: (directions, reports) => `${directions} 个优化方向 · ${reports} 篇报告`,
    appendixEyebrow: "Before you trust a label",
    appendixTitle: "先校准，再深读",
    appendixLead:
      "strawmap 上的标签不等于承诺：有的已上主网，有的只是研究草稿。两个附录负责把状态和模糊标签校准清楚，建议在引用任何结论前先读。",
    teaserEyebrow: "Step 3 · Cross-layer view",
    teaserTitle: "综合结论、依赖关系与 Mantle 影响",
    teaserBody:
      "读完单层之后，到综合页看跨层视角：核心发现、优化点之间的依赖脉络、Mantle 四条关注线，以及全部来源与验证记录。",
    teaserSynthesisLink: "进入综合与证据",
    teaserPdfLink: "下载 PDF 全文",
    backToHome: "返回首页",
    layerRoleTitle: "这一层做了什么",
    limitsEyebrow: "Why change",
    limitsTitle: "现在的缺陷与限制",
    directionsEyebrow: "Where it goes",
    directionsTitle: "未来的优化方向",
    layerReportsEyebrow: "Deep dives",
    layerReportsTitle: "本层的研究报告",
    pagerPrevious: "上一条阅读线",
    pagerNext: "下一条阅读线",
    pagerAfterLayers: "读完四条线之后",
    pagerSynthesis: "综合结论与证据",
    pagerLabel: "相邻阅读线",
    synthesisEyebrow: "Cross-layer synthesis",
    synthesisTitle: "综合结论与证据",
    findingsEyebrow: "Findings",
    findingsTitle: "核心发现",
    dependencyEyebrow: "Dependency spine",
    dependencyTitle: "优化点之间的依赖脉络",
    dependencyLead:
      "这些优化点不是并列清单：上游能力决定下游能不能落地。评估任何单项的时间线时，先看它在这条脊柱上的位置。",
    mantleEyebrow: "Mantle reading board",
    mantleTitle: "落到 Mantle：四条关注线",
    mantleLinesTitle: "Mantle 最重要的阅读线索",
    evidenceEyebrow: "Evidence",
    evidenceTitle: "验证记录与来源",
    metricReports: "报告",
    metricReportsValue: (reports, appendices) => `${reports} 篇 + ${appendices} 个附录`,
    metricSources: "独立来源",
    metricReachability: "可达性",
    metricStructure: "结构校验",
    statusCorrectionsTitle: "状态修正",
    sourceHostsTitle: "高频来源域",
    appendixALink: "Appendix A · Fork status",
    appendixBLink: "Appendix B · 模糊标签 crosswalk",
    verifyReportLink: "Verify report",
    backToLayerGuide: (layerLabel) => `返回${layerLabel}导读`,
    lensSectionLabel: "四问速览",
    lensBottleneck: "瓶颈是什么",
    lensMechanism: "怎么优化",
    lensFutureEffect: "未来效果",
    lensMantleImpact: "Mantle 影响",
    breakdownEyebrow: "Optimization breakdown",
    breakdownTitle: "逐项拆解",
    reportBodyLabel: "报告正文",
    sourcesRailLabel: "报告来源",
    reportIndexLabel: "报告索引",
    reportIndexHeading: "Reports",
    indexGroups: {
      consensus: "共识",
      data: "数据",
      execution: "执行",
      account: "账户/隐私",
      appendix: "附录",
    },
    notFoundTitle: "页面不存在",
    notFoundBody: "你要找的页面不存在或已被移动。",
    notFoundLink: "返回图册首页",
    siteTitle: "Ethereum Strawmap 路线图研究图册",
    siteDescription: "Ethereum Strawmap 研究包与 Mantle 影响分析的引导式阅读站点。",
    synthesisMetaTitle: "综合结论与证据 | Ethereum Strawmap Dossier",
    synthesisMetaDescription: "跨层核心发现、优化点依赖脉络、Mantle 关注线与全部来源验证记录。",
  },
}
