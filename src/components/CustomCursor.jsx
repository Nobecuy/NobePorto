import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isSupported, setIsSupported] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement configuration
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for desktop/non-touch
    const checkDevice = () => {
      const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;
      setIsSupported(isDesktop);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Listen for hover interaction on common interactive elements
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY]);

  if (!isSupported) return null;

  return (
    <>
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-zinc-400 dark:border-zinc-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      />
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-zinc-900 dark:bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
