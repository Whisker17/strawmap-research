import { Fragment, type ReactNode } from "react"

type TextToken = {
  readonly kind: "text"
  readonly id: string
  readonly text: string
}

type LinkToken = {
  readonly kind: "link"
  readonly id: string
  readonly label: string
  readonly href: string
}

type CodeToken = {
  readonly kind: "code"
  readonly id: string
  readonly text: string
}

type StrongToken = {
  readonly kind: "strong"
  readonly id: string
  readonly text: string
}

type InlineToken = TextToken | LinkToken | CodeToken | StrongToken

function assertNever(value: never): never {
  throw new Error(`Unexpected inline token: ${String(value)}`)
}

function inlineTokens(text: string): readonly InlineToken[] {
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g
  const tokens: InlineToken[] = []
  let cursor = 0
  let match = pattern.exec(text)

  while (match !== null) {
    if (match.index > cursor) {
      tokens.push({ id: `text-${cursor}`, kind: "text", text: text.slice(cursor, match.index) })
    }

    const label = match[2]
    const href = match[3]
    const code = match[4]
    const strong = match[5]
    if (label !== undefined && href !== undefined) {
      tokens.push({ href, id: `link-${match.index}`, kind: "link", label })
    } else if (code !== undefined) {
      tokens.push({ id: `code-${match.index}`, kind: "code", text: code })
    } else if (strong !== undefined) {
      tokens.push({ id: `strong-${match.index}`, kind: "strong", text: strong })
    }

    cursor = match.index + match[0].length
    match = pattern.exec(text)
  }

  if (cursor < text.length) {
    tokens.push({ id: `text-${cursor}`, kind: "text", text: text.slice(cursor) })
  }
  return tokens
}

function InlineTokenView({ token }: { readonly token: InlineToken }): ReactNode {
  switch (token.kind) {
    case "text":
      return <Fragment>{token.text}</Fragment>
    case "link":
      return (
        <a href={token.href} rel="noreferrer" target="_blank">
          {token.label}
        </a>
      )
    case "code":
      return <code>{token.text}</code>
    case "strong":
      return <strong>{token.text}</strong>
    default:
      return assertNever(token)
  }
}

export function InlineMarkdown({ text }: { readonly text: string }) {
  return (
    <>
      {inlineTokens(text).map((token) => (
        <InlineTokenView key={token.id} token={token} />
      ))}
    </>
  )
}
