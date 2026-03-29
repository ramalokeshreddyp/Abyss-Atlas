import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal">("loading");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase("reveal");
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [onComplete]);

  const depthLabel =
    progress < 25 ? "Preparing to dive..." :
    progress < 50 ? "Entering sunlit waters..." :
    progress < 75 ? "Descending into twilight..." :
    progress < 100 ? "Approaching the abyss..." : "Welcome to the deep.";

  return (
    <AnimatePresence>
      {phase !== "reveal" || progress < 100 ? null : null}
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{ background: "hsl(210 60% 6%)" }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Animated rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border border-primary/20"
            style={{
              width: ring * 120,
              height: ring * 120,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: ring % 2 === 0 ? [0, 360] : [360, 0],
            }}
            transition={{
              duration: 4 + ring,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Depth sonar ping */}
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-primary"
          animate={{
            scale: [1, 3, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Title */}
          <motion.h2
            className="font-display text-3xl sm:text-4xl text-foreground text-glow"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Ocean Depths
          </motion.h2>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-[2px] bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Depth label */}
          <motion.p
            key={depthLabel}
            className="text-muted-foreground font-body text-xs tracking-widest uppercase"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {depthLabel}
          </motion.p>

          {/* Depth counter */}
          <p className="font-display text-primary/40 text-sm tabular-nums">
            {Math.round(Math.min(progress, 100) * 110)}m
          </p>
        </motion.div>

        {/* Bubbles in loader */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${20 + i * 12}%`,
              bottom: 0,
            }}
            animate={{
              y: [0, -400 - i * 50],
              opacity: [0.4, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
