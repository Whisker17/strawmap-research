import type { Metadata } from "next"
import { SynthesisScreen } from "@/components/screens"
import { ui } from "@/lib/i18n"

export const metadata: Metadata = {
  title: ui.zh.synthesisMetaTitle,
  description: ui.zh.synthesisMetaDescription,
}

export default function ChineseSynthesisPage() {
  return <SynthesisScreen locale="zh" />
}
