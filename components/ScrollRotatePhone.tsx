"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HoverDiv, RandomColorDiv, useColorStore } from "@/lib/motionHOC";

/* ── Scroll-driven 3-D rotation card ─────────────────────────────────────── */
function RotatingCard({
  children,
  offset = 0,
  rotateRange = [-25, 25] as [number, number],
  scaleRange  = [0.85, 1] as [number, number],
  className = "",
}: {
  children: React.ReactNode;
  offset?: number;
  rotateRange?: [number, number];
  scaleRange?: [number, number];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawRotate  = useTransform(scrollYProgress, [0, 0.5, 1], [rotateRange[0] + offset, 0, rotateRange[1] + offset]);
  const rawScale   = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], scaleRange[1], scaleRange[0]]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const rotateY = useSpring(rawRotate, { stiffness: 80, damping: 20 });
  const scale   = useSpring(rawScale,  { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`perspective-1000 relative ${className}`}>
      <motion.div style={{ rotateY, scale, opacity: rawOpacity, transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </div>
  );
}

/* ── Phone mockup ─────────────────────────────────────────────────────────── */
function PhoneMockup({
  title, subtitle, items, accentColor, emoji,
}: {
  title: string; subtitle: string;
  items: { label: string; value: string; emoji: string }[];
  accentColor: string; emoji: string;
}) {
  return (
    /* Phone shell — always dark regardless of system theme */
    <div
      className="w-56 sm:w-64 rounded-[2.5rem] p-2.5"
      style={{ backgroundColor: "#111827", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
    >
      {/* Screen — always white inside (phone UI is always light) */}
      <div className="rounded-[2rem] overflow-hidden" style={{ backgroundColor: "#ffffff" }}>

        {/* Coloured header */}
        <div className="px-5 pt-5 pb-6" style={{ backgroundColor: accentColor }}>
          <div className="flex justify-between items-center text-white text-xs mb-3 opacity-80">
            <span className="font-semibold">9:41</span>
            <div className="w-3.5 h-2 border border-white/70 rounded-sm">
              <div className="w-2.5 h-full bg-white/70 rounded-sm" />
            </div>
          </div>
          <div className="text-2xl mb-1">{emoji}</div>
          <h3 className="text-white font-bold text-base leading-tight">{title}</h3>
          <p className="text-white/70 text-xs mt-0.5">{subtitle}</p>
        </div>

        {/* Menu rows */}
        <div className="p-3 space-y-2" style={{ backgroundColor: "#f9fafb" }}>
          {items.map((item) => (
            <HoverDiv
              key={item.label}
              className="flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ backgroundColor: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-xs font-semibold" style={{ color: "#111827" }}>{item.label}</span>
              </div>
              <span className="text-xs font-bold" style={{ color: accentColor }}>{item.value}</span>
            </HoverDiv>
          ))}

          {/* withRandomColor — clicking cycles global accent */}
          <RandomColorDiv
            className="w-full text-white text-xs font-bold py-2.5 rounded-xl mt-1 text-center"
            style={{ backgroundColor: accentColor }}
          >
            Place Order
          </RandomColorDiv>
        </div>
      </div>
    </div>
  );
}

/* ── Card data — Indian Rupee prices ─────────────────────────────────────── */
const cards = [
  {
    title: "Café Menu", subtitle: "Table 4 · Scan & Order",
    accentColor: "#f97316", emoji: "☕",
    rotateRange: [-30, 15] as [number, number],
    items: [
      { label: "Espresso",  value: "₹180", emoji: "☕" },
      { label: "Croissant", value: "₹220", emoji: "🥐" },
      { label: "OJ Fresh",  value: "₹160", emoji: "🍊" },
    ],
  },
  {
    title: "Bar Orders", subtitle: "Table 7 · Live orders",
    accentColor: "#8b5cf6", emoji: "🍺",
    rotateRange: [-15, 30] as [number, number],
    items: [
      { label: "Craft Beer", value: "₹320", emoji: "🍺" },
      { label: "Nachos",     value: "₹280", emoji: "🌮" },
      { label: "Cocktail",   value: "₹450", emoji: "🍹" },
    ],
  },
  {
    title: "Restaurant", subtitle: "Table 12 · Dinner",
    accentColor: "#10b981", emoji: "🍽️",
    rotateRange: [-20, 20] as [number, number],
    items: [
      { label: "Paneer Tikka", value: "₹380", emoji: "🥩" },
      { label: "Lassi",        value: "₹120", emoji: "🥛" },
      { label: "Gulab Jamun",  value: "₹90",  emoji: "🍮" },
    ],
  },
];

/* ── Section ──────────────────────────────────────────────────────────────── */
export default function ScrollRotatePhone() {
  const { background } = useColorStore();

  return (
    /* Dark section — intentionally stays dark in both light & dark mode */
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-dark)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--orange)", opacity: 0.08 }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#8b5cf6", opacity: 0.08 }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ backgroundColor: "#10b981", opacity: 0.04 }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p
            className="font-semibold text-sm uppercase tracking-widest mb-3"
            style={{ color: "var(--orange)" }}
          >
            Works everywhere
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            One platform.{" "}
            <motion.span
              className="inline-block"
              style={{ color: background }}
              animate={{ color: background }}
              transition={{ duration: 0.5 }}
            >
              Every venue.
            </motion.span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Scroll to see Orderlyy in action across cafés, bars, and restaurants.
          </p>
        </div>

        {/* Rotating phone cards */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16">
          {cards.map((card, i) => (
            <RotatingCard
              key={card.title}
              offset={i * 5 - 5}
              rotateRange={card.rotateRange}
              scaleRange={[0.8, 1]}
              className="flex-shrink-0"
            >
              <PhoneMockup
                title={card.title}
                subtitle={card.subtitle}
                accentColor={card.accentColor}
                emoji={card.emoji}
                items={card.items}
              />
            </RotatingCard>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="flex flex-col items-center mt-16 gap-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-xs font-medium uppercase tracking-widest">Scroll to rotate</span>
        </div>
      </div>
    </section>
  );
}
