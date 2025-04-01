export const metadata = {
  title: "Contact CoCo Bubble Tea | Customer Support, FAQ, and Inquiries | Reach Out for Assistance",
  description: "Have questions about CoCo Fresh Tea & Juice? Contact our friendly support team or visit our FAQ for quick answers to common questions. We're here to assist you with all your inquiries, get in touch today!",
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
