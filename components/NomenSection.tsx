"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect } from "react";

/* ── Delivery order data cycling in the phone ───────────────────────────── */
const DELIVERY_ORDERS = [
  { id: "#D-0041", item: "Paneer Tikka Masala", restaurant: "Spice Garden", eta: "22 min", status: "On the way", rider: "Ravi K.", distance: "1.2 km" },
  { id: "#D-0042", item: "Butter Chicken + Naan", restaurant: "Punjabi Dhaba", eta: "18 min", status: "Preparing", rider: "Amit S.", distance: "0.8 km" },
  { id: "#D-0043", item: "Veg Biryani", restaurant: "Biryani House", eta: "30 min", status: "Picked up", rider: "Suresh M.", distance: "2.1 km" },
];

/* ── Mobile phone browser mockup ────────────────────────────────────────── */
function PhoneBrowserMockup() {
  const [orderIdx, setOrderIdx] = useState(0);
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const t1 = setInterval(() => setOrderIdx((i) => (i + 1) % DELIVERY_ORDERS.length), 3500);
    const t2 = setInterval(() => setProgress((p) => (p >= 95 ? 20 : p + 5)), 800);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, []);

  const order = DELIVERY_ORDERS[orderIdx];

  return (
    <motion.div
      className="relative select-none"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ perspective: 900 }}
    >
      {/* Phone shell */}
      <div
        className="rounded-[3rem] p-3 relative"
        style={{
          width: 300,
          background: "linear-gradient(145deg, #1e1e2e 0%, #111122 100%)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10"
          style={{ backgroundColor: "#0a0a14" }} />

        {/* Screen */}
        <div className="rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>

          {/* Browser chrome */}
          <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: "#1a1a2e" }}>
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 rounded-md px-2 py-1 text-xs flex items-center gap-1"
              style={{ backgroundColor: "#2a2a3e", color: "#94a3b8" }}>
              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              nomen.delivery
            </div>
          </div>

          {/* App content */}
          <div style={{ backgroundColor: "#0f172a", minHeight: 480 }}>

            {/* App header */}
            <div className="px-4 pt-4 pb-3" style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>N</div>
                  <span className="text-white font-bold text-sm">Nomen</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </div>
              </div>
              <p className="text-white/80 text-xs">Delivering to: Sector 18, Noida</p>
            </div>

            {/* Active order card */}
            <div className="p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={orderIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl p-3 mb-3"
                  style={{ backgroundColor: "#1e293b", border: "1px solid rgba(124,58,237,0.3)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{order.id}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ backgroundColor: "rgba(124,58,237,0.2)", color: "#a78bfa" }}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-0.5">{order.item}</p>
                  <p className="text-xs mb-2" style={{ color: "#94a3b8" }}>{order.restaurant}</p>

                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: "#334155" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #7c3aed, #4f46e5)", width: `${progress}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs" style={{ color: "#94a3b8" }}>
                    <span>🛵 {order.rider} · {order.distance}</span>
                    <span className="font-semibold" style={{ color: "#a78bfa" }}>ETA {order.eta}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden mb-3" style={{ height: 120, backgroundColor: "#1e293b", position: "relative" }}>
                {/* Fake map grid */}
                <div className="absolute inset-0 opacity-20">
                  {[0,1,2,3,4].map(r => (
                    <div key={r} className="absolute left-0 right-0" style={{ top: `${r*25}%`, height: 1, backgroundColor: "#475569" }} />
                  ))}
                  {[0,1,2,3,4,5].map(c => (
                    <div key={c} className="absolute top-0 bottom-0" style={{ left: `${c*20}%`, width: 1, backgroundColor: "#475569" }} />
                  ))}
                </div>
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120">
                  <path d="M 30 90 Q 80 40 150 60 Q 200 75 260 30" stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeDasharray="6 3" opacity="0.8" />
                  <circle cx="30" cy="90" r="5" fill="#10b981" />
                  <circle cx="260" cy="30" r="5" fill="#f97316" />
                  <circle cx="150" cy="60" r="4" fill="#7c3aed" />
                </svg>
                <div className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#34d399" }}>📍 You</div>
                <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: "rgba(249,115,22,0.2)", color: "#fb923c" }}>🛵 Rider</div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Orders", value: "2.4k", color: "#7c3aed" },
                  { label: "Riders", value: "148",  color: "#10b981" },
                  { label: "Avg ETA", value: "24m", color: "#f97316" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-2 text-center"
                    style={{ backgroundColor: "#1e293b" }}>
                    <p className="text-sm font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs" style={{ color: "#64748b" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phone shadow */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2"
        style={{ width: 200, height: 20, background: "radial-gradient(ellipse, rgba(124,58,237,0.3) 0%, transparent 70%)", filter: "blur(8px)" }} />
    </motion.div>
  );
}

/* ── Backend architecture cards ─────────────────────────────────────────── */
const ARCH = [
  {
    icon: "⚡",
    title: "Real-time Order Engine",
    desc: "WebSocket-powered order dispatch with sub-100ms latency. Orders flow from customer → kitchen → rider instantly.",
    color: "#f97316",
    tech: ["WebSockets", "Redis Pub/Sub", "Node.js"],
  },
  {
    icon: "🗺️",
    title: "Smart Routing Algorithm",
    desc: "ML-based rider assignment using live traffic, distance, and load balancing across the delivery fleet.",
    color: "#7c3aed",
    tech: ["Python", "Google Maps API", "TensorFlow"],
  },
  {
    icon: "🔐",
    title: "Secure Payment Gateway",
    desc: "PCI-DSS compliant payment processing with UPI, Razorpay, and Stripe. Instant settlement to restaurants.",
    color: "#10b981",
    tech: ["Razorpay", "UPI", "Stripe"],
  },
  {
    icon: "📊",
    title: "Analytics Dashboard",
    desc: "Real-time restaurant analytics — revenue, popular items, peak hours, and customer retention metrics.",
    color: "#3b82f6",
    tech: ["ClickHouse", "Grafana", "Next.js"],
  },
  {
    icon: "🚀",
    title: "Microservices Architecture",
    desc: "Independently scalable services: Auth, Orders, Delivery, Payments, Notifications — all containerised.",
    color: "#ec4899",
    tech: ["Docker", "Kubernetes", "gRPC"],
  },
  {
    icon: "🔔",
    title: "Push Notification System",
    desc: "Multi-channel notifications via FCM, SMS, and WhatsApp. Customers get live updates at every step.",
    color: "#f59e0b",
    tech: ["FCM", "Twilio", "WhatsApp API"],
  },
];

/* ── Main Nomen section ──────────────────────────────────────────────────── */
export default function NomenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const phoneY = useSpring(useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]), { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="nomen"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-dark)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#7c3aed", opacity: 0.08 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#4f46e5", opacity: 0.08 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Nomen logo badge */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}>
              N
            </div>
            <div className="text-left">
              <p className="text-white font-black text-2xl tracking-tight">Nomen</p>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
                by Orderlyy
              </p>
            </div>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Delivery, reimagined for{" "}
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Indian restaurants
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
            Nomen is Orderlyy&apos;s dedicated delivery platform — connecting restaurants directly
            with customers, with zero commission on the first 100 orders.
          </p>
        </motion.div>

        {/* ── Main grid: phone + arch cards ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">

          {/* Phone mockup */}
          <motion.div
            className="flex justify-center lg:justify-start"
            style={{ y: phoneY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <PhoneBrowserMockup />
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#a78bfa" }}>
              Why Nomen?
            </p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-6" style={{ letterSpacing: "-0.02em" }}>
              Your restaurant. Your customers. Your data.
            </h3>

            <div className="space-y-4 mb-8">
              {[
                { icon: "🚫", title: "Zero commission model", desc: "Keep 100% of your revenue. Pay only a flat monthly fee — no per-order cuts." },
                { icon: "🛵", title: "Own delivery fleet", desc: "Manage your own riders or use our on-demand rider network across 50+ cities." },
                { icon: "📱", title: "Branded customer app", desc: "White-label mobile app with your restaurant's branding, colours, and menu." },
                { icon: "🔗", title: "Seamless Orderlyy sync", desc: "Dine-in QR orders and delivery orders managed from one unified dashboard." },
              ].map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(124,58,237,0.08)" }}
                >
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{f.title}</p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/nomen"
                  className="block text-white font-bold px-8 py-3.5 rounded-full text-sm text-center"
                  style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 24px rgba(124,58,237,0.4)" }}
                >
                  Explore Nomen →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="#get-started"
                  className="block font-bold px-8 py-3.5 rounded-full text-sm text-center"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
                >
                  Start free trial
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Backend architecture grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#a78bfa" }}>
              Under the hood
            </p>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>
              Enterprise-grade backend architecture
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARCH.map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-2xl p-5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: `1px solid ${card.color}22`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, backgroundColor: `${card.color}08` }}
              >
                {/* Icon */}
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: `${card.color}18` }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {card.icon}
                </motion.div>

                <h4 className="font-bold text-white text-sm mb-2">{card.title}</h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {card.desc}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5">
                  {card.tech.map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: `${card.color}18`, color: card.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { value: "50+",   label: "Cities",          color: "#7c3aed" },
            { value: "2,400+",label: "Daily orders",    color: "#10b981" },
            { value: "148",   label: "Active riders",   color: "#f97316" },
            { value: "24 min",label: "Avg delivery",    color: "#3b82f6" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-5 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-2xl font-extrabold mb-1" style={{ color: s.color, letterSpacing: "-0.02em" }}>
                {s.value}
              </p>
              <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
