"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";

const platforms = [
  {
    name: "LeetCode",
    problems: 350,
    maxProblems: 500,
    rating: "1650+",
    color: "neon-blue",
    profileUrl: "https://leetcode.com",
    stats: [
      { label: "Easy", value: 120 },
      { label: "Medium", value: 180 },
      { label: "Hard", value: 50 },
    ],
  },
  {
    name: "CodeChef",
    problems: 200,
    maxProblems: 400,
    rating: "3 Star",
    color: "neon-teal",
    profileUrl: "https://codechef.com",
    stats: [
      { label: "Contests", value: 25 },
      { label: "Div 2", value: 15 },
      { label: "Div 3", value: 10 },
    ],
  },
  {
    name: "Codeforces",
    problems: 150,
    maxProblems: 400,
    rating: "Pupil (1200+)",
    color: "neon-purple",
    profileUrl: "https://codeforces.com",
    stats: [
      { label: "Div 2", value: 12 },
      { label: "Div 3", value: 18 },
      { label: "Div 4", value: 8 },
    ],
  },
];

function CircularProgress({
  value,
  max,
  color,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  sublabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = percentage / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= percentage) {
        setAnimatedValue(percentage);
        clearInterval(timer);
      } else {
        setAnimatedValue(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, percentage]);

  const colorMap: Record<string, string> = {
    "neon-blue": "stroke-neon-blue",
    "neon-teal": "stroke-neon-teal",
    "neon-purple": "stroke-neon-purple",
  };

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="6"
            className="stroke-secondary"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`${colorMap[color] || "stroke-primary"} transition-all duration-100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">/ {max}</span>
        </div>
      </div>
      <span className="mt-3 text-sm font-semibold text-foreground">{label}</span>
      <span className="text-xs text-muted-foreground">{sublabel}</span>
    </div>
  );
}

export function CodingSection() {
  return (
    <section id="coding" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Competitive Programming"
          title="Coding Profiles"
          description="My competitive programming journey across multiple platforms."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass group rounded-2xl p-6 text-center transition-all hover:glow-blue"
            >
              <h3 className="mb-2 text-lg font-bold text-foreground">
                {platform.name}
              </h3>
              <p className="mb-6 font-mono text-sm text-primary">
                {platform.rating}
              </p>

              <CircularProgress
                value={platform.problems}
                max={platform.maxProblems}
                color={platform.color}
                label="Problems Solved"
                sublabel={`Target: ${platform.maxProblems}`}
              />

              <div className="mt-6 grid grid-cols-3 gap-2">
                {platform.stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg bg-secondary/50 p-2">
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="mt-6 gap-2 rounded-full border-glass-border text-foreground hover:border-primary/30 hover:text-primary"
                asChild
              >
                <a href={platform.profileUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Profile
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
