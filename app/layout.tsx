import "./globals.css";
import Toolbar from "./components/Toolbar";
import Script from "next/script";
import type { ReactNode } from "react";

export const metadata = {
  title: "Coco Calgary",
  description: "CoCo Fresh Tea and Juice",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/", // Canonical URL for the homepage
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white">
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3S12T44MMW"
        />
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

        {/* Microsoft Clarity Tracking Code */}
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

        <div className="min-h-screen flex flex-col">
          <Toolbar />
          <main className="flex-grow">{children}</main>

          {/* Footer */}
          <footer className="bg-orange-300 py-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="/privacy" className="text-white hover:underline">
                Privacy Policy
              </a>
              <a href="/accessibility" className="text-white hover:underline">
                Accessibility
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
