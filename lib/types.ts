const layerIds = ["consensus", "data", "execution", "account", "appendix"] as const

export type LayerId = (typeof layerIds)[number]

export type MetricSet = {
  readonly numberedReports: number
  readonly appendices: number
  readonly uniqueUrls: number
  readonly sourceOk: number
  readonly sourceRestricted: number
  readonly sourceBad: number
  readonly requiredSectionErrors: number
}

export type SourceLink = {
  readonly id: string
  readonly url: string
  readonly host: string
}

export type TableRow = Readonly<Record<string, string>>

export type ReportSummary = {
  readonly slug: string
  readonly number: string
  readonly title: string
  readonly shortTitle: string
  readonly file: string
  readonly layer: string
  readonly group: LayerId
  readonly caveat: string
  readonly coverage: string
  readonly conclusionExcerpt: string
  readonly sourceCount: number
}

export type Report = ReportSummary & {
  readonly markdown: string
  readonly conclusion: string
  readonly bottleneck: string
  readonly mechanism: string
  readonly futureEffect: string
  readonly dependency: string
  readonly risks: string
  readonly mantleImpact: string
  readonly mantleActions: readonly string[]
  readonly sources: readonly SourceLink[]
  readonly optimizations: readonly TableRow[]
  readonly sectionTitles: readonly string[]
}

export type Dependency = {
  readonly id: string
  readonly upstream: string
  readonly effect: string
  readonly reports: readonly string[]
}

export type LayerSummary = {
  readonly id: Exclude<LayerId, "appendix">
  readonly label: string
  readonly accent: string
  readonly problem: string
  readonly change: string
  readonly reportNumbers: readonly string[]
}

export type MantleTrack = {
  readonly id: string
  readonly label: string
  readonly body: string
  readonly reports: readonly string[]
}

export type Synthesis = {
  readonly executiveSummary: string
  readonly findings: readonly string[]
  readonly verifiedClaims: readonly string[]
  readonly gaps: readonly string[]
  readonly expansionTrace: readonly string[]
}

export type ResearchData = {
  readonly metrics: MetricSet
  readonly reports: readonly Report[]
  readonly dependencies: readonly Dependency[]
  readonly layerSummaries: readonly LayerSummary[]
  readonly mantleTracks: readonly MantleTrack[]
  readonly statusCorrections: readonly string[]
  readonly mantleReadingLines: readonly string[]
  readonly synthesis: Synthesis
  readonly sourceHosts: readonly string[]
}
