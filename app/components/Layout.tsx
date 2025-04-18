// components/Layout.tsx
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* your nav/header */}
      <main className="flex-1">{children}</main>
      {/* your footer */}
    </div>
  );
}
