import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileResponse } from "@/lib/file-response"

const reportPackMarkdown = readFile(path.join(process.cwd(), "REPORT_PACK.md"))

export async function GET() {
  const body = await reportPackMarkdown
  return fileResponse(body, {
    contentType: "text/markdown; charset=utf-8",
    disposition: 'inline; filename="REPORT_PACK.md"',
  })
}
