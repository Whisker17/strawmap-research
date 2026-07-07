import { ExternalLink, GitBranch, ShieldCheck, Sparkles, Target } from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, ui } from "@/lib/i18n"
import type { ResearchData } from "@/lib/types"
import { MarkdownContent } from "./MarkdownContent"
import { ReportChips } from "./ReportIndex"

export function SynthesisHero({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="synthesis-hero" aria-labelledby="synthesis-title">
      <span className="eyebrow">{strings.synthesisEyebrow}</span>
      <h1 id="synthesis-title">{strings.synthesisTitle}</h1>
      <p className="landing-lead">{data.synthesis.executiveSummary}</p>
    </section>
  )
}

export function SynthesisBlock({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="synthesis-section" aria-labelledby="synthesis-findings">
      <div className="section-heading">
        <Sparkles aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.findingsEyebrow}</span>
          <h2 id="synthesis-findings">{strings.findingsTitle}</h2>
        </div>
      </div>
      <MarkdownContent markdown={data.synthesis.findings.map((item) => `- ${item}`).join("\n")} />
    </section>
  )
}

export function DependencySpine({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="dependency-section" aria-labelledby="dependency-spine">
      <div className="section-heading">
        <GitBranch aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.dependencyEyebrow}</span>
          <h2 id="dependency-spine">{strings.dependencyTitle}</h2>
        </div>
      </div>
      <p className="section-lead">{strings.dependencyLead}</p>
      <div className="spine-list">
        {data.dependencies.map((dependency, index) => (
          <article className="spine-row" key={dependency.id}>
            <div className="spine-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{dependency.upstream}</h3>
              <p>{dependency.effect}</p>
            </div>
            <ReportChips locale={locale} numbers={dependency.reports} reports={data.reports} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function MantleBoard({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]

  return (
    <section className="mantle-section" aria-labelledby="mantle-board">
      <div className="section-heading">
        <Target aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.mantleEyebrow}</span>
          <h2 id="mantle-board">{strings.mantleTitle}</h2>
        </div>
      </div>
      <div className="mantle-board">
        {data.mantleTracks.map((track) => (
          <article className="mantle-lane" key={track.id}>
            <h3>{track.label}</h3>
            <p>{track.body}</p>
            <ReportChips locale={locale} numbers={track.reports} reports={data.reports} />
          </article>
        ))}
      </div>
      <div className="mantle-lines">
        <h3>{strings.mantleLinesTitle}</h3>
        <ul>
          {data.mantleReadingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function EvidenceSection({
  data,
  locale,
}: {
  readonly data: ResearchData
  readonly locale: Locale
}) {
  const strings = ui[locale]
  const { metrics } = data

  return (
    <section className="evidence-section" aria-labelledby="evidence-title">
      <div className="section-heading">
        <ShieldCheck aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">{strings.evidenceEyebrow}</span>
          <h2 id="evidence-title">{strings.evidenceTitle}</h2>
        </div>
      </div>
      <dl className="metric-list metric-list-row">
        <div>
          <dt>{strings.metricReports}</dt>
          <dd>{strings.metricReportsValue(metrics.numberedReports, metrics.appendices)}</dd>
        </div>
        <div>
          <dt>{strings.metricSources}</dt>
          <dd>{metrics.uniqueUrls}</dd>
        </div>
        <div>
          <dt>{strings.metricReachability}</dt>
          <dd>
            {metrics.sourceOk} OK / {metrics.sourceRestricted} restricted / {metrics.sourceBad} bad
          </dd>
        </div>
        <div>
          <dt>{strings.metricStructure}</dt>
          <dd>{metrics.requiredSectionErrors} errors</dd>
        </div>
      </dl>
      <div className="status-corrections">
        <h3>{strings.statusCorrectionsTitle}</h3>
        <ul>
          {data.statusCorrections.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="source-hosts">
        <h3>{strings.sourceHostsTitle}</h3>
        <p>{data.sourceHosts.slice(0, 12).join(" · ")}</p>
      </div>
      <div className="evidence-links">
        <Link href={localePath(locale, "/reports/A-fork-status-and-north-star-caveats")}>
          {strings.appendixALink}
        </Link>
        <Link href={localePath(locale, "/reports/B-ambiguous-label-crosswalk")}>
          {strings.appendixBLink}
        </Link>
        <Link href="/evidence/verify-report.md">
          {strings.verifyReportLink}
          <ExternalLink aria-hidden="true" size={14} />
        </Link>
      </div>
    </section>
  )
}
