import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(195 85% 25%) 0%, hsl(200 75% 18%) 60%, hsl(210 60% 12%) 100%)" }}
      aria-label="Hero section - Welcome to Ocean Depths"
    >
      {/* Animated sun with parallax */}
      <motion.div
        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 90% 65% / 0.25) 0%, hsl(45 90% 65% / 0.08) 40%, transparent 70%)",
          y: sunY,
          scale: sunScale,
        }}
      />

      {/* Water caustics effect */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Wave shapes - multiple layers */}
      <svg className="absolute top-0 left-0 w-full h-40 opacity-15" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z"
          fill="hsl(195 85% 55% / 0.3)"
          animate={{ d: [
            "M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z",
            "M0,40 C360,0 720,100 1080,40 C1260,10 1380,80 1440,40 L1440,0 L0,0 Z",
            "M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,0 L0,0 Z",
          ]}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <svg className="absolute top-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M0,80 C480,20 960,100 1440,50 L1440,0 L0,0 Z"
          fill="hsl(195 85% 55% / 0.2)"
          animate={{ d: [
            "M0,80 C480,20 960,100 1440,50 L1440,0 L0,0 Z",
            "M0,50 C480,100 960,20 1440,80 L1440,0 L0,0 Z",
            "M0,80 C480,20 960,100 1440,50 L1440,0 L0,0 Z",
          ]}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      <motion.div style={{ y, opacity, scale }} className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-primary font-body mb-8"
        >
          <span className="w-8 h-px bg-primary/50" />
          An Interactive Journey
          <span className="w-8 h-px bg-primary/50" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 text-glow leading-[0.9]"
        >
          Into the
          <br />
          <span className="text-primary">Ocean Depths</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground font-body max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Dive beneath the waves and explore the mysterious layers of the ocean,
          from sunlit shallows to the crushing darkness of the abyss.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            className="group inline-flex items-center gap-3 bg-primary/10 border border-primary/30 text-primary font-body text-sm px-8 py-3 rounded-full backdrop-blur-sm hover:bg-primary/20 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 80% 55% / 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("sunlight")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Begin diving into ocean depths"
          >
            Begin the Dive
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.button>
          <div className="w-px h-20 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-ocean-surface/20"
          style={{
            left: `${5 + i * 8}%`,
            top: `${20 + (i % 4) * 18}%`,
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-5, 5, -5],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Jellyfish SVG floating */}
      <motion.svg
        className="absolute bottom-32 right-[15%] w-12 h-16 opacity-20 hidden lg:block"
        viewBox="0 0 50 70"
        fill="none"
        aria-hidden="true"
        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="25" cy="20" rx="18" ry="16" fill="hsl(185 80% 55% / 0.3)" />
        <path d="M10 25 Q15 45 12 60" stroke="hsl(185 80% 55% / 0.2)" strokeWidth="1.5" fill="none" />
        <path d="M20 28 Q22 50 18 65" stroke="hsl(185 80% 55% / 0.15)" strokeWidth="1" fill="none" />
        <path d="M30 28 Q28 50 32 65" stroke="hsl(185 80% 55% / 0.15)" strokeWidth="1" fill="none" />
        <path d="M40 25 Q35 45 38 60" stroke="hsl(185 80% 55% / 0.2)" strokeWidth="1.5" fill="none" />
      </motion.svg>
    </section>
  );
};

export default HeroSection;
