import "../styles/globals.css";
import Layout from "./components/Footer"; // Adjust if this is the layout component you meant
import { useEffect, ReactNode, JSX } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    document.body.style.fontFamily = "var(--font-gilroy), sans-serif";
  }, []);

  return (
    <>
      <Head>
        <title>Coco Bubble Tea</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Import Sora (for toolbar) & Inter (for body text) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
