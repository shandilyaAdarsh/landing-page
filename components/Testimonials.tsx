"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotatingDiv, HoverDiv, RandomColorDiv, useColorStore } from "@/lib/motionHOC";

const testimonials = [
  { name: "Jan Willem Foppen", rating: 5, text: "Scan, order, done. Simple and fast. Usually with QR codes you have to fill in all kinds of personal details, but not here. Excellent!", source: "Google", time: "8 months ago", avatar: "JW" },
  { name: "Christianne Luijten", rating: 5, text: "I love how you can order drinks with your phone and they bring it really quick! Love the employees as well!! And they are open until late!", source: "Google", time: "5 months ago", avatar: "CL" },
  { name: "André Schuurmans", rating: 5, text: "Nice beers and a neat way to order that gets you lightning fast service and you don't have to worry about getting a bartender to notice you.", source: "Google", time: "2 months ago", avatar: "AS" },
  { name: "Izma R. Effendi", rating: 5, text: "A very nice bar in Delft. I love the atmosphere and the trendy look of the bar. You can even order from a QR code from your table. A must go!", source: "Google", time: "5 months ago", avatar: "IE" },
  { name: "Sietze Meijer", rating: 4, text: "Good food, much choice in drinks, great personnel. And do try their app to order your stuff!", source: "Google", time: "5 months ago", avatar: "SM" },
  { name: "Els Huurman", rating: 5, text: "Easy ordering with QR code! And the picanha is delicious! And the almond ice cream too!", source: "Google", time: "6 months ago", avatar: "EH" },
  { name: "Arwin Versteyne", rating: 5, text: "By combining our fast service with QR ordering, we can offer our guests optimal attention and service.", source: "Misset Horeca", time: "Terras Top 100 Winner", avatar: "AV" },
  { name: "sjoukeschr", rating: 5, text: "Via the QR code we could quickly order via our smartphone. We didn't have to wait long for our orders. Very handy that you can order multiple things!", source: "TripAdvisor", time: "3 months ago", avatar: "SJ" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        /* withRotate: each star rotates 90° on mount */
        <RotatingDiv
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          style={{ display: "inline-block" }}
          transition={{ duration: 2, delay: star * 0.1 }}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="w-4 h-4">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </RotatingDiv>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { background } = useColorStore();

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoplay();
  };

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-subtle)" }} aria-label="Customer testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
          style={{ color: "var(--text-primary)" }}>
            And guests agree.
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>We don&apos;t say it, they do.</p>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            💡 Click any avatar to change the site accent color
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="rounded-3xl p-8 lg:p-12 mb-8 max-w-3xl mx-auto text-center"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.35 }}
          >
            {/* withRandomColor: clicking the featured avatar changes ALL accent colors */}
            <RandomColorDiv
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
              style={{ backgroundColor: background }}
              title="Click to randomize accent color"
              aria-label="Change accent color"
            >
              {testimonials[current].avatar}
            </RandomColorDiv>

            <StarRating rating={testimonials[current].rating} />

            <blockquote className="text-lg lg:text-xl italic mt-4 mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              &ldquo;{testimonials[current].text}&rdquo;
            </blockquote>
            <p className="font-bold" style={{ color: "var(--text-primary)" }}>{testimonials[current].name}</p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {testimonials[current].source} · {testimonials[current].time}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-12" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => handleDotClick(i)}
              className="h-2 rounded-full transition-all"
              animate={{
                width: i === current ? 24 : 8,
                backgroundColor: i === current ? background : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.slice(0, 4).map((t, i) => (
            /* withHover: each card scales 1.05 on hover */
            <HoverDiv
              key={t.name}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <StarRating rating={t.rating} />
              <p className="text-sm italic mt-3 mb-4 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                {/* withRandomColor: clicking any card avatar changes all accents */}
                <RandomColorDiv
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: background }}
                  title="Click to randomize accent color"
                >
                  {t.avatar}
                </RandomColorDiv>
                <div>
                  <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.source}</p>
                </div>
              </div>
            </HoverDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
