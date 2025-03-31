import React, { JSX } from "react";

interface MenuLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "CoCo Bubble Tea Menu | Milk Tea, Fruit Tea & More",
  description: "Explore the CoCo Fresh Tea & Juice menu! Enjoy delicious bubble tea, milk tea, fruit tea, and specialty drinks made with fresh ingredients.",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/menu", // Canonical URL
  },
};


export default function MenuLayout({ children }: MenuLayoutProps): JSX.Element {
  return <>{children}</>;
}
