export const metadata = {
  title: "Contact Us and FAQ",
  description: "Want to know more? Reach out to us!",
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
