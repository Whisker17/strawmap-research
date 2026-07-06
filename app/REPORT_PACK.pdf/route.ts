import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileResponse } from "@/lib/file-response"

export const dynamic = "force-static"

export async function GET() {
  const body = await readFile(path.join(process.cwd(), "REPORT_PACK.pdf"))
  return fileResponse(body, {
    contentType: "application/pdf",
    disposition: 'inline; filename="REPORT_PACK.pdf"',
  })
}
