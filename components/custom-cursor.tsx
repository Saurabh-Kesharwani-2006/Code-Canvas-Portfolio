"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseup", handleUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseup", handleUp);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden rounded-full border border-primary/30 md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        style={{ width: 40, height: 40 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden h-2 w-2 rounded-full bg-primary md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicking ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.05 }}
        style={{
          boxShadow: "0 0 10px var(--glow-blue), 0 0 20px var(--glow-blue)",
        }}
      />
    </>
  );
}
