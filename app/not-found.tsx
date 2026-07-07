import Link from "next/link"

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <p>
        This dossier only contains the 14 main reports and 2 appendices from the research pack.
        <span lang="zh-Hans">（当前站点只包含研究包里的 14 份主报告和 2 个附录。）</span>
      </p>
      <Link className="primary-link" href="/">
        Back to the atlas
      </Link>
    </main>
  )
}
