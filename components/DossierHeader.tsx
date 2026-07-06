import { BookOpen, FileText, ShieldCheck } from "lucide-react"
import Link from "next/link"
import type { MetricSet } from "@/lib/types"

export function DossierHeader({
  metrics,
  variant,
}: {
  readonly metrics: MetricSet
  readonly variant: "overview" | "report"
}) {
  return (
    <header className="dossier-header">
      <a className="skip-link" href="#content">
        跳到正文
      </a>
      <div className="header-inner">
        <Link className="brand-mark" href="/">
          <BookOpen aria-hidden="true" size={20} strokeWidth={1.8} />
          <span>Ethereum Strawmap Dossier</span>
        </Link>
        <nav aria-label="主导航" className="header-links">
          <Link aria-current={variant === "overview" ? "page" : undefined} href="/">
            <FileText aria-hidden="true" size={16} />
            Atlas
          </Link>
          <Link href="/REPORT_PACK.pdf">
            <ShieldCheck aria-hidden="true" size={16} />
            PDF
          </Link>
        </nav>
      </div>
      <div className="status-strip" role="status">
        <span>{metrics.numberedReports} 份主报告</span>
        <span>{metrics.appendices} 个附录</span>
        <span>{metrics.uniqueUrls} 个来源</span>
        <span>
          {metrics.sourceOk} OK / {metrics.sourceRestricted} restricted / {metrics.sourceBad} bad
        </span>
      </div>
    </header>
  )
}
