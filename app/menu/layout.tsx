import React, { JSX } from "react";

interface MenuLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Menu",
  description: "All your favorite drinks!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/menu", // Canonical URL
  },
};

export default function MenuLayout({ children }: MenuLayoutProps): JSX.Element {
  return <>{children}</>;
}
