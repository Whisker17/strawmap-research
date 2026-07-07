import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import type { Locale } from "./i18n"
import {
  excerpt,
  parseBullets,
  parseMarkdownTable,
  parseSources,
  sectionMap,
  stripMarkdown,
  urlHost,
} from "./markdown"
import { layerGuidesByLocale, mantleTracksByLocale } from "./roadmap"
import type {
  Dependency,
  LayerId,
  MetricSet,
  Report,
  ResearchData,
  SourceLink,
  Synthesis,
} from "./types"

type ContentConfig = {
  readonly reportsDir: string
  readonly indexFile: string
  readonly synthesisFile: string
  readonly fallbackLayer: string
  readonly appendixShortTitle: (title: string) => string
  readonly sections: {
    readonly coverage: string
    readonly conclusion: string
    readonly bottleneck: string
    readonly whyAppendix: string
    readonly mechanism: string
    readonly howToRead: string
    readonly futureEffect: string
    readonly dependency: string
    readonly risks: string
    readonly mantleImpact: string
    readonly mantleActions: string
    readonly breakdown: string
  }
  readonly index: {
    readonly reportList: string
    readonly dependencies: string
    readonly readingLines: string
    readonly statusCorrections: string
    readonly reportColumn: string
    readonly layerColumn: string
    readonly upstreamColumn: string
    readonly effectColumn: string
    readonly reportsColumn: string
  }
}

const contentConfigs: Readonly<Record<Locale, ContentConfig>> = {
  zh: {
    reportsDir: "reports",
    indexFile: "INDEX.md",
    synthesisFile: "SYNTHESIS.md",
    fallbackLayer: "附录",
    appendixShortTitle: (title) => title.replace(/^Appendix\s*/, "附录 "),
    sections: {
      coverage: "优化点覆盖",
      conclusion: "一页结论",
      bottleneck: "当前瓶颈",
      whyAppendix: "为什么需要这个附录",
      mechanism: "优化机制",
      howToRead: "读法",
      futureEffect: "未来效果",
      dependency: "依赖与先后关系",
      risks: "风险与未决问题",
      mantleImpact: "对 Mantle 的影响",
      mantleActions: "建议 Mantle 关注",
      breakdown: "逐项拆解",
    },
    index: {
      reportList: "报告清单",
      dependencies: "关键依赖关系",
      readingLines: "Mantle 最重要的阅读线索",
      statusCorrections: "状态修正",
      reportColumn: "报告",
      layerColumn: "Layer",
      upstreamColumn: "上游能力",
      effectColumn: "解锁/影响",
      reportsColumn: "相关报告",
    },
  },
  en: {
    reportsDir: "reports/en",
    indexFile: "INDEX.en.md",
    synthesisFile: "SYNTHESIS.en.md",
    fallbackLayer: "Appendix",
    appendixShortTitle: (title) => title,
    sections: {
      coverage: "Optimization Coverage",
      conclusion: "One-Page Conclusion",
      bottleneck: "Current Bottleneck",
      whyAppendix: "Why This Appendix Exists",
      mechanism: "Optimization Mechanism",
      howToRead: "How to Read This",
      futureEffect: "Future Effect",
      dependency: "Dependencies & Sequencing",
      risks: "Risks & Open Questions",
      mantleImpact: "Impact on Mantle",
      mantleActions: "Recommended Mantle Watchpoints",
      breakdown: "Item-by-Item Breakdown",
    },
    index: {
      reportList: "Report List",
      dependencies: "Key Dependencies",
      readingLines: "Most Important Reading Threads for Mantle",
      statusCorrections: "Status Corrections",
      reportColumn: "Report",
      layerColumn: "Layer",
      upstreamColumn: "Upstream capability",
      effectColumn: "Unlocks / impact",
      reportsColumn: "Related reports",
    },
  },
}

const groupOverrides: Readonly<Record<string, LayerId>> = {
  "01": "consensus",
  "02": "consensus",
  "03": "consensus",
  "04": "consensus",
  "05": "data",
  "06": "data",
  "07": "data",
  "08": "execution",
  "09": "execution",
  "10": "execution",
  "11": "execution",
  "12": "execution",
  "13": "account",
  "14": "account",
}

function readEvidenceFile(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), "evidence", file), "utf8")
}

function groupFor(number: string): LayerId {
  return groupOverrides[number] ?? "appendix"
}

function sourceLinks(file: string, sourceSection: string): readonly SourceLink[] {
  return parseSources(sourceSection).map((url, index) => ({
    id: `${file}-${index + 1}`,
    url,
    host: urlHost(url),
  }))
}

function metricFrom(markdown: string, regex: RegExp, fallback = 0): number {
  const match = markdown.match(regex)
  const value = match?.[1]
  return value === undefined ? fallback : Number(value)
}

function buildMetrics(verifyMarkdown: string, sourceUrls: readonly string[]): MetricSet {
  return {
    numberedReports: metricFrom(verifyMarkdown, /Numbered standalone reports:\s*(\d+)/),
    appendices: metricFrom(verifyMarkdown, /Appendices:\s*(\d+)/),
    uniqueUrls: metricFrom(verifyMarkdown, /Current unique URLs.*?:\s*(\d+)/, sourceUrls.length),
    sourceOk: metricFrom(verifyMarkdown, /OK:\s*(\d+)/),
    sourceRestricted: metricFrom(verifyMarkdown, /Restricted:\s*(\d+)/),
    sourceBad: metricFrom(verifyMarkdown, /Bad:\s*(\d+)/),
    requiredSectionErrors: metricFrom(verifyMarkdown, /Required section errors:\s*(\d+)/),
  }
}

function buildSynthesis(markdown: string): Synthesis {
  const map = sectionMap(markdown)
  return {
    executiveSummary: map["Executive Summary"] ?? "",
    findings: parseBullets(map["Findings by Theme"] ?? ""),
    verifiedClaims: parseBullets(map["Verified Claims"] ?? ""),
    gaps: parseBullets(map["Gaps"] ?? ""),
    expansionTrace: parseBullets(map["Expansion Trace"] ?? ""),
  }
}

function reportNumberFromFile(file: string): string {
  const numeric = file.match(/^(\d+)/)?.[1]
  if (numeric !== undefined) return numeric
  return file.startsWith("A-") ? "A" : "B"
}

function readReports(
  config: ContentConfig,
  layerByFile: ReadonlyMap<string, string>,
): readonly Report[] {
  const reportsPath = path.join(process.cwd(), config.reportsDir)
  return fs
    .readdirSync(reportsPath)
    .filter((file) => file.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right, "en"))
    .map((file) => {
      const markdown = fs.readFileSync(path.join(reportsPath, file), "utf8")
      const map = sectionMap(markdown)
      const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? file
      const number = reportNumberFromFile(file)
      const layer = layerByFile.get(file) ?? config.fallbackLayer
      const sources = sourceLinks(file, map["Sources"] ?? "")
      const { sections } = config

      return {
        slug: file.replace(/\.md$/, ""),
        number,
        title,
        shortTitle: config.appendixShortTitle(title.replace(/^\d+\s*/, "")),
        file: `${config.reportsDir}/${file}`,
        layer,
        group: groupFor(number),
        caveat: markdown.match(/^>\s*(.+)$/m)?.[1]?.trim() ?? "",
        coverage: stripMarkdown(map[sections.coverage] ?? ""),
        conclusion: map[sections.conclusion] ?? "",
        conclusionExcerpt: excerpt(map[sections.conclusion] ?? "", 190),
        bottleneck: map[sections.bottleneck] ?? map[sections.whyAppendix] ?? "",
        mechanism: map[sections.mechanism] ?? map[sections.howToRead] ?? "",
        futureEffect: map[sections.futureEffect] ?? "",
        dependency: map[sections.dependency] ?? "",
        risks: map[sections.risks] ?? "",
        mantleImpact: map[sections.mantleImpact] ?? "",
        mantleActions: parseBullets(map[sections.mantleActions] ?? ""),
        sources,
        sourceCount: sources.length,
        optimizations: parseMarkdownTable(map[sections.breakdown] ?? ""),
        sectionTitles: Object.keys(map),
        markdown,
      }
    })
}

export const getResearchData = cache((locale: Locale): ResearchData => {
  const config = contentConfigs[locale]
  const indexMarkdown = fs.readFileSync(path.join(process.cwd(), config.indexFile), "utf8")
  const verifyMarkdown = readEvidenceFile("verify-report.md")
  const sourceLedgerMarkdown = readEvidenceFile("source-ledger.md")
  const synthesisMarkdown = fs.readFileSync(path.join(process.cwd(), config.synthesisFile), "utf8")
  const indexSections = sectionMap(indexMarkdown)
  const indexRows = parseMarkdownTable(indexSections[config.index.reportList] ?? "")
  const layerByFile = new Map(
    indexRows.flatMap((row) => {
      const report = row[config.index.reportColumn]
      const layer = row[config.index.layerColumn]
      const pathMatch = report?.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const reportPath = pathMatch?.[2]
      if (reportPath === undefined || layer === undefined) return []
      return [[path.basename(reportPath), layer]]
    }),
  )
  const sourceUrls = Array.from(sourceLedgerMarkdown.matchAll(/https?:\/\/[^\s|)]+/g)).map(
    (match) => match[0],
  )

  return {
    metrics: buildMetrics(verifyMarkdown, sourceUrls),
    reports: readReports(config, layerByFile),
    dependencies: parseMarkdownTable(indexSections[config.index.dependencies] ?? "").map(
      (row, index): Dependency => ({
        id: `dep-${index + 1}`,
        upstream: stripMarkdown(row[config.index.upstreamColumn] ?? ""),
        effect: stripMarkdown(row[config.index.effectColumn] ?? ""),
        reports: (row[config.index.reportsColumn] ?? "").split(",").flatMap((item) => {
          const report = item.trim()
          return report.length > 0 ? [report] : []
        }),
      }),
    ),
    layerGuides: layerGuidesByLocale[locale],
    mantleTracks: mantleTracksByLocale[locale],
    statusCorrections: parseBullets(indexSections[config.index.statusCorrections] ?? ""),
    mantleReadingLines: parseBullets(indexSections[config.index.readingLines] ?? ""),
    synthesis: buildSynthesis(synthesisMarkdown),
    sourceHosts: Array.from(new Set(sourceUrls.map(urlHost))).sort(),
  }
})

export function getReportBySlug(locale: Locale, slug: string): Report | undefined {
  return getResearchData(locale).reports.find((report) => report.slug === slug)
}
