import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import TimelineSection from "../components/TimelineSection";
import ValuesSection from "../components/ValuesSection";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[black]">
      <HeroSection />
      <StorySection />
      <TimelineSection />
      <ValuesSection />
    </div>
  );
};

export default AboutPage;
