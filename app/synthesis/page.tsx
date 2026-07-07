import type { Metadata } from "next"
import { SynthesisScreen } from "@/components/screens"
import { ui } from "@/lib/i18n"

export const metadata: Metadata = {
  title: ui.en.synthesisMetaTitle,
  description: ui.en.synthesisMetaDescription,
}

export default function SynthesisPage() {
  return <SynthesisScreen locale="en" />
}
