export const metadata = {
  title: "Promotions",
  description: "Get your favorites for less!",
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
