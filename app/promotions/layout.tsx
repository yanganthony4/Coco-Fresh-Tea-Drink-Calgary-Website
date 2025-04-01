export const metadata = {
  title: "CoCo Bubble Tea Deals & Promotions | Special Offers, Discounts & Limited-Time Deals",
  description: "Unlock exclusive deals at CoCo Fresh Tea & Juice! Browse our latest promotions on bubble tea, fruit tea, milk tea, and more. Don't miss out on limited-time offers and seasonal specials. Treat yourself to your favorite drinks at a great price today!",
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
