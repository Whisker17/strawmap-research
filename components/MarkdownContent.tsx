import type { ReactNode } from "react"
import { parseMarkdownTable } from "@/lib/markdown"
import { InlineMarkdown } from "./InlineMarkdown"

type BlockBase = {
  readonly id: string
}

type ParagraphBlock = BlockBase & {
  readonly kind: "paragraph"
  readonly text: string
}

type QuoteBlock = BlockBase & {
  readonly kind: "quote"
  readonly text: string
}

type ListBlock = BlockBase & {
  readonly kind: "list"
  readonly items: readonly string[]
}

type TableBlock = BlockBase & {
  readonly kind: "table"
  readonly rows: readonly Readonly<Record<string, string>>[]
}

type HeadingBlock = BlockBase & {
  readonly kind: "heading"
  readonly level: 3 | 4
  readonly text: string
}

type MarkdownBlock = ParagraphBlock | QuoteBlock | ListBlock | TableBlock | HeadingBlock

function assertNever(value: never): never {
  throw new Error(`Unexpected markdown block: ${String(value)}`)
}

function blockId(kind: MarkdownBlock["kind"], line: number, text: string): string {
  return `${kind}-${line + 1}-${text.slice(0, 64)}`
}

function parseBlocks(markdown: string): readonly MarkdownBlock[] {
  const lines = markdown.split("\n")
  const blocks: MarkdownBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]?.trim() ?? ""
    if (line.length === 0) {
      index += 1
      continue
    }

    if (line.startsWith("### ")) {
      blocks.push({
        id: blockId("heading", index, line),
        kind: "heading",
        level: 3,
        text: line.replace(/^###\s+/, ""),
      })
      index += 1
      continue
    }

    if (line.startsWith("#### ")) {
      blocks.push({
        id: blockId("heading", index, line),
        kind: "heading",
        level: 4,
        text: line.replace(/^####\s+/, ""),
      })
      index += 1
      continue
    }

    if (line.startsWith(">")) {
      const text = line.replace(/^>\s*/, "")
      blocks.push({ id: blockId("quote", index, text), kind: "quote", text })
      index += 1
      continue
    }

    if (line.startsWith("|")) {
      const tableLines: string[] = []
      const startLine = index
      while (index < lines.length && (lines[index]?.trim().startsWith("|") ?? false)) {
        tableLines.push(lines[index] ?? "")
        index += 1
      }
      blocks.push({
        id: blockId("table", startLine, tableLines[0] ?? ""),
        kind: "table",
        rows: parseMarkdownTable(tableLines.join("\n")),
      })
      continue
    }

    if (line.startsWith("- ")) {
      const items: string[] = []
      const startLine = index
      while (index < lines.length && (lines[index]?.trim().startsWith("- ") ?? false)) {
        items.push((lines[index] ?? "").trim().replace(/^-\s+/, ""))
        index += 1
      }
      blocks.push({ id: blockId("list", startLine, items[0] ?? ""), kind: "list", items })
      continue
    }

    const paragraph: string[] = []
    const startLine = index
    while (index < lines.length) {
      const current = lines[index]?.trim() ?? ""
      if (
        current.length === 0 ||
        current.startsWith(">") ||
        current.startsWith("|") ||
        current.startsWith("- ") ||
        current.startsWith("### ")
      ) {
        break
      }
      paragraph.push(current)
      index += 1
    }
    const text = paragraph.join(" ")
    blocks.push({ id: blockId("paragraph", startLine, text), kind: "paragraph", text })
  }

  return blocks
}

function TableView({ rows }: { readonly rows: readonly Readonly<Record<string, string>>[] }) {
  const firstRow = rows[0]
  if (firstRow === undefined) return null
  const headers = Object.keys(firstRow)

  return (
    <div className="markdown-table-wrap">
      <table className="markdown-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={Object.values(row).join("|")}>
              {headers.map((header) => (
                <td key={header}>
                  <InlineMarkdown text={row[header] ?? ""} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MarkdownBlockView({ block }: { readonly block: MarkdownBlock }): ReactNode {
  switch (block.kind) {
    case "heading":
      return block.level === 3 ? (
        <h3>
          <InlineMarkdown text={block.text} />
        </h3>
      ) : (
        <h4>
          <InlineMarkdown text={block.text} />
        </h4>
      )
    case "paragraph":
      return (
        <p>
          <InlineMarkdown text={block.text} />
        </p>
      )
    case "quote":
      return (
        <blockquote>
          <InlineMarkdown text={block.text} />
        </blockquote>
      )
    case "list":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>
              <InlineMarkdown text={item} />
            </li>
          ))}
        </ul>
      )
    case "table":
      return <TableView rows={block.rows} />
    default:
      return assertNever(block)
  }
}

export function MarkdownContent({ markdown }: { readonly markdown: string }) {
  if (markdown.trim().length === 0) return null
  return (
    <div className="markdown-content">
      {parseBlocks(markdown).map((block) => (
        <MarkdownBlockView block={block} key={block.id} />
      ))}
    </div>
  )
}
