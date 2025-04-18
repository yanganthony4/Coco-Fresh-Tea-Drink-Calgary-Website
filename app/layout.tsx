import "./globals.css";
import Toolbar from "./components/Toolbar";
import Footer from "./components/Footer"
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata = {
  title: "CoCo Fresh Tea & Juice | Calgary's Best Bubble Tea, Milk Tea & Fresh Drinks",
  description:
    "Enjoy the best bubble tea in Calgary at CoCo Fresh Tea & Juice! Our delicious drinks include bubble tea, fruit tea, and milk tea, made with fresh ingredients. Whether you're craving a refreshing treat or a sweet indulgence, visit us today and experience the ultimate bubble tea experience!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/",
    icons: "/favicon.svg",
  },
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="yRNnfIzp5iEdkqcT8gOthefeHVPKQESokD4a_VZsvm8" />
      </head>
      <body className="bg-white h-full">
        {/* Google Tag Manager */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-3S12T44MMW" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3S12T44MMW');
            `,
          }}
        />

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "q3ynfe4cyj");
            `,
          }}
        />

        <div className="flex flex-col">
          <Toolbar />
          <main className="flex-grow">{children}</main>
          <Footer children={undefined} />
        </div>
      </body>
    </html>
  )
}
