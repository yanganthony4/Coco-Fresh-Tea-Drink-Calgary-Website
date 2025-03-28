import { ReactNode } from "react"; // Import ReactNode to type children

export const metadata = {
  title: "About Us",
  description: "Our story!",
  alternates: {
    canonical: "https://www.coco-bubble-tea.ca/about", // Canonical URL
  },
};

interface AboutLayoutProps {
  children: ReactNode; // Type for the children prop
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <>{children}</>;
}
