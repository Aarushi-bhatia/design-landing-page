import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion"; // Import Framer Motion utilities

interface CursorProps {
  cursorScale: number; // Cursor size comes from App.tsx
}

const CustomCursor: React.FC<CursorProps> = ({cursorScale}) => {
  // Use motion values for real-time tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth animations for movement & scale
  const smoothX = useSpring(mouseX, { stiffness: 250, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 250, damping: 30 });
  const smoothScale = useSpring(cursorScale, { stiffness: 200, damping: 15 });

  const [invertColor, setInvertColor] = useState(false); // Track text inversion

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed rounded-full bg-black pointer-events-none z-50"
        style={{
          width: "10px",
          height: "10px",
          x: smoothX, 
          y: smoothY,
          transform: "translate(-50%, -50%)",
          scale: smoothScale,
        }}
      />
    </>
  );
};

export default CustomCursor;
