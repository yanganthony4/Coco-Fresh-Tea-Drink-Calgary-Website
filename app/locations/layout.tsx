import React, { JSX } from "react";

interface LocationsLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Store Locations",
  description: "Find your nearest CoCo!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/locations", // Canonical URL
  },
};

export default function LocationsLayout({ children }: LocationsLayoutProps): JSX.Element {
  return <>{children}</>;
}
