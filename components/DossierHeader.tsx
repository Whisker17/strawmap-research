import { BookOpen, Languages } from "lucide-react"
import Link from "next/link"
import { type Locale, localePath, otherLocale, ui } from "@/lib/i18n"
import { layerGuidesByLocale } from "@/lib/roadmap"

export function DossierHeader({
  locale,
  path,
  active,
}: {
  readonly locale: Locale
  readonly path: string
  readonly active?: string
}) {
  const strings = ui[locale]
  const toggleLocale = otherLocale(locale)

  return (
    <header className="dossier-header">
      <a className="skip-link" href="#content">
        {strings.skipToContent}
      </a>
      <div className="header-inner">
        <Link className="brand-mark" href={localePath(locale, "/")}>
          <BookOpen aria-hidden="true" size={20} strokeWidth={1.8} />
          <span>Ethereum Strawmap Dossier</span>
        </Link>
        <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"} className="header-links">
          <Link
            aria-current={active === "home" ? "page" : undefined}
            href={localePath(locale, "/")}
          >
            {strings.navHome}
          </Link>
          {layerGuidesByLocale[locale].map((guide) => (
            <Link
              aria-current={active === guide.id ? "page" : undefined}
              data-group={guide.id}
              href={localePath(locale, `/layers/${guide.id}`)}
              key={guide.id}
            >
              {guide.navLabel}
            </Link>
          ))}
          <Link
            aria-current={active === "synthesis" ? "page" : undefined}
            href={localePath(locale, "/synthesis")}
          >
            {strings.navSynthesis}
          </Link>
          <Link href="/REPORT_PACK.pdf">{strings.navPdf}</Link>
          <Link
            className="locale-toggle"
            href={localePath(toggleLocale, path)}
            lang={toggleLocale === "zh" ? "zh-Hans" : "en"}
          >
            <Languages aria-hidden="true" size={15} />
            {strings.languageToggle}
          </Link>
        </nav>
      </div>
    </header>
  )
}
