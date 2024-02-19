import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <body className="md:overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
