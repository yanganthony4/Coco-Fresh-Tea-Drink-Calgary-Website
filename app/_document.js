import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap"
                    rel="stylesheet"
                />
                <script type="text/javascript" src="https://cdn.emailjs.com/dist/email.min.js"></script>

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
