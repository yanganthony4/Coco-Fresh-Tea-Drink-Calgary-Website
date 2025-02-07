import '../styles/globals.css'; 
import Layout from '../components/Layout';
import { useEffect } from 'react';
import Toolbar from '../components/Toolbar';

function Appjs({ Component, pageProps }) {
    useEffect(() => {
        document.body.style.fontFamily = "var(--font-gilroy), sans-serif";
    }, []);

    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default Appjs;