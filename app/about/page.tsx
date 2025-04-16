"use client";

import HeroSection from "../components/about-us/HeroSection";
import StorySection from "../components/about-us/StorySection";
import TimelineSection from "../components/about-us/TimelineSection";
import ValuesSection from "../components/about-us/ValuesSection";
import { JSX } from "react";

export default function AboutPage(): JSX.Element {
  return (
    <div className="pt-20 min-h-screen bg-white text-[black]">
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <ValuesSection />
    </div>
  );
};

