import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Surface", target: "hero", depth: "0m" },
  { label: "Sunlight", target: "sunlight", depth: "200m" },
  { label: "Twilight", target: "twilight", depth: "1km" },
  { label: "Midnight", target: "midnight", depth: "4km" },
  { label: "Abyss", target: "abyss", depth: "6km+" },
];

const OceanNav = () => {
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.target);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] hidden md:block"
      style={{ opacity: navOpacity }}
      aria-label="Ocean zone navigation"
    >
      <div className="flex items-center gap-1 bg-card/60 backdrop-blur-xl border border-border/30 rounded-full px-2 py-1.5">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => scrollTo(item.target)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-body transition-colors duration-300 ${
              activeSection === item.target
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={`Navigate to ${item.label} zone at ${item.depth}`}
            aria-current={activeSection === item.target ? "true" : undefined}
          >
            {activeSection === item.target && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default OceanNav;
