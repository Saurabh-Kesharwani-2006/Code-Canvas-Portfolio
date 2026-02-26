"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  Code2,
  GitBranch,
  Cpu,
  Globe,
  Database,
  Braces,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const typingTexts = [
  "DSA Enthusiast",
  "Java & OOP Developer",
  "Frontend Explorer",
  "Tech Competition Participant",
];

const floatingIcons = [
  { icon: Code2, x: "10%", y: "20%", delay: 0, color: "text-neon-blue" },
  { icon: Braces, x: "85%", y: "15%", delay: 0.5, color: "text-neon-purple" },
  { icon: GitBranch, x: "75%", y: "70%", delay: 1, color: "text-neon-teal" },
  { icon: Cpu, x: "15%", y: "75%", delay: 1.5, color: "text-neon-blue" },
  { icon: Globe, x: "90%", y: "45%", delay: 2, color: "text-neon-purple" },
  { icon: Database, x: "5%", y: "50%", delay: 2.5, color: "text-neon-teal" },
];

function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          if (displayText.length === currentText.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setDisplayText(currentText.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

export function HeroSection() {
  const typedText = useTypingEffect(typingTexts);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Floating icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute hidden opacity-20 md:block ${item.color}`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.15,
            scale: 1,
            y: [0, -20, 0],
          }}
          transition={{
            delay: item.delay,
            duration: 4,
            y: { repeat: Infinity, duration: 3 + i * 0.5, ease: "easeInOut" },
          }}
        >
          <item.icon className="h-10 w-10" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-teal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-teal" />
            </span>
            Available for opportunities
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-balance text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">Hi, I{"'"}m </span>
          <span className="text-gradient">Saurabh Kesharwani</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6 text-lg text-muted-foreground md:text-xl"
        >
          2nd Year B.Tech CSE Student at IIIT Kalyani | Full Stack Developer | Problem Solver
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10 flex h-8 items-center justify-center"
        >
          <span className="font-mono text-lg text-primary md:text-xl">
            {">"} {typedText}
            <span className="ml-0.5 animate-pulse text-primary">|</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            onClick={scrollToProjects}
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground transition-all hover:glow-blue"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </span>
          </Button>
          <Button
            variant="outline"
            className="group rounded-full border-glass-border bg-glass-bg px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5"
          >
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Download Resume
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll Down</span>
          <div className="flex h-6 w-4 items-start justify-center rounded-full border border-muted-foreground/30 p-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
