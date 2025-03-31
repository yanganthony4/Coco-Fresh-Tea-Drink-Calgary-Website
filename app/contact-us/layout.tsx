export const metadata = {
  title: "Contact CoCo Bubble Tea | Customer Support & FAQ",
  description: "Have questions about CoCo Fresh Tea & Juice? Contact us for support or check our FAQ for quick answers. We're happy to help!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/contact-us", // Canonical URL
  },
};


interface ContactUsLayoutProps {
  children: React.ReactNode;
}

export default function ContactUsLayout({ children }: ContactUsLayoutProps) {
  return <>{children}</>;
}
