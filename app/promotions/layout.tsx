export const metadata = {
  title: "CoCo Bubble Tea Deals & Promotions | Special Offers",
  description: "Enjoy exclusive deals on CoCo Fresh Tea & Juice! Check out our latest promotions on bubble tea, fruit tea, and more. Limited-time offers available!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/promotions", // Canonical URL
  },
};

interface PromotionsLayoutProps {
  children: React.ReactNode; // children prop type
}

export default function PromotionsLayout({ children }: PromotionsLayoutProps) {
  return <>{children}</>;
}
