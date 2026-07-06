import fs from "node:fs"
import path from "node:path"
import { cache } from "react"
import {
  excerpt,
  parseBullets,
  parseMarkdownTable,
  parseSources,
  sectionMap,
  stripMarkdown,
  urlHost,
} from "./markdown"
import { layerSummaries, mantleTracks } from "./roadmap"
import type {
  Dependency,
  LayerId,
  MetricSet,
  Report,
  ResearchData,
  SourceLink,
  Synthesis,
} from "./types"

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

function readReportFile(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), "reports", file), "utf8")
}

function groupFor(number: string, layer: string): LayerId {
  const override = groupOverrides[number]
  if (override !== undefined) return override
  if (layer.includes("数据")) return "data"
  if (layer.includes("账户") || layer.includes("隐私")) return "account"
  if (layer.includes("执行")) return "execution"
  if (layer.includes("共识")) return "consensus"
  return "appendix"
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

function readReports(layerByPath: ReadonlyMap<string, string>): readonly Report[] {
  return fs
    .readdirSync(path.join(process.cwd(), "reports"))
    .filter((file) => file.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right, "en"))
    .map((file) => {
      const relativePath = `reports/${file}`
      const markdown = readReportFile(file)
      const map = sectionMap(markdown)
      const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? file
      const number = reportNumberFromFile(file)
      const layer = layerByPath.get(relativePath) ?? "附录"
      const sources = sourceLinks(file, map["Sources"] ?? "")

      return {
        slug: file.replace(/\.md$/, ""),
        number,
        title,
        shortTitle: title.replace(/^\d+\s*/, "").replace(/^Appendix\s*/, "附录 "),
        file: relativePath,
        layer,
        group: groupFor(number, layer),
        caveat: markdown.match(/^>\s*(.+)$/m)?.[1]?.trim() ?? "",
        coverage: stripMarkdown(map["优化点覆盖"] ?? ""),
        conclusion: map["一页结论"] ?? "",
        conclusionExcerpt: excerpt(map["一页结论"] ?? "", 190),
        bottleneck: map["当前瓶颈"] ?? map["为什么需要这个附录"] ?? "",
        mechanism: map["优化机制"] ?? map["读法"] ?? "",
        futureEffect: map["未来效果"] ?? "",
        dependency: map["依赖与先后关系"] ?? "",
        risks: map["风险与未决问题"] ?? "",
        mantleImpact: map["对 Mantle 的影响"] ?? "",
        mantleActions: parseBullets(map["建议 Mantle 关注"] ?? ""),
        sources,
        sourceCount: sources.length,
        optimizations: parseMarkdownTable(map["逐项拆解"] ?? ""),
        sectionTitles: Object.keys(map),
        markdown,
      }
    })
}

export const getResearchData = cache((): ResearchData => {
  const indexMarkdown = fs.readFileSync(path.join(process.cwd(), "INDEX.md"), "utf8")
  const verifyMarkdown = readEvidenceFile("verify-report.md")
  const sourceLedgerMarkdown = readEvidenceFile("source-ledger.md")
  const synthesisMarkdown = fs.readFileSync(path.join(process.cwd(), "SYNTHESIS.md"), "utf8")
  const indexSections = sectionMap(indexMarkdown)
  const indexRows = parseMarkdownTable(indexSections["报告清单"] ?? "")
  const layerByPath = new Map(
    indexRows.flatMap((row) => {
      const report = row["报告"]
      const layer = row["Layer"]
      const pathMatch = report?.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const reportPath = pathMatch?.[2]
      if (reportPath === undefined || layer === undefined) return []
      return [[reportPath, layer]]
    }),
  )
  const sourceUrls = Array.from(sourceLedgerMarkdown.matchAll(/https?:\/\/[^\s|)]+/g)).map(
    (match) => match[0],
  )

  return {
    metrics: buildMetrics(verifyMarkdown, sourceUrls),
    reports: readReports(layerByPath),
    dependencies: parseMarkdownTable(indexSections["关键依赖关系"] ?? "").map(
      (row, index): Dependency => ({
        id: `dep-${index + 1}`,
        upstream: stripMarkdown(row["上游能力"] ?? ""),
        effect: stripMarkdown(row["解锁/影响"] ?? ""),
        reports: (row["相关报告"] ?? "").split(",").flatMap((item) => {
          const report = item.trim()
          return report.length > 0 ? [report] : []
        }),
      }),
    ),
    layerSummaries,
    mantleTracks,
    statusCorrections: parseBullets(indexSections["状态修正"] ?? ""),
    mantleReadingLines: parseBullets(indexSections["Mantle 最重要的阅读线索"] ?? ""),
    synthesis: buildSynthesis(synthesisMarkdown),
    sourceHosts: Array.from(new Set(sourceUrls.map(urlHost))).sort(),
  }
})

export function getReportBySlug(slug: string): Report | undefined {
  return getResearchData().reports.find((report) => report.slug === slug)
}
