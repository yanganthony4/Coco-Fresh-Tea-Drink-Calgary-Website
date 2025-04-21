"use client";

import React, { JSX } from "react";
import dynamic from "next/dynamic";

// Dynamically import the actual Map component
const Map = dynamic(() => import("../components/locations/Map"), { ssr: false });

export default function Locations(): JSX.Element {
  return (
    <div className="pt-20 flex flex-1">
      {/* Ensure this inner wrapper grows and allows Map to expand */}
      <div className="flex-1 flex">
        <Map />
      </div>
      {/* Visually hidden H1 for SEO/accessibility */}
      <h1 className="sr-only">
        CoCo Bubble Tea – The best Bubble Tea in Calgary
      </h1>
    </div>
  );
}

