import type { Metadata } from "next"
import { ui } from "@/lib/i18n"

export const metadata: Metadata = {
  title: ui.zh.siteTitle,
  description: ui.zh.siteDescription,
}

export default function ChineseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div lang="zh-Hans">{children}</div>
}
