type ServedFile = {
  readonly contentType: string
  readonly disposition?: string
}

export function fileResponse(body: BodyInit, file: ServedFile): Response {
  const headers = new Headers({
    "Cache-Control": "public, max-age=0, must-revalidate",
    "Content-Type": file.contentType,
  })
  if (file.disposition !== undefined) {
    headers.set("Content-Disposition", file.disposition)
  }
  return new Response(body, { headers })
}
