import React, { JSX } from "react";

interface LocationsLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "CoCo Bubble Tea Locations | Find a Store Near You | Enjoy Fresh Bubble Tea & More in Calgary",
  description: "Looking for a CoCo Fresh Tea & Juice location in Calgary? Find your nearest store and enjoy our delicious bubble tea, fruit tea, milk tea, and more. Visit us today to treat yourself to the freshest and most flavorful drinks in town!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/locations", // Canonical URL
  },
};


export default function LocationsLayout({ children }: LocationsLayoutProps): JSX.Element {
  return <>{children}</>;
}
