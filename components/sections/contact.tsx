"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/section-header";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-neon-blue" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", color: "hover:text-neon-teal" },
  { icon: Mail, label: "Email", href: "mailto:hello@example.com", color: "hover:text-neon-purple" },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          badge="Contact"
          title="Let's Connect"
          description="Have a project in mind or want to collaborate? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>hello@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>India</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Social Profiles
              </h3>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border border-glass-border bg-secondary/50 text-muted-foreground transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-neon-teal" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Thank you for reaching out. I{"'"}ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="relative">
                        <label
                          className={`absolute left-3 transition-all duration-200 ${
                            focused === "name"
                              ? "-top-2.5 text-xs text-primary bg-card px-1"
                              : "top-3 text-sm text-muted-foreground"
                          }`}
                        >
                          Name
                        </label>
                        <Input
                          onFocus={() => setFocused("name")}
                          onBlur={(e) => {
                            if (!e.target.value) setFocused(null);
                          }}
                          className="border-glass-border bg-secondary/30 pt-3 text-foreground focus:border-primary"
                          required
                        />
                      </div>
                      <div className="relative">
                        <label
                          className={`absolute left-3 transition-all duration-200 ${
                            focused === "email"
                              ? "-top-2.5 text-xs text-primary bg-card px-1"
                              : "top-3 text-sm text-muted-foreground"
                          }`}
                        >
                          Email
                        </label>
                        <Input
                          type="email"
                          onFocus={() => setFocused("email")}
                          onBlur={(e) => {
                            if (!e.target.value) setFocused(null);
                          }}
                          className="border-glass-border bg-secondary/30 pt-3 text-foreground focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <label
                        className={`absolute left-3 transition-all duration-200 ${
                          focused === "subject"
                            ? "-top-2.5 text-xs text-primary bg-card px-1"
                            : "top-3 text-sm text-muted-foreground"
                        }`}
                      >
                        Subject
                      </label>
                      <Input
                        onFocus={() => setFocused("subject")}
                        onBlur={(e) => {
                          if (!e.target.value) setFocused(null);
                        }}
                        className="border-glass-border bg-secondary/30 pt-3 text-foreground focus:border-primary"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label
                        className={`absolute left-3 transition-all duration-200 z-10 ${
                          focused === "message"
                            ? "-top-2.5 text-xs text-primary bg-card px-1"
                            : "top-3 text-sm text-muted-foreground"
                        }`}
                      >
                        Message
                      </label>
                      <Textarea
                        rows={5}
                        onFocus={() => setFocused("message")}
                        onBlur={(e) => {
                          if (!e.target.value) setFocused(null);
                        }}
                        className="border-glass-border bg-secondary/30 pt-3 text-foreground focus:border-primary resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full gap-2 rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:glow-blue"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
