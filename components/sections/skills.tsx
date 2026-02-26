"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Globe, BookOpen, Wrench } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  glowClass: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "text-neon-blue",
    glowClass: "hover:glow-blue",
    skills: [
      { name: "Java", level: 90 },
      { name: "C++", level: 80 },
      { name: "Python", level: 70 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 75 },
    ],
  },
  {
    title: "Web Technologies",
    icon: Globe,
    color: "text-neon-teal",
    glowClass: "hover:glow-teal",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Node.js", level: 70 },
    ],
  },
  {
    title: "CS Fundamentals",
    icon: BookOpen,
    color: "text-neon-purple",
    glowClass: "hover:glow-purple",
    skills: [
      { name: "DSA", level: 85 },
      { name: "OOP", level: 90 },
      { name: "DBMS", level: 75 },
      { name: "OS", level: 70 },
      { name: "CN", level: 65 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    color: "text-neon-blue",
    glowClass: "hover:glow-blue",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 65 },
      { name: "Docker", level: 50 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs font-mono text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary via-neon-purple to-neon-teal"
        />
      </div>
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Skills"
          title="Technical Arsenal"
          description="The technologies and tools I use to bring ideas to life."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <TiltCard
                className={`glass group h-full rounded-2xl p-6 transition-all ${category.glowClass}`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-secondary ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={0.1 + i * 0.1}
                    />
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
