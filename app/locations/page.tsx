"use client";

import React, { JSX } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Map component
const Map = dynamic(() => import("../components/locations/Map"), { ssr: false });

export default function Locations(): JSX.Element {
  return (
    <div className="pt-20 h-screen w-full">
      <Map />
      {/* Visually hidden H1 for SEO/accessibility */}
      <h1 className="sr-only">CoCo Bubble Tea - The best Bubble Tea in Calgary</h1>
    </div>
  );
}
