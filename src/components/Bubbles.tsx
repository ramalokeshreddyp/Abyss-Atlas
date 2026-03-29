import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const Bubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 3,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 6,
    }));
    setBubbles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-ocean-surface/20 animate-bubble"
          style={{
            left: `${b.left}%`,
            bottom: "-20px",
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
