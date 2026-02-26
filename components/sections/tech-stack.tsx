"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";

const technologies = [
  { name: "Java", size: 80, color: "bg-neon-blue/20 border-neon-blue/40 text-neon-blue" },
  { name: "React", size: 75, color: "bg-neon-teal/20 border-neon-teal/40 text-neon-teal" },
  { name: "Next.js", size: 70, color: "bg-primary/20 border-primary/40 text-primary" },
  { name: "C++", size: 65, color: "bg-neon-purple/20 border-neon-purple/40 text-neon-purple" },
  { name: "Python", size: 60, color: "bg-neon-teal/20 border-neon-teal/40 text-neon-teal" },
  { name: "TypeScript", size: 68, color: "bg-neon-blue/20 border-neon-blue/40 text-neon-blue" },
  { name: "JavaScript", size: 72, color: "bg-neon-teal/20 border-neon-teal/40 text-neon-teal" },
  { name: "HTML", size: 55, color: "bg-neon-purple/20 border-neon-purple/40 text-neon-purple" },
  { name: "CSS", size: 55, color: "bg-neon-blue/20 border-neon-blue/40 text-neon-blue" },
  { name: "Tailwind", size: 65, color: "bg-neon-teal/20 border-neon-teal/40 text-neon-teal" },
  { name: "Git", size: 60, color: "bg-primary/20 border-primary/40 text-primary" },
  { name: "Node.js", size: 58, color: "bg-neon-teal/20 border-neon-teal/40 text-neon-teal" },
  { name: "MongoDB", size: 50, color: "bg-neon-blue/20 border-neon-blue/40 text-neon-blue" },
  { name: "MySQL", size: 55, color: "bg-neon-purple/20 border-neon-purple/40 text-neon-purple" },
  { name: "Docker", size: 45, color: "bg-neon-blue/20 border-neon-blue/40 text-neon-blue" },
  { name: "Linux", size: 48, color: "bg-primary/20 border-primary/40 text-primary" },
];

interface BubblePosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function TechStackSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<BubblePosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 400;

    // Initialize random positions
    const initPositions = technologies.map((tech) => ({
      x: Math.random() * (width - tech.size),
      y: Math.random() * (height - tech.size),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setPositions(initPositions);

    const animate = () => {
      setPositions((prev) =>
        prev.map((pos, i) => {
          const size = technologies[i].size;
          let { x, y, vx, vy } = pos;
          x += vx;
          y += vy;

          if (x <= 0 || x >= width - size) vx *= -1;
          if (y <= 0 || y >= height - size) vy *= -1;

          x = Math.max(0, Math.min(width - size, x));
          y = Math.max(0, Math.min(height - size, y));

          return { x, y, vx, vy };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Tech Stack"
          title="Technology Universe"
          description="Interactive visualization of my technology ecosystem."
        />

        <div
          ref={containerRef}
          className="glass relative h-[400px] overflow-hidden rounded-2xl"
        >
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              className={`absolute flex cursor-pointer items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ${tech.color} ${
                hoveredIndex === i ? "scale-125 z-10" : "scale-100"
              }`}
              style={{
                width: tech.size,
                height: tech.size,
                left: positions[i]?.x ?? 0,
                top: positions[i]?.y ?? 0,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span
                className={`select-none font-semibold ${
                  tech.size > 60 ? "text-sm" : "text-xs"
                }`}
              >
                {tech.name}
              </span>
              {hoveredIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 rounded-full border-2 border-current opacity-30"
                  style={{ width: tech.size + 8, height: tech.size + 8, left: -4, top: -4 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
