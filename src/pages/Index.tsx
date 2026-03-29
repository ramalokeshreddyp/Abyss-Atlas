import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import SunlightZone from "@/components/sections/SunlightZone";
import TwilightZone from "@/components/sections/TwilightZone";
import MidnightZone from "@/components/sections/MidnightZone";
import AbyssSection from "@/components/sections/AbyssSection";
import SectionTransition from "@/components/SectionTransition";
import Bubbles from "@/components/Bubbles";
import DepthMeter from "@/components/DepthMeter";
import OceanNav from "@/components/OceanNav";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <PageLoader onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <main className="relative" role="main">
          <CustomCursor />
          <Bubbles />
          <DepthMeter />
          <OceanNav />
          <HeroSection />
          <SectionTransition
            fromColor="hsl(210 60% 12%)"
            toColor="hsl(200 75% 18%)"
            variant="wave"
          />
          <SunlightZone />
          <SectionTransition
            fromColor="hsl(215 60% 11%)"
            toColor="hsl(215 60% 11%)"
            variant="particles"
          />
          <TwilightZone />
          <SectionTransition
            fromColor="hsl(222 50% 5%)"
            toColor="hsl(222 50% 5%)"
            variant="fade"
          />
          <MidnightZone />
          <SectionTransition
            fromColor="hsl(228 60% 2%)"
            toColor="hsl(228 60% 2%)"
            variant="particles"
          />
          <AbyssSection />
        </main>
      )}
    </>
  );
};

export default Index;
