import Link from "next/link"

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">404</span>
      <h1>没有找到这份报告</h1>
      <p>当前 dossier 只包含根目录研究包里的 14 份主报告和 2 个附录。</p>
      <Link className="primary-link" href="/">
        返回图册
      </Link>
    </main>
  )
}
