import { motion, useScroll, useTransform } from "framer-motion";

const DepthCounter = () => {
  const { scrollYProgress } = useScroll();
  const depth = useTransform(scrollYProgress, [0, 1], [0, 11000]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-3"
      style={{ opacity }}
    >
      <div className="flex flex-col items-end">
        <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Depth</span>
        <motion.span
          className="font-display text-lg text-primary tabular-nums text-glow"
        >
          <motion.span>{depth}</motion.span>
        </motion.span>
      </div>
      <div className="w-px h-8 bg-border/30" />
      <span className="text-[10px] text-muted-foreground font-body">meters</span>
    </motion.div>
  );
};

export default DepthCounter;
