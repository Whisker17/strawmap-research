import type { TableRow } from "./types"

export type MarkdownSection = {
  readonly title: string
  readonly body: string
}

export function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^>\s*/gm, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function excerpt(value: string, maxLength: number): string {
  const text = stripMarkdown(value)
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}...`
}

export function sectionMap(markdown: string): Readonly<Record<string, string>> {
  const matches = Array.from(markdown.matchAll(/^##\s+(.+)$/gm))
  const sections: Record<string, string> = {}

  matches.forEach((match, index) => {
    const rawTitle = match[1]
    if (rawTitle === undefined) return
    const nextMatch = matches[index + 1]
    const start = match.index + match[0].length
    const end = nextMatch?.index ?? markdown.length
    sections[rawTitle.trim()] = markdown.slice(start, end).trim()
  })

  return sections
}

export function sections(markdown: string): readonly MarkdownSection[] {
  const matches = Array.from(markdown.matchAll(/^##\s+(.+)$/gm))
  return matches.flatMap((match, index) => {
    const rawTitle = match[1]
    if (rawTitle === undefined) return []
    const nextMatch = matches[index + 1]
    const start = match.index + match[0].length
    const end = nextMatch?.index ?? markdown.length
    return [{ title: rawTitle.trim(), body: markdown.slice(start, end).trim() }]
  })
}

export function parseMarkdownTable(section: string): readonly TableRow[] {
  const rows = section
    .split("\n")
    .filter((line) => /^\s*\|/.test(line))
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    )
    .filter((cells) => cells.length > 1)

  const header = rows[0]
  if (header === undefined || rows.length < 2) return []

  return rows.slice(2).flatMap((cells) => {
    if (cells.length !== header.length) return []
    const row: Record<string, string> = {}
    header.forEach((key, index) => {
      const value = cells[index]
      if (key.length > 0 && value !== undefined) row[key] = value
    })
    return [row]
  })
}

export function parseBullets(section: string): readonly string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, "").trim())
}

export function parseSources(section: string): readonly string[] {
  return parseBullets(section).flatMap((line) => {
    const match = line.match(/https?:\/\/[^\s)]+/)
    const url = match?.[0]
    return url === undefined ? [] : [url]
  })
}

export function urlHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}
