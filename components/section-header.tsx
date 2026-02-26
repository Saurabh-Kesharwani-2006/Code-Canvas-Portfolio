"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16 text-center"
    >
      <span className="mb-4 inline-block rounded-full border border-glass-border bg-glass-bg px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm">
        {badge}
      </span>
      <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
}
