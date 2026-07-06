import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileResponse } from "@/lib/file-response"

const reportPackPdf = readFile(path.join(process.cwd(), "REPORT_PACK.pdf"))

export async function GET() {
  const body = await reportPackPdf
  return fileResponse(body, {
    contentType: "application/pdf",
    disposition: 'inline; filename="REPORT_PACK.pdf"',
  })
}
