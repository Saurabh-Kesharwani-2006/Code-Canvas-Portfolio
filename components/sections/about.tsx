"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Code, Lightbulb, Rocket } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "DSA Problems Solved", value: 500, suffix: "+" },
  { label: "Technologies Learned", value: 20, suffix: "+" },
];

const timeline = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    description: "Began my Computer Science journey, learning fundamentals of programming and algorithms.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "First Programming Language",
    description: "Learned Java and fell in love with object-oriented programming and data structures.",
    icon: Code,
  },
  {
    year: "2024",
    title: "Web Development Journey",
    description: "Dove into full stack development with React, Next.js, and modern web technologies.",
    icon: Lightbulb,
  },
  {
    year: "2025",
    title: "Competitive Programming",
    description: "Started solving problems on LeetCode, CodeChef, and participating in coding contests.",
    icon: Rocket,
  },
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = value / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-gradient text-4xl font-bold md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="About Me"
          title="Passionate Developer & Problem Solver"
          description="Building the future through code, one project at a time."
        />

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Who am I?
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I{"'"}m <span className="font-semibold text-foreground">Saurabh Kesharwani</span>, currently
                pursuing B.Tech in Computer Science & Engineering at{" "}
                <span className="text-primary">Indian Institute of Information Technology Kalyani (IIIT Kalyani)</span>.
                My journey in tech started with curiosity and has grown
                into a full-fledged pursuit of excellence.
              </p>
              <p>
                I specialize in Data Structures & Algorithms, Object-Oriented
                Programming, and Full Stack Web Development. I love building
                impactful projects that solve real-world problems and
                constantly push myself to learn new technologies.
              </p>
              <p>
                When I{"'"}m not coding, you{"'"}ll find me participating in
                hackathons, solving competitive programming challenges, or
                exploring the latest in tech innovation.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass group flex flex-col items-center rounded-xl p-6 text-center transition-all hover:glow-blue"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <span className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Mini timeline */}
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                My Journey
              </h3>
              <div className="relative space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-neon-purple to-neon-teal" />
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="group relative flex gap-4 pl-6"
                  >
                    <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary group-hover:bg-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary">
                        {item.year}
                      </span>
                      <h4 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
