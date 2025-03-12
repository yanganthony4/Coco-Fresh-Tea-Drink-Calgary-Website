import "../styles/globals.css";
import Layout from "../components/Footer"; 
import { useEffect } from "react";
import Head from "next/head";
import { TinaCMS, TinaProvider } from "tinacms";

// TinaCMS Configuration
const cms = new TinaCMS({
  enabled: process.env.NODE_ENV === "development", // Enable TinaCMS only in development mode
  toolbar: true, // Enable the toolbar
  apis: {
    tina: {
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Tina Cloud client ID
      token: process.env.NEXT_PUBLIC_TINA_TOKEN, // Tina Cloud token
    },
  },
});

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

        {/* Import Sora (for toolbar) & Inter (for body text) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Wrap with TinaProvider */}
      <TinaProvider cms={cms}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TinaProvider>
    </>
  );
}

export default Appjs;