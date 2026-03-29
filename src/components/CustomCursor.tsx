import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const interactiveSelector = "a, button, [role='button'], .cursor-pointer, input, textarea, select";

    // Detect touch/mobile pointer so cursor is only enabled on precise pointers.
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest(interactiveSelector)) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement | null)?.closest(interactiveSelector)) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mouseout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mouseout", handlePointerOut);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!isMobile && !prefersReducedMotion) {
      document.body.classList.add("custom-cursor-enabled");
    } else {
      document.body.classList.remove("custom-cursor-enabled");
    }

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <>
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
