import React, { JSX } from "react";

interface LocationsLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "CoCo Bubble Tea Locations | Find a Store Near You",
  description: "Find your nearest CoCo Fresh Tea & Juice location in Calgary. Enjoy delicious bubble tea, fruit tea, and more. Visit a store today!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/locations", // Canonical URL
  },
};

export default function LocationsLayout({ children }: LocationsLayoutProps): JSX.Element {
  return <>{children}</>;
}
