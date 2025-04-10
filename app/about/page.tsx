"use client";

import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import TimelineSection from "../components/TimelineSection";
import ValuesSection from "../components/ValuesSection";
import { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-white text-black">
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <ValuesSection />
    </div>
  );
}
