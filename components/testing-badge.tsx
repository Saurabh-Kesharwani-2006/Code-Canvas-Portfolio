"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export function TestingBadge() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Badge */}
      <motion.button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-amber-500/30 bg-background/80 px-4 py-2 text-xs font-medium text-amber-400 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-amber-400/50 hover:shadow-amber-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{
          boxShadow: "0 0 20px rgba(245, 158, 11, 0.3)",
        }}
        aria-label="View testing disclaimer"
      >
        <AlertTriangle className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Demo Data</span>
      </motion.button>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] rounded-2xl border border-amber-500/30 bg-background/95 p-5 shadow-2xl backdrop-blur-md sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:right-auto sm:-translate-x-1/2 sm:-translate-y-1/2"
              style={{
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.15)",
              }}
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close disclaimer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    Demo Portfolio Notice
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    All experience, achievements, project statistics, competitive programming ratings, 
                    and other data displayed in this portfolio are{" "}
                    <span className="font-medium text-amber-400">
                      sample/demo content
                    </span>{" "}
                    for portfolio presentation in competition purposes.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/20"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
