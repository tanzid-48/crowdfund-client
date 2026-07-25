"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do credits work?",
    answer:
      "Credits are the currency used across Crowdfund. Supporters purchase credits (10 credits = $1) to back campaigns. Creators receive credits as their campaigns get funded, then withdraw them as cash (20 credits = $1).",
  },
  {
    question: "What happens after I contribute to a campaign?",
    answer:
      "Your contribution goes to the campaign creator for review. Once approved, the funds count toward the campaign's goal and you'll get a notification. If rejected, your credits are automatically refunded.",
  },
  {
    question: "How long does it take to withdraw funds?",
    answer:
      "Withdrawal requests are reviewed by our team. Once approved, funds are sent to your selected payment method (Stripe, bKash, Rocket, or Nagad). The minimum withdrawal is 200 credits.",
  },
  {
    question: "Can I get a refund on my contribution?",
    answer:
      "If a creator rejects your contribution, credits are refunded automatically. Approved contributions that have already funded a campaign are final, since creators may have already used the funds.",
  },
  {
    question: "Who can launch a campaign?",
    answer:
      "Any registered Creator can submit a campaign. Every campaign is reviewed by our admin team before it goes live, ensuring quality and legitimacy for supporters.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you need to know before you get started
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-foreground">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-muted-foreground"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
