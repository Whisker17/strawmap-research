import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileResponse } from "@/lib/file-response"

export const dynamic = "force-static"

export async function GET() {
  const body = await readFile(path.join(process.cwd(), "REPORT_PACK.md"))
  return fileResponse(body, {
    contentType: "text/markdown; charset=utf-8",
    disposition: 'inline; filename="REPORT_PACK.md"',
  })
}
