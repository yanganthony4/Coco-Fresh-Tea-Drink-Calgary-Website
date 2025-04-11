import type { ReactNode } from "react"

export const metadata = {
  title: "CoCo Fresh Tea & Juice Calgary | Privacy Policy",
  description:
    "Read CoCo Fresh Tea & Juice Calgary's privacy policy and learn how we collect, use, and protect your personal data on our website.",
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <div className="privacy-layout-wrapper">{children}</div>
}
