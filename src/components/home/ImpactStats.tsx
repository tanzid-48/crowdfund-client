"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50", suffix: "", label: "Free credits for every new supporter" },
  { value: "20", suffix: "", label: "Free credits for every new creator" },
  { value: "10", suffix: " credits = $1", label: "Contribution rate for supporters" },
  { value: "24/7", suffix: "", label: "Real-time progress tracking" },
];

export default function ImpactStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Built for transparency
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The numbers behind how Crowdfund works
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-mono text-3xl font-bold text-primary sm:text-4xl">
              {stat.value}
              <span className="text-lg text-foreground">{stat.suffix}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}