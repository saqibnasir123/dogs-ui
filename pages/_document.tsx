import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head />
      <body style={{backgroundColor:'white'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}