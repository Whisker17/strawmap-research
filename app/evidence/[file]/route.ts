import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileResponse } from "@/lib/file-response"

export const dynamic = "force-static"

const evidenceFiles = ["claim-ledger.md", "source-ledger.md", "verify-report.md"] as const

export function generateStaticParams() {
  return evidenceFiles.map((file) => ({ file }))
}

export async function GET(
  _request: Request,
  { params }: { readonly params: Promise<{ file: string }> },
) {
  const { file } = await params
  switch (file) {
    case "claim-ledger.md": {
      const body = await readFile(path.join(process.cwd(), "evidence", "claim-ledger.md"))
      return fileResponse(body, { contentType: "text/markdown; charset=utf-8" })
    }
    case "source-ledger.md": {
      const body = await readFile(path.join(process.cwd(), "evidence", "source-ledger.md"))
      return fileResponse(body, { contentType: "text/markdown; charset=utf-8" })
    }
    case "verify-report.md": {
      const body = await readFile(path.join(process.cwd(), "evidence", "verify-report.md"))
      return fileResponse(body, { contentType: "text/markdown; charset=utf-8" })
    }
    default:
      return new Response("Not found", { status: 404 })
  }
}
