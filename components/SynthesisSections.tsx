import { ExternalLink, GitBranch, ShieldCheck, Sparkles, Target } from "lucide-react"
import Link from "next/link"
import type { ResearchData } from "@/lib/types"
import { MarkdownContent } from "./MarkdownContent"
import { ReportChips } from "./ReportIndex"

export function SynthesisHero({ data }: { readonly data: ResearchData }) {
  return (
    <section className="synthesis-hero" aria-labelledby="synthesis-title">
      <span className="eyebrow">Cross-layer synthesis</span>
      <h1 id="synthesis-title">综合结论与证据</h1>
      <p className="landing-lead">{data.synthesis.executiveSummary}</p>
    </section>
  )
}

export function SynthesisBlock({ data }: { readonly data: ResearchData }) {
  return (
    <section className="synthesis-section" aria-labelledby="synthesis-findings">
      <div className="section-heading">
        <Sparkles aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Findings</span>
          <h2 id="synthesis-findings">核心发现</h2>
        </div>
      </div>
      <MarkdownContent markdown={data.synthesis.findings.map((item) => `- ${item}`).join("\n")} />
    </section>
  )
}

export function DependencySpine({ data }: { readonly data: ResearchData }) {
  return (
    <section className="dependency-section" aria-labelledby="dependency-spine">
      <div className="section-heading">
        <GitBranch aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Dependency spine</span>
          <h2 id="dependency-spine">优化点之间的依赖脉络</h2>
        </div>
      </div>
      <p className="section-lead">
        这些优化点不是并列清单：上游能力决定下游能不能落地。评估任何单项的时间线时，先看它在这条脊柱上的位置。
      </p>
      <div className="spine-list">
        {data.dependencies.map((dependency, index) => (
          <article className="spine-row" key={dependency.id}>
            <div className="spine-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{dependency.upstream}</h3>
              <p>{dependency.effect}</p>
            </div>
            <ReportChips numbers={dependency.reports} reports={data.reports} />
          </article>
        ))}
      </div>
    </section>
  )
}

export function MantleBoard({ data }: { readonly data: ResearchData }) {
  return (
    <section className="mantle-section" aria-labelledby="mantle-board">
      <div className="section-heading">
        <Target aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Mantle reading board</span>
          <h2 id="mantle-board">落到 Mantle：四条关注线</h2>
        </div>
      </div>
      <div className="mantle-board">
        {data.mantleTracks.map((track) => (
          <article className="mantle-lane" key={track.id}>
            <h3>{track.label}</h3>
            <p>{track.body}</p>
            <ReportChips numbers={track.reports} reports={data.reports} />
          </article>
        ))}
      </div>
      <div className="mantle-lines">
        <h3>Mantle 最重要的阅读线索</h3>
        <ul>
          {data.mantleReadingLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function EvidenceSection({ data }: { readonly data: ResearchData }) {
  const { metrics } = data

  return (
    <section className="evidence-section" aria-labelledby="evidence-title">
      <div className="section-heading">
        <ShieldCheck aria-hidden="true" size={20} />
        <div>
          <span className="eyebrow">Evidence</span>
          <h2 id="evidence-title">验证记录与来源</h2>
        </div>
      </div>
      <dl className="metric-list metric-list-row">
        <div>
          <dt>报告</dt>
          <dd>
            {metrics.numberedReports} 篇 + {metrics.appendices} 个附录
          </dd>
        </div>
        <div>
          <dt>独立来源</dt>
          <dd>{metrics.uniqueUrls}</dd>
        </div>
        <div>
          <dt>可达性</dt>
          <dd>
            {metrics.sourceOk} OK / {metrics.sourceRestricted} restricted / {metrics.sourceBad} bad
          </dd>
        </div>
        <div>
          <dt>结构校验</dt>
          <dd>{metrics.requiredSectionErrors} errors</dd>
        </div>
      </dl>
      <div className="status-corrections">
        <h3>状态修正</h3>
        <ul>
          {data.statusCorrections.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="source-hosts">
        <h3>高频来源域</h3>
        <p>{data.sourceHosts.slice(0, 12).join(" · ")}</p>
      </div>
      <div className="evidence-links">
        <Link href="/reports/A-fork-status-and-north-star-caveats">Appendix A · Fork status</Link>
        <Link href="/reports/B-ambiguous-label-crosswalk">Appendix B · 模糊标签 crosswalk</Link>
        <Link href="/evidence/verify-report.md">
          Verify report
          <ExternalLink aria-hidden="true" size={14} />
        </Link>
      </div>
    </section>
  )
}
