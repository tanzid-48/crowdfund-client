"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Palette,
  Heart,
  Trophy,
  Music,
} from "lucide-react";

const categories = [
  { icon: GraduationCap, label: "Education" },
  { icon: Cpu, label: "Technology" },
  { icon: Palette, label: "Arts & Design" },
  { icon: Heart, label: "Community & Charity" },
  { icon: Trophy, label: "Sports" },
  { icon: Music, label: "Events" },
];

export default function ExploreByCategory() {
  return (
    <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Explore by category
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Find campaigns that match what you care about
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/explore-campaigns?category=${encodeURIComponent(cat.label)}`}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-primary hover:bg-primary/5"
              >
                <cat.icon className="text-primary" size={24} />
                <span className="text-sm font-medium text-foreground">
                  {cat.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
