import "../styles/globals.css";
import Layout from "../components/Footer"; // Adjust the path if needed
import { useEffect } from "react";
import Head from "next/head";

function Appjs({ Component, pageProps }) {
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default Appjs;
