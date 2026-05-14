"use client";

import { useRef, useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  type HTMLMotionProps,
} from "framer-motion";
import { withHover } from "@/lib/motionHOC";

type MDP = HTMLMotionProps<"div">;
const HoverBox = withHover(motion.div as ComponentType<MDP>);

/* ── Live delivery status cycling ───────────────────────────────────────── */
const STATUSES = [
  { label: "Order placed",   color: "#f97316", icon: "📱" },
  { label: "Preparing",      color: "#3b82f6", icon: "👨‍🍳" },
  { label: "Rider assigned", color: "#8b5cf6", icon: "🛵" },
  { label: "On the way",     color: "#10b981", icon: "📍" },
  { label: "Delivered! 🎉",  color: "#f59e0b", icon: "✅" },
];

function DeliveryPhone() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % STATUSES.length;
        setProgress(((next + 1) / STATUSES.length) * 100);
        return next;
      });
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="relative select-none"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Phone */}
      <div
        className="rounded-[3rem] p-3"
        style={{
          width: 320,
          background: "linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)",
          boxShadow: "0 50px 100px rgba(124,58,237,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full z-10"
          style={{ backgroundColor: "#0a0a14" }} />

        <div className="rounded-[2.5rem] overflow-hidden">
          {/* Browser bar */}
          <div className="px-4 py-2.5 flex items-center gap-2" style={{ backgroundColor: "#12122a" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 rounded-lg px-3 py-1 text-xs flex items-center gap-1.5"
              style={{ backgroundColor: "#1e1e3a", color: "#94a3b8" }}>
              <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              nomen.delivery/track
            </div>
          </div>

          {/* App */}
          <div style={{ backgroundColor: "#0f0f1e", minHeight: 520 }}>
            {/* Header */}
            <div className="px-5 pt-5 pb-4" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-white text-sm"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>N</div>
                  <span className="text-white font-bold">Nomen</span>
                </div>
                <span className="text-xs text-white/60">Order #D-0041</span>
              </div>
              <p className="text-white font-semibold text-sm">Paneer Tikka Masala</p>
              <p className="text-white/60 text-xs">Spice Garden · ₹320</p>
            </div>

            <div className="p-4">
              {/* Progress steps */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  {STATUSES.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        animate={{
                          backgroundColor: i <= step ? s.color : "rgba(255,255,255,0.06)",
                          scale: i === step ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        {i <= step ? s.icon : <span style={{ color: "#475569" }}>·</span>}
                      </motion.div>
                    </div>
                  ))}
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1e293b" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Current status */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="rounded-2xl p-4 mb-4 text-center"
                  style={{ backgroundColor: `${STATUSES[step].color}15`, border: `1px solid ${STATUSES[step].color}30` }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-2xl mb-1">{STATUSES[step].icon}</p>
                  <p className="font-bold text-sm" style={{ color: STATUSES[step].color }}>
                    {STATUSES[step].label}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden" style={{ height: 140, backgroundColor: "#1e293b", position: "relative" }}>
                <div className="absolute inset-0 opacity-15">
                  {[0,1,2,3,4,5].map(r => (
                    <div key={r} className="absolute left-0 right-0" style={{ top: `${r*20}%`, height: 1, backgroundColor: "#475569" }} />
                  ))}
                  {[0,1,2,3,4,5,6].map(c => (
                    <div key={c} className="absolute top-0 bottom-0" style={{ left: `${c*16.6}%`, width: 1, backgroundColor: "#475569" }} />
                  ))}
                </div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 140">
                  <path d="M 40 110 Q 100 60 160 80 Q 220 95 280 30" stroke="#7c3aed" strokeWidth="3" fill="none" strokeDasharray="8 4" opacity="0.9" />
                  <circle cx="40" cy="110" r="6" fill="#10b981" />
                  <circle cx="280" cy="30" r="6" fill="#f97316" />
                  <motion.circle
                    cx="160" cy="80" r="5" fill="#7c3aed"
                    animate={{ cx: [100, 160, 220], cy: [70, 80, 60] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>📍 You</div>
                <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(249,115,22,0.2)", color: "#fb923c" }}>🍽️ Restaurant</div>
              </div>

              {/* ETA */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs" style={{ color: "#64748b" }}>🛵 Ravi Kumar</span>
                <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>ETA 22 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        style={{ width: 220, height: 24, background: "radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, transparent 70%)", filter: "blur(10px)" }} />
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function NomenHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY    = useSpring(useTransform(scrollYProgress, [0,1], ["0%","25%"]), { stiffness:60, damping:20 });
  const textY  = useSpring(useTransform(scrollYProgress, [0,1], ["0%","18%"]), { stiffness:60, damping:20 });
  const phoneY = useSpring(useTransform(scrollYProgress, [0,1], ["0%","10%"]), { stiffness:60, damping:20 });
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 30);
      my.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  const bx = useSpring(mx, { stiffness: 40, damping: 18 });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ backgroundColor: "#06040f" }}
    >
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, x: bx }} aria-hidden="true">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 80% at 50% 40%, #2d1b69 0%, #1a0f3d 45%, #06040f 100%)",
        }} />
        {[
          { x:"20%", y:"25%", size:300, color:"#7c3aed", op:0.35, dur:6 },
          { x:"75%", y:"15%", size:260, color:"#4f46e5", op:0.28, dur:8 },
          { x:"80%", y:"65%", size:220, color:"#6d28d9", op:0.22, dur:7 },
          { x:"15%", y:"70%", size:280, color:"#4338ca", op:0.25, dur:9 },
          { x:"50%", y:"85%", size:360, color:"#3730a3", op:0.18, dur:10 },
        ].map((b, i) => (
          <motion.div key={i} className="absolute rounded-full" style={{
            left: b.x, top: b.y, width: b.size, height: b.size,
            backgroundColor: b.color, opacity: b.op, filter: "blur(80px)", transform: "translate(-50%,-50%)",
          }}
            animate={{ scale:[1,1.3,1], opacity:[b.op, b.op*1.4, b.op] }}
            transition={{ duration: b.dur, repeat: Infinity, ease:"easeInOut", delay: i*0.8 }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <motion.div style={{ y: textY, opacity: fadeOut }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.35)", color: "#c4b5fd" }}>
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              Delivery platform by Orderlyy
            </div>

            <h1 className="font-extrabold text-white mb-6"
              style={{ fontSize: "clamp(2.2rem,5.5vw,4.5rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Deliver more.{" "}
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Keep more.
              </span>
            </h1>

            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "42ch" }}>
              Nomen gives Indian restaurants a zero-commission delivery platform.
              Own your customers, your data, and your delivery experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <HoverBox style={{ display: "inline-block" }}>
                <Link href="#nomen-features" className="block text-white font-bold px-9 py-4 rounded-full text-base"
                  style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}>
                  Start delivering free
                </Link>
              </HoverBox>
              <HoverBox style={{ display: "inline-block" }}>
                <Link href="#nomen-how" className="block font-bold px-9 py-4 rounded-full text-base"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" }}>
                  See how it works
                </Link>
              </HoverBox>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {["Zero commission", "50+ cities", "Own your data", "Free first 100 orders"].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="flex justify-center lg:justify-end"
            style={{ y: phoneY, opacity: fadeOut }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <DeliveryPhone />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      >
        <motion.div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}>
          <motion.div className="w-1 h-2 rounded-full" style={{ backgroundColor: "#7c3aed" }}
            animate={{ y: [0, 10, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }} aria-hidden="true" />
    </section>
  );
}
