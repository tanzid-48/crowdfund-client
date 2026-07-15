"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  eyebrow: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  progress: number;
  backers: string;
}

const slides: Slide[] = [
  {
    eyebrow: "For Supporters",
    headline: "Fund the ideas you believe in",
    subtext:
      "Back student-led campaigns with credits and watch your impact grow, one contribution at a time.",
    ctaLabel: "Explore Campaigns",
    ctaHref: "/explore-campaigns",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    progress: 72,
    backers: "1.2k",
  },
  {
    eyebrow: "For Creators",
    headline: "Turn your idea into a funded reality",
    subtext:
      "Launch a campaign, set your goal, and let a community of supporters carry it forward.",
    ctaLabel: "Start a Campaign",
    ctaHref: "/register",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    progress: 45,
    backers: "850",
  },
  {
    eyebrow: "Fund what matters",
    headline: "Every contribution moves the needle",
    subtext:
      "No amount is too small. Track progress in real time and see exactly where your credits go.",
    ctaLabel: "Join Crowdfund",
    ctaHref: "/register",
    imageUrl:
      "https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29udHJpYnV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    progress: 90,
    backers: "2.4k",
  },
];

export default function HeroSlider() {
  return (
    <section className="border-b border-border bg-background overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-4 py-16 sm:py-24 md:grid-cols-2 md:py-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary-foreground">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                  {slide.headline}
                </h1>
                <p className="mt-4 max-w-md text-base text-muted-foreground">
                  {slide.subtext}
                </p>
                <div className="mt-8">
                  <Link href={slide.ctaHref}>
                    <Button size="lg">{slide.ctaLabel}</Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex flex-col items-center gap-6"
              >
                <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.headline}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* স্ট্যাটিস্টিকস বা কাউন্টার বক্স */}
                <div className="flex w-full justify-around rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {slide.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Funded
                    </p>
                  </div>
                  <div className="h-10 w-px bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {slide.backers}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Backers
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
