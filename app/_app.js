import '../styles/globals.css'; 
import Layout from '../components/Layout';
import { useEffect } from 'react';
import Head from 'next/head'; //metadata 
import Toolbar from '../components/Toolbar';

function Appjs({ Component, pageProps }) {
    useEffect(() => {
        document.body.style.fontFamily = "var(--font-gilroy), sans-serif";
    }, []);

    return (
        <>
            <Head>
                {/* Global Metadata /}
                <title>Coco Bubble Tea</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />

                {/ Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com/" />
                <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
            </Head>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default Appjs;