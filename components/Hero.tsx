"use client";

import { useRef, useEffect, type ComponentType } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type HTMLMotionProps,
} from "framer-motion";
import { withHover } from "@/lib/motionHOC";

/* ── HOC ─────────────────────────────────────────────────────────────────── */
type MDP = HTMLMotionProps<"div">;
const HoverBox = withHover(motion.div as ComponentType<MDP>);

/* ─────────────────────────────────────────────────────────────────────────
   Framer pattern (from provided snippet):
          whileHover={{ rotate: 90 }}
   Each TintSquare is a coloured rounded square that floats in the 3-D
   parallax scene and responds to mouse tilt.
───────────────────────────────────────────────────────────────────────── */
function TintSquare({
  tint, size = 100, depth = 0, rotateOffset = 0,
}: {
  tint: string; size?: number; depth?: number; rotateOffset?: number;
}) {
  return (
    <motion.div
      style={{
        width: size, height: size,
        borderRadius: size * 0.25,
        backgroundColor: tint,
        translateZ: depth,
        rotate: rotateOffset,
        boxShadow: `0 ${size * 0.18}px ${size * 0.45}px rgba(0,0,0,0.32)`,
      }}
            whileHover={{ rotate: 90 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    />
  );
}

/* ── 3-D QR stand ────────────────────────────────────────────────────────── */
function QRStand({
  rotateX, rotateY,
}: {
  rotateX: ReturnType<typeof useSpring>;
  rotateY: ReturnType<typeof useSpring>;
}) {
  /* Deterministic QR pattern — no Math.random, avoids hydration mismatch */
  const QR = [
    1,1,1,0,1,0,1,1,1,
    1,0,1,0,0,0,1,0,1,
    1,0,1,1,0,1,1,0,1,
    1,0,0,0,1,0,0,0,0,
    0,1,0,1,1,1,0,1,0,
    1,0,0,0,1,0,0,0,1,
    1,0,1,1,0,1,1,0,1,
    1,0,1,0,0,0,1,0,1,
    1,1,1,0,1,0,1,1,1,
  ];

  return (
    <motion.div
      className="relative select-none"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Card face */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          width: 240,
          background: "linear-gradient(145deg,#fff 0%,#efefef 100%)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Brand strip — dark red matching reference */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ background: "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)" }}
        >
          <motion.div
            style={{ width: 20, height: 20, flexShrink: 0 }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="17" cy="17" r="16" fill="rgba(255,255,255,0.18)" />
              <rect x="8"  y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="19" y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="8"  y="19" width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="14.5" y="14.5" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
              <rect x="9.5"  y="9.5"  width="4" height="4" rx="0.8" fill="#fbbf24"/>
              <rect x="20.5" y="9.5"  width="4" height="4" rx="0.8" fill="#fbbf24"/>
              <rect x="9.5"  y="20.5" width="4" height="4" rx="0.8" fill="#fbbf24"/>
            </svg>
          </motion.div>
          <span className="brand-wordmark text-white text-sm">Orderlyy</span>
        </div>

        {/* QR grid — always white inside (phone/card UI is always light) */}
        <div className="p-5" style={{ backgroundColor: "#ffffff" }}>
          <div
            className="grid gap-0.5"
            style={{ gridTemplateColumns: "repeat(9,1fr)" }}
            aria-label="QR code"
          >
            {QR.map((cell, i) => (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{ backgroundColor: cell ? "#111" : "transparent" }}
              />
            ))}
          </div>
          <p className="text-center text-xs mt-3 font-medium tracking-wide" style={{ color: "#9ca3af" }}>
            Scan to order
          </p>
        </div>

        {/* 3-D right-edge depth illusion */}
        <div
          className="absolute top-0 right-0 bottom-0"
          style={{
            width: 10,
            background: "linear-gradient(90deg,rgba(0,0,0,0.06),rgba(0,0,0,0.18))",
            transform: "translateX(100%) rotateY(90deg)",
            transformOrigin: "left center",
          }}
        />
      </motion.div>

      {/* Stand neck */}
      <div className="flex justify-center">
        <div style={{
          width: 44, height: 22,
          background: "linear-gradient(180deg,#777 0%,#444 100%)",
          clipPath: "polygon(18% 0%,82% 0%,100% 100%,0% 100%)",
        }} />
      </div>

      {/* Stand base */}
      <div className="flex justify-center">
        <div style={{
          width: 100, height: 14,
          background: "linear-gradient(180deg,#666 0%,#333 100%)",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
        }} />
      </div>

      {/* Table shadow */}
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2"
        style={{
          width: 180, height: 18,
          background: "radial-gradient(ellipse,rgba(0,0,0,0.35) 0%,transparent 70%)",
          filter: "blur(7px)",
        }}
      />
    </motion.div>
  );
}

/* ── Floating tint squares ───────────────────────────────────────────────── */
const SQUARES = [
  { tint: "#f97316", size: 58,  top: "10%", left: "5%",  depth: 60, rotOff: 12,  op: 0.5 },
  { tint: "#8b5cf6", size: 42,  top: "18%", left: "88%", depth: 40, rotOff: -8,  op: 0.45 },
  { tint: "#10b981", size: 32,  top: "64%", left: "4%",  depth: 80, rotOff: 20,  op: 0.42 },
  { tint: "#3b82f6", size: 46,  top: "67%", left: "89%", depth: 50, rotOff: -15, op: 0.45 },
  { tint: "#f59e0b", size: 26,  top: "37%", left: "93%", depth: 30, rotOff: 5,   op: 0.42 },
  { tint: "#ec4899", size: 36,  top: "77%", left: "76%", depth: 70, rotOff: -22, op: 0.38 },
  { tint: "#06b6d4", size: 24,  top: "50%", left: "2%",  depth: 45, rotOff: 18,  op: 0.40 },
  { tint: "#a855f7", size: 34,  top: "28%", left: "3%",  depth: 35, rotOff: -10, op: 0.38 },
];

/* ── Bokeh blobs — warm restaurant tones matching reference ─────────────── */
const BLOBS = [
  { x: "18%", y: "22%", size: 280, op: 0.60, color: "#c2410c", dur: 5   },
  { x: "72%", y: "14%", size: 320, op: 0.50, color: "#b45309", dur: 7   },
  { x: "82%", y: "58%", size: 240, op: 0.42, color: "#92400e", dur: 6   },
  { x: "12%", y: "68%", size: 300, op: 0.42, color: "#9a3412", dur: 8   },
  { x: "50%", y: "80%", size: 400, op: 0.30, color: "#7c2d12", dur: 9   },
  { x: "42%", y: "6%",  size: 220, op: 0.38, color: "#d97706", dur: 5.5 },
  { x: "62%", y: "42%", size: 200, op: 0.28, color: "#b45309", dur: 7.5 },
];

/* ── Main Hero ───────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Scroll-driven parallax ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY      = useSpring(useTransform(scrollYProgress, [0,1], ["0%","30%"]),  { stiffness:60, damping:20 });
  const tableY   = useSpring(useTransform(scrollYProgress, [0,1], ["0%","12%"]),  { stiffness:60, damping:20 });
  const sqY      = useSpring(useTransform(scrollYProgress, [0,1], ["0%","18%"]),  { stiffness:60, damping:20 });
  const sqX      = useSpring(useTransform(scrollYProgress, [0,1], ["0%","6%"]),   { stiffness:60, damping:20 });
  const headY    = useSpring(useTransform(scrollYProgress, [0,1], ["0%","22%"]),  { stiffness:60, damping:20 });
  const standY   = useSpring(useTransform(scrollYProgress, [0,1], ["0%","8%"]),   { stiffness:60, damping:20 });
  const fadeOut  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ── Mouse → 3-D tilt ── */
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rawBX = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      rawRX.set(-ny * 14);
      rawRY.set( nx * 18);
      rawBX.set( nx * 35);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawRX, rawRY, rawBX]);

  const sceneRX = useSpring(rawRX, { stiffness: 50, damping: 18 });
  const sceneRY = useSpring(rawRY, { stiffness: 50, damping: 18 });
  const bx      = useSpring(rawBX, { stiffness: 40, damping: 18 });

  /* Squares share the scene rotation — depth tinting is handled via translateZ */

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#2d0e00" }}
    >
      {/* ══ Layer 0 — Full-bleed bokeh background ══ */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, x: bx }}
        aria-hidden="true"
      >
        {/* Warm radial gradient — matches reference image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 90% at 50% 38%, #8b3a0f 0%, #5c1f06 42%, #2d0e00 100%)",
          }}
        />
        {/* Bokeh blobs */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.x, top: b.y,
              width: b.size, height: b.size,
              backgroundColor: b.color,
              opacity: b.op,
              filter: "blur(80px)",
              transform: "translate(-50%,-50%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [b.op, b.op * 1.4, b.op] }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
      </motion.div>

      {/* ══ Layer 1 — Wooden table surface ══ */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ y: tableY }}
        aria-hidden="true"
      >
        <div
          style={{
            height: 220,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(160,90,20,0.55) 28%, rgba(130,70,10,0.96) 100%)",
          }}
        />
        {/* Wood grain lines */}
        {[14, 36, 60, 86, 114, 144].map((b) => (
          <div
            key={b}
            className="absolute left-0 right-0"
            style={{
              bottom: b, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,200,80,0.09), transparent)",
            }}
          />
        ))}
        {/* Warm sheen */}
        <div
          className="absolute left-0 right-0 bottom-0"
          style={{
            height: 220,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,180,60,0.05) 60%, rgba(255,160,40,0.1) 100%)",
          }}
        />
      </motion.div>

      {/* ══ Layer 2 — 3-D tint squares (Framer pattern) ══ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: sqY, x: sqX, perspective: 1200, transformStyle: "preserve-3d" }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0"
          style={{ rotateX: sceneRX, rotateY: sceneRY, transformStyle: "preserve-3d" }}
        >
          {SQUARES.map((sq, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: sq.top, left: sq.left,
                opacity: sq.op,
                transformStyle: "preserve-3d",
                rotateX: sceneRX,
                rotateY: sceneRY,
                translateZ: sq.depth,
              }}
            >
              <TintSquare
                tint={sq.tint}
                size={sq.size}
                depth={sq.depth}
                rotateOffset={sq.rotOff}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ══ Layer 3 — Content ══ */}
      <motion.div
        className="relative z-10 flex flex-col items-center min-h-screen"
        style={{ opacity: fadeOut }}
      >

        {/* ── Headline — top, centered ── */}
        <motion.div
          className="w-full text-center px-4 pt-28 sm:pt-32"
          style={{ y: headY }}
        >
          <motion.h1
            className="font-display text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 5.2vw, 4.2rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              textShadow: "0 2px 32px rgba(0,0,0,0.65)",
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Built in India. Built for Indian restaurants.
          </motion.h1>

          <motion.p
            className="mt-5 text-base sm:text-lg max-w-lg mx-auto"
            style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.75, fontFamily: "var(--font-body)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Let guests order on their own and save on staff costs while increasing revenue
          </motion.p>
        </motion.div>

        {/* ── QR Stand — center, sitting on table ── */}
        <motion.div
          className="flex-1 flex items-end justify-center"
          style={{ y: standY, paddingBottom: "7rem" }}
          initial={{ opacity: 0, scale: 0.82, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 180, damping: 22 }}
        >
          <QRStand rotateX={sceneRX} rotateY={sceneRY} />
        </motion.div>

        {/* ── Single CTA — above table edge ── */}
        <motion.div
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <HoverBox style={{ display: "inline-block" }}>
            <Link
              href="#get-started"
              className="block text-white font-bold px-10 py-4 rounded-full text-base whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)",
                boxShadow: "0 8px 32px rgba(153,27,27,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              Get started with Orderlyy
            </Link>
          </HoverBox>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
        style={{ opacity: fadeOut }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: "#f97316" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-base))" }}
        aria-hidden="true"
      />
    </section>
  );
}
