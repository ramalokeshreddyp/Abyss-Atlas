import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const zones = [
  { label: "Surface", depth: "0m", position: 0 },
  { label: "Sunlight", depth: "200m", position: 20 },
  { label: "Twilight", depth: "1,000m", position: 40 },
  { label: "Midnight", depth: "4,000m", position: 65 },
  { label: "Abyss", depth: "6,000m+", position: 85 },
];

const DepthMeter = () => {
  const { scrollYProgress } = useScroll();
  const indicatorY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [currentDepth, setCurrentDepth] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentDepth(Math.round(latest * 11000));
  });

  return (
    <div
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-0"
      role="complementary"
      aria-label="Depth indicator"
    >
      {/* Current depth readout */}
      <div className="absolute -top-8 right-0 text-right">
        <span className="font-display text-xs text-primary tabular-nums text-glow">
          {currentDepth.toLocaleString()}m
        </span>
      </div>

      <div className="relative h-64 w-1 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-ocean-surface via-primary to-ocean-glow rounded-full"
          style={{ height: indicatorY }}
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-glow"
          style={{ top: indicatorY }}
        />
      </div>
      <div className="absolute right-4 top-0 h-full flex flex-col justify-between">
        {zones.map((z) => (
          <span key={z.label} className="text-[10px] text-muted-foreground font-body whitespace-nowrap">
            {z.depth}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DepthMeter;
