import { BookOpen } from "lucide-react"
import Link from "next/link"
import { layerGuides } from "@/lib/roadmap"

export function DossierHeader({ active }: { readonly active?: string }) {
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
          <Link aria-current={active === "home" ? "page" : undefined} href="/">
            首页
          </Link>
          {layerGuides.map((guide) => (
            <Link
              aria-current={active === guide.id ? "page" : undefined}
              data-group={guide.id}
              href={`/layers/${guide.id}`}
              key={guide.id}
            >
              {guide.label}
            </Link>
          ))}
          <Link aria-current={active === "synthesis" ? "page" : undefined} href="/synthesis">
            综合与证据
          </Link>
          <Link href="/REPORT_PACK.pdf">PDF</Link>
        </nav>
      </div>
    </header>
  )
}
