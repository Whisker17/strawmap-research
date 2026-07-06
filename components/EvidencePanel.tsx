import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { MetricSet } from "@/lib/types"

export function EvidencePanel({
  metrics,
  hosts,
  statusCorrections,
}: {
  readonly metrics: MetricSet
  readonly hosts: readonly string[]
  readonly statusCorrections: readonly string[]
}) {
  return (
    <aside className="evidence-panel" aria-label="验证与来源">
      <div className="panel-title">
        <span>Evidence</span>
        <strong>{metrics.requiredSectionErrors} structure errors</strong>
      </div>
      <dl className="metric-list">
        <div>
          <dt>Reports</dt>
          <dd>
            {metrics.numberedReports} + {metrics.appendices}
          </dd>
        </div>
        <div>
          <dt>Sources</dt>
          <dd>{metrics.uniqueUrls}</dd>
        </div>
        <div>
          <dt>Reachability</dt>
          <dd>{metrics.sourceOk} OK</dd>
        </div>
      </dl>
      <div className="status-corrections">
        <h3>状态修正</h3>
        <ul>
          {statusCorrections.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      <div className="source-hosts">
        <h3>高频来源域</h3>
        <p>{hosts.slice(0, 12).join(" · ")}</p>
      </div>
      <div className="evidence-links">
        <Link href="/reports/A-fork-status-and-north-star-caveats">Appendix A</Link>
        <Link href="/reports/B-ambiguous-label-crosswalk">Appendix B</Link>
        <Link href="/evidence/verify-report.md">
          Verify report
          <ExternalLink aria-hidden="true" size={14} />
        </Link>
      </div>
    </aside>
  )
}
