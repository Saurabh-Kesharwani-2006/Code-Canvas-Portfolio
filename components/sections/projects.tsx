"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A futuristic, animated personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features glassmorphism, smooth transitions, and responsive design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "#",
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    title: "DSA Visualizer",
    description:
      "Interactive data structures and algorithms visualizer with step-by-step animations. Supports sorting algorithms, graph traversals, and tree operations.",
    tech: ["React", "JavaScript", "CSS Animations", "Canvas API"],
    github: "#",
    demo: "#",
    gradient: "from-neon-teal to-neon-blue",
  },
  {
    title: "Java Mini Project - Banking System",
    description:
      "Object-oriented banking system with user authentication, transaction history, and balance management. Demonstrates core OOP principles and JDBC connectivity.",
    tech: ["Java", "MySQL", "JDBC", "Swing UI"],
    github: "#",
    demo: "#",
    gradient: "from-neon-purple to-neon-teal",
  },
  {
    title: "Full Stack Task Manager",
    description:
      "A collaborative task management application with real-time updates, user authentication, drag-and-drop functionality, and team workspaces.",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
    github: "#",
    demo: "#",
    gradient: "from-neon-blue to-neon-teal",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          badge="Projects"
          title="Featured Work"
          description="A showcase of my best projects demonstrating my skills and creativity."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="glass relative h-full overflow-hidden rounded-2xl transition-all duration-300 hover:glow-blue">
                {/* Top gradient bar */}
                <div
                  className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-60 transition-opacity group-hover:opacity-100`}
                />

                <div className="p-6">
                  {/* Title row */}
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Description */}
                  <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border border-glass-border bg-secondary/50 text-xs font-medium text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-full border-glass-border bg-transparent text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="gap-2 rounded-full bg-primary text-primary-foreground hover:glow-blue"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
