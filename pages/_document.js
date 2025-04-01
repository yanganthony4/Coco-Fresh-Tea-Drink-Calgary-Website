// pages/_document.js (or app/_document.js for Next.js 13+)
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" type="image/png" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
