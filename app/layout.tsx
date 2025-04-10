import "./globals.css";
import Toolbar from "./components/Toolbar";
import Script from "next/script";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "CoCo Fresh Tea & Juice | Calgary's Best Bubble Tea, Milk Tea & Fresh Drinks",
  description: "Enjoy the best bubble tea in Calgary at CoCo Fresh Tea & Juice! Our delicious drinks include bubble tea, fruit tea, and milk tea, made with fresh ingredients. Whether you're craving a refreshing treat or a sweet indulgence, visit us today and experience the ultimate bubble tea experience!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/", // Canonical URL for the homepage

  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};



interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head><meta name="google-site-verification" content="yRNnfIzp5iEdkqcT8gOthefeHVPKQESokD4a_VZsvm8" /></head>
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

          <footer
  className="bg-orange-300 py-6 text-white w-full"

>
  <div className="container mx-auto px-4 flex flex-col items-center space-y-4">
    
    {/* Row 1: Social Media Placeholders + Handle/Search Box */}
    <div className="flex items-center space-x-4 justify-center">
      {/* Instagram Icon */}
      <div className="flex-shrink-0">
        <Image
          src="/images/instalogow.png"
          alt="Instagram"
          width={24}
          height={24}
          className="hover:opacity-80"
        />
      </div>

      {/* TikTok Icon */}
      <div className="flex-shrink-0">
        <Image
          src="/images/tiktok.png"
          alt="TikTok"
          width={28}
          height={28}
          className="hover:opacity-80"
        />
      </div>

      {/* Handle & Search Box */}
<div
  className="flex items-center border-2 border-white rounded-md overflow-hidden"
>
  <span className="px-3 py-1 text-orange-700">@cocobubbleteacalgary</span>
  <Link
    href="https://www.facebook.com/cococalgary/"
    className="bg-white p-1.5"
    aria-label="Search"
  >
    <Image
      src="/images/searchlogo.png"
      alt="Search"
      width={20}
      height={20}
      className="text-orange-400"
      style={{ color: "#f15a24" }}
    />
  </Link>
</div>

    </div>

    {/* Row 2: Privacy Policy & Accessibility Links BELOW the handle */}
    <div className="flex space-x-6 items-center justify-center">
      <Link href="/privacy" className="text-white hover:underline">
        Privacy Policy
      </Link>
      <Link href="/accessibility" className="text-white hover:underline">
        Accessibility
      </Link>
    </div>

    {/* Row 3: Copyright */}
    <div className="text-sm text-white">
      ©2025 Coco Bubble Tea Calgary
    </div>
  </div>
</footer>

        </div>
      </body>
   </html>
  );
}
