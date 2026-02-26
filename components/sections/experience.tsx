"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Award, Medal, Star, Zap } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const achievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon",
    description: "Participated in SIH 2024, developed an innovative solution for real-world problem statements.",
    date: "2024",
    type: "Hackathon",
  },
  {
    icon: Award,
    title: "CodeChef Starters",
    description: "Consistently ranked in top 15% in CodeChef Starters competitive programming contests.",
    date: "2024",
    type: "Contest",
  },
  {
    icon: Medal,
    title: "Web Development Certification",
    description: "Completed Full Stack Web Development certification from Coursera with honors.",
    date: "2024",
    type: "Certification",
  },
  {
    icon: Star,
    title: "Academic Excellence Award",
    description: "Secured distinction in first year with CGPA above 8.5 in Computer Science Engineering.",
    date: "2023",
    type: "Academic",
  },
  {
    icon: Zap,
    title: "College Tech Fest Winner",
    description: "Won first place in the annual coding competition organized by the CS department.",
    date: "2024",
    type: "Contest",
  },
  {
    icon: Award,
    title: "Java Programming Certification",
    description: "Completed Oracle-aligned Java SE certification covering OOP, collections, and multithreading.",
    date: "2024",
    type: "Certification",
  },
];

const achievementStats = [
  { label: "Hackathons", value: 5 },
  { label: "Contests", value: 20 },
  { label: "Certifications", value: 8 },
];

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / 40;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gradient text-3xl font-bold md:text-4xl">
      {count}+
    </span>
  );
}

const typeColors: Record<string, string> = {
  Hackathon: "text-neon-blue bg-neon-blue/10 border-neon-blue/20",
  Contest: "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
  Certification: "text-neon-teal bg-neon-teal/10 border-neon-teal/20",
  Academic: "text-primary bg-primary/10 border-primary/20",
};

export function ExperienceSection() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Experience"
          title="Achievements & Experience"
          description="Milestones and accomplishments from my journey in tech."
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-3 gap-4"
        >
          {achievementStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass flex flex-col items-center rounded-xl p-6 text-center transition-all hover:glow-blue"
            >
              <AnimatedCounter value={stat.value} />
              <span className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary via-neon-purple to-neon-teal md:left-1/2 md:block" />

          <div className="space-y-8">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot - desktop */}
                <div className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background md:block" />

                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="glass group rounded-xl p-6 transition-all hover:glow-blue">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                          typeColors[item.type] || "text-muted-foreground"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
