"use client";

import { motion } from "framer-motion";
import { UserPlus, Rocket, HandCoins } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up as a Supporter or Creator and get free starting credits instantly.",
  },
  {
    icon: Rocket,
    title: "Launch or explore",
    description:
      "Creators start a campaign; Supporters browse and find causes worth backing.",
  },
  {
    icon: HandCoins,
    title: "Fund and track",
    description:
      "Contribute credits, watch progress update live, and see the impact unfold.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          How Crowdfund works
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Three simple steps, whichever side you agitre on
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon size={26} />
            </div>
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              STEP {i + 1}
            </span>
            <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
