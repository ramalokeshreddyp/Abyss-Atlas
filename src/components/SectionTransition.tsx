import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionTransitionProps {
  fromColor: string;
  toColor: string;
  variant?: "wave" | "fade" | "particles";
}

const SectionTransition = ({ fromColor, toColor, variant = "wave" }: SectionTransitionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  if (variant === "wave") {
    return (
      <div ref={ref} className="relative h-32 -my-1 overflow-hidden" style={{ background: fromColor }}>
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0,40 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            fill={toColor}
            style={{ opacity }}
          />
          <motion.path
            d="M0,60 C360,10 720,90 1080,40 C1260,20 1380,70 1440,50 L1440,120 L0,120 Z"
            fill={toColor}
            opacity={0.5}
          />
        </svg>
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div ref={ref} className="relative h-24 -my-1" style={{ background: `linear-gradient(180deg, ${fromColor}, ${toColor})` }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${8 + i * 8}%`, top: "50%" }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  // fade variant
  return (
    <div
      ref={ref}
      className="h-32 -my-1"
      style={{ background: `linear-gradient(180deg, ${fromColor}, ${toColor})` }}
    />
  );
};

export default SectionTransition;
