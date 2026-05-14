"use client";

import { motion } from "framer-motion";

/* ── Order data ─────────────────────────────────────────────────────────── */
const orders = [
  {
    id: "#0041",
    table: "Table 2",
    items: ["Masala Chai ×2", "Butter Naan ×3", "Paneer Tikka ×1"],
    total: "₹680",
    status: "new",
    time: "Just now",
    guests: 4,
  },
  {
    id: "#0040",
    table: "Table 7",
    items: ["Craft Beer ×3", "Nachos ×1", "Veg Burger ×2"],
    total: "₹1,340",
    status: "preparing",
    time: "4 min ago",
    guests: 3,
  },
  {
    id: "#0039",
    table: "Table 11",
    items: ["Mango Lassi ×2", "Club Sandwich ×2"],
    total: "₹840",
    status: "ready",
    time: "9 min ago",
    guests: 2,
  },
  {
    id: "#0038",
    table: "Table 5",
    items: ["Cold Coffee ×1", "Gulab Jamun ×2"],
    total: "₹340",
    status: "served",
    time: "14 min ago",
    guests: 2,
  },
];

const STATUS: Record<string, { bg: string; color: string; label: string; dot: string }> = {
  new:       { bg: "rgba(249,115,22,0.13)", color: "#f97316", label: "New",       dot: "#f97316" },
  preparing: { bg: "rgba(59,130,246,0.13)", color: "#3b82f6", label: "Preparing", dot: "#3b82f6" },
  ready:     { bg: "rgba(16,185,129,0.13)", color: "#10b981", label: "Ready ✓",   dot: "#10b981" },
  served:    { bg: "rgba(139,92,246,0.13)", color: "#8b5cf6", label: "Served",    dot: "#8b5cf6" },
};

const features = [
  "Real-time order overview on tablet",
  "Disable menu items in 3 seconds",
  "Set preparation times per item",
  "Staff notifications for new orders",
  "Order history and analytics",
];

/* ── Component ──────────────────────────────────────────────────────────── */
export default function OrderManagement() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--orange)" }}
            >
              Staff dashboard
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              Stay in control.
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              With an optional tablet next to your POS, your staff sees every
              order the moment it&apos;s placed — and decides when to start
              preparing it.
            </p>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Is a product out of stock? Disable it in{" "}
              <strong style={{ color: "var(--text-primary)" }}>3 seconds</strong> and
              it vanishes from every guest&apos;s menu instantly.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--orange-light)" }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                      style={{ color: "var(--orange)" }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span style={{ color: "var(--text-secondary)" }}>{f}</span>
                </li>
              ))}
            </ul>

            <motion.a
              href="#get-started"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full"
              style={{ backgroundColor: "var(--orange)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              See it in action
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* ── Right: tablet mockup ── */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            {/* Tablet frame — no floating badge, clean */}
            <div
              className="rounded-3xl p-3 w-80 lg:w-96"
              style={{
                backgroundColor: "#111827",
                boxShadow: "0 32px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "var(--bg-card)" }}
              >

                {/* ── Tablet top bar ── */}
                <div
                  className="px-5 py-4"
                  style={{ backgroundColor: "#0f172a" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Logo mark */}
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center"
                        style={{ backgroundColor: "#f97316" }}
                      >
                        <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                          <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
                        </svg>
                      </div>
                      <p className="text-white font-bold text-sm">Order Management</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-xs font-medium">Live</span>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Active",  value: "3",      color: "#f97316" },
                      { label: "Revenue", value: "₹3,200", color: "#10b981" },
                      { label: "Tables",  value: "8/12",   color: "#3b82f6" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg px-3 py-2 text-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                      >
                        <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Order list ── */}
                <div
                  className="p-3 space-y-2.5"
                  style={{ backgroundColor: "var(--bg-subtle)" }}
                >
                  {orders.map((order, i) => {
                    const s = STATUS[order.status];
                    return (
                      <motion.div
                        key={order.id}
                        className="rounded-xl overflow-hidden"
                        style={{
                          backgroundColor: "var(--bg-card)",
                          boxShadow: "var(--shadow-sm)",
                          border: `1px solid ${s.color}22`,
                        }}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ scale: 1.015 }}
                      >
                        {/* Status accent bar */}
                        <div style={{ height: 3, backgroundColor: s.color }} />

                        <div className="px-4 py-3">
                          {/* Row 1: table + status */}
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="font-bold text-sm"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {order.table}
                              </span>
                              <span
                                className="text-xs"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {order.id}
                              </span>
                              <span
                                className="text-xs"
                                style={{ color: "var(--text-muted)" }}
                              >
                                · {order.guests} guests
                              </span>
                            </div>
                            <span
                              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                              style={{ backgroundColor: s.bg, color: s.color }}
                            >
                              {s.label}
                            </span>
                          </div>

                          {/* Row 2: items */}
                          <p
                            className="text-xs leading-relaxed mb-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {order.items.join(" · ")}
                          </p>

                          {/* Row 3: total + time */}
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-bold"
                              style={{ color: "var(--orange)" }}
                            >
                              {order.total}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {order.time}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Bottom action bar ── */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Today · 47 orders served</p>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--orange-light)",
                      color: "var(--orange)",
                    }}
                  >
                    ₹12,480 revenue
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
