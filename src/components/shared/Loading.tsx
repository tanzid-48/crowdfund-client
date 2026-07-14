"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-background">
      <div className="relative h-16 w-16">
        {/* বাইরের ঘুরন্ত ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-border"
          style={{ borderTopColor: "var(--primary)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* ভিতরের pulsing dot — funding progress এর মতো ফিল */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-3 w-3 rounded-full bg-primary" />
        </motion.div>
      </div>

      <motion.p
        className="font-heading text-sm font-medium text-muted-foreground"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading campaigns...
      </motion.p>
    </div>
  );
}