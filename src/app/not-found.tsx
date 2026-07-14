"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex max-w-lg flex-col items-center text-center">
        {/* Animated 404 illustration — funding-themed: একটা ফাঁকা/broken progress circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-8 h-40 w-40"
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--border)"
              strokeWidth="10"
            />
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="565"
              initial={{ strokeDashoffset: 565 }}
              animate={{ strokeDashoffset: 565 * 0.75 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-4xl font-bold text-foreground">
              404
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            This campaign doesn&apos;t exist
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page you&apos;re looking for may have been moved, funded and
            closed, or never existed at all.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/">
              <Button className="w-full gap-2 sm:w-auto">
                <Home size={16} />
                Back to Home
              </Button>
            </Link>
            <Link href="/explore-campaigns">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                <Search size={16} />
                Explore Campaigns
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
