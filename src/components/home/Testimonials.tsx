"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I raised enough credits in three weeks to cover my robotics club's competition fees. Watching the progress bar move every time someone contributed kept the whole team motivated.",
    name: "Rafiul Islam",
    role: "Creator — Robotics Club Campaign",
    initials: "RI",
  },
  {
    quote:
      "As a supporter, I love that I can see exactly where my credits go and track a campaign's progress in real time. It feels transparent in a way most platforms don't.",
    name: "Nusrat Jahan",
    role: "Supporter — 12 campaigns backed",
    initials: "NJ",
  },
  {
    quote:
      "The withdrawal process was straightforward, and I always knew exactly how many credits I needed before I could cash out. No surprises, no confusion.",
    name: "Shanto Ahmed",
    role: "Creator — Campus Event Campaign",
    initials: "SA",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            What our community says
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real stories from creators and supporters on Crowdfund
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="testimonial-swiper pb-10"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
                <Quote className="mx-auto mb-4 text-primary/40" size={32} />
                <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
