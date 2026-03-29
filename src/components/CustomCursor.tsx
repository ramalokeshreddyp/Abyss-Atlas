import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch/mobile
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Detect hover on interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role='button'], .cursor-pointer, input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Initial pass
    document.querySelectorAll("a, button, [role='button'], .cursor-pointer, input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-primary/60"
          animate={{
            width: isHovering ? 48 : isClicking ? 20 : 32,
            height: isHovering ? 48 : isClicking ? 20 : 32,
            borderColor: isHovering
              ? "hsl(175 100% 60% / 0.8)"
              : "hsl(185 80% 55% / 0.6)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          style={{ translateX: "-50%", translateY: "-50%", position: "absolute", top: "50%", left: "50%" }}
        />
      </motion.div>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: isClicking ? 8 : 4,
            height: isClicking ? 8 : 4,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 400 }}
          style={{ translateX: "-50%", translateY: "-50%", position: "absolute", top: "50%", left: "50%" }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
