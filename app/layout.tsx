import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ethereum Strawmap Dossier for Mantle",
  description:
    "A structured Next.js reader for the Ethereum Strawmap research pack and Mantle impact analysis.",
  icons: {
    icon: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const enableDevTools =
    process.env.NODE_ENV === "development" &&
    process.env["NEXT_PUBLIC_DISABLE_REACT_DEVTOOLS"] !== "1"

  return (
    <html lang="zh-Hans">
      <head>
        {enableDevTools ? (
          <>
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
              strategy="beforeInteractive"
            />
          </>
        ) : null}
      </head>
      <body>{children}</body>
    </html>
  )
}
