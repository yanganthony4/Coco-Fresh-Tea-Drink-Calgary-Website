import React, { JSX } from "react";

interface MenuLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "CoCo Bubble Tea Menu | Delicious Milk Tea, Fruit Tea, Specialty Drinks & More",
  description: "Explore the CoCo Fresh Tea & Juice menu, featuring a wide selection of bubble tea, milk tea, fruit tea, and specialty drinks. Made with the freshest ingredients, our menu offers something for everyone. Treat yourself to the best bubble tea experience today!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/menu", // Canonical URL
  },
};


export default function MenuLayout({ children }: MenuLayoutProps): JSX.Element {
  return <>{children}</>;
}
