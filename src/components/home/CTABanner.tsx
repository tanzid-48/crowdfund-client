"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 text-center"
      >
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Ready to fund what matters?
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Join Crowdfund today and start backing campaigns or launching your own
          — in under two minutes.
        </p>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
