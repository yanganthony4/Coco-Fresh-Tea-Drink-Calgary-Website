"use client";

import { ReactNode } from "react";
import Toolbar from "./Toolbar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Toolbar />

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-orange-300 py-6 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/privacy" className="text-white hover:underline">
            Privacy Policy
          </a>
          <a href="/accessibility" className="text-white hover:underline">
            Accessibility
          </a>
        </div>
      </footer>
    </div>
  );
}
