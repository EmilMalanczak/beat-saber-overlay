import Document, { Head, Main, NextScript, Html } from 'next/document'
import { ServerStyles, createStylesServer } from '@mantine/ssr'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Beat saber overlay generator</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Teko:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="57x57" href="/assets/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/assets/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/assets/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/assets/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/assets/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/assets/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/assets/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-icon-180x180.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/assets/android-icon-192x192.png"
          />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const initialProps = await Document.getInitialProps(ctx)

  const stylesServer = createStylesServer()

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <ServerStyles html={initialProps.html} server={stylesServer} />
      </>
    )
  }
}
