import NextDocument, {Head, Main, NextScript} from 'next/document'

export default class Document extends NextDocument {
  public render() {
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          {process.env.NODE_ENV !== 'development' && <link href='/_next/static/style.css' rel='stylesheet' />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
