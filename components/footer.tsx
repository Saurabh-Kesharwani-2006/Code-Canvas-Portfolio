"use client";

import { Terminal, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono">
            <span className="text-primary">{"<"}</span>
            Dev
            <span className="text-primary">{"/>"}</span>
          </span>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          Built with
          <Heart className="h-3.5 w-3.5 text-neon-purple" />
          using Next.js & Framer Motion
        </p>
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
