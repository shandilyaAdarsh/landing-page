"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────────────────── */
type Status = "new" | "preparing" | "ready" | "served";

interface Order {
  id: string;
  table: number;
  items: string[];
  total: number;
  status: Status;
  ts: number;
}

/* ── Static data ────────────────────────────────────────────────────────── */
const MENU = [
  { name: "Masala Chai",    price: 60  },
  { name: "Espresso",       price: 120 },
  { name: "Craft Beer",     price: 280 },
  { name: "Paneer Tikka",   price: 320 },
  { name: "Veg Burger",     price: 220 },
  { name: "Nachos",         price: 180 },
  { name: "Mango Lassi",    price: 140 },
  { name: "Gulab Jamun",    price: 90  },
  { name: "Cold Coffee",    price: 160 },
  { name: "Butter Naan",    price: 50  },
];

const STATUS_META: Record<Status, { label: string; color: string; bg: string; next: Status | null }> = {
  new:       { label: "New",       color: "#f97316", bg: "rgba(249,115,22,0.12)",  next: "preparing" },
  preparing: { label: "Preparing", color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  next: "ready"     },
  ready:     { label: "Ready",     color: "#10b981", bg: "rgba(16,185,129,0.12)",  next: "served"    },
  served:    { label: "Served",    color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  next: null        },
};

const TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function uid() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function randomOrder(): Order {
  const count = Math.floor(Math.random() * 3) + 1;
  const picked = [...MENU].sort(() => Math.random() - 0.5).slice(0, count);
  return {
    id: uid(),
    table: TABLES[Math.floor(Math.random() * TABLES.length)],
    items: picked.map((i) => i.name),
    total: picked.reduce((s, i) => s + i.price, 0),
    status: "new",
    ts: Date.now(),
  };
}

/* ── Animated counter ───────────────────────────────────────────────────── */
function Counter({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const steps = 20;
    let step = 0;
    const id = setInterval(() => {
      step++;
      setDisplay(Math.round(display + (diff * step) / steps));
      if (step >= steps) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-IN")}
    </span>
  );
}

/* ── Table heatmap cell ─────────────────────────────────────────────────── */
function TableCell({ num, active }: { num: number; active: boolean }) {
  return (
    <motion.div
      className="rounded-xl flex flex-col items-center justify-center aspect-square text-xs font-bold select-none"
      style={{
        backgroundColor: active ? "var(--orange)" : "var(--bg-subtle)",
        color: active ? "#fff" : "var(--text-muted)",
        border: `1.5px solid ${active ? "var(--orange)" : "var(--border)"}`,
      }}
      animate={{ scale: active ? [1, 1.12, 1] : 1 }}
      transition={{ duration: 0.4 }}
    >
      <span className="text-lg">{active ? "🍽️" : "🪑"}</span>
      <span>{num}</span>
    </motion.div>
  );
}

/* ── Main section ───────────────────────────────────────────────────────── */
export default function LiveDemo() {
  const [orders, setOrders] = useState<Order[]>(() =>
    Array.from({ length: 4 }, randomOrder).map((o, i) => ({
      ...o,
      status: (["new", "preparing", "ready", "served"] as Status[])[i % 4],
    }))
  );
  const [revenue, setRevenue] = useState(12480);
  const [ordersServed, setOrdersServed] = useState(47);
  const [avgTime, setAvgTime] = useState(4);
  const [running, setRunning] = useState(true);

  /* Advance a random order's status */
  const tick = useCallback(() => {
    setOrders((prev) => {
      const active = prev.filter((o) => o.status !== "served");
      if (active.length === 0) return prev;
      const idx = Math.floor(Math.random() * active.length);
      const target = active[idx];
      const next = STATUS_META[target.status].next;
      if (!next) return prev;
      const updated = prev.map((o) =>
        o.id === target.id ? { ...o, status: next } : o
      );
      if (next === "served") {
        setRevenue((r) => r + target.total);
        setOrdersServed((n) => n + 1);
        setAvgTime((t) => Math.max(2, t + (Math.random() > 0.5 ? -0.2 : 0.1)));
      }
      return updated;
    });
  }, []);

  /* Inject a new order every ~5 s */
  const inject = useCallback(() => {
    setOrders((prev) => {
      const live = prev.filter((o) => o.status !== "served");
      if (live.length >= 8) return prev; // cap
      return [randomOrder(), ...prev].slice(0, 12);
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    const t1 = setInterval(tick,   1800);
    const t2 = setInterval(inject, 5000);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [running, tick, inject]);

  const activeTables = [...new Set(
    orders.filter((o) => o.status !== "served").map((o) => o.table)
  )];

  const live = orders.filter((o) => o.status !== "served").slice(0, 6);

  return (
    <section
      id="live-demo"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--orange)", opacity: 0.06 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: "#8b5cf6", opacity: 0.06 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ backgroundColor: "var(--orange-light)", color: "var(--orange)" }}>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live simulation — updates every 2 seconds
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Watch Orderlyy work in real time
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            This is exactly what your staff sees. Orders flow in, get prepared,
            and are served — all without a single phone call to the kitchen.
          </p>
        </motion.div>

        {/* ── Dashboard grid ── */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* ── Left: KPI cards ── */}
          <div className="flex flex-col gap-4">

            {/* Revenue */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--text-muted)" }}>Today&apos;s Revenue</p>
              <p className="text-3xl font-extrabold" style={{ color: "var(--orange)", letterSpacing: "-0.03em" }}>
                <Counter value={revenue} prefix="₹" />
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>↑ 23% vs yesterday</p>
            </motion.div>

            {/* Orders served */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--text-muted)" }}>Orders Served</p>
              <p className="text-3xl font-extrabold" style={{ color: "#10b981", letterSpacing: "-0.03em" }}>
                <Counter value={ordersServed} />
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Since 11:00 AM</p>
            </motion.div>

            {/* Avg time */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                style={{ color: "var(--text-muted)" }}>Avg. Order Time</p>
              <p className="text-3xl font-extrabold" style={{ color: "#3b82f6", letterSpacing: "-0.03em" }}>
                {avgTime.toFixed(1)}
                <span className="text-base font-medium ml-1" style={{ color: "var(--text-muted)" }}>min</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>↓ 40% faster than manual</p>
            </motion.div>

            {/* Table heatmap */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}>
                Table Status
                <span className="ml-2 font-normal normal-case" style={{ color: "var(--orange)" }}>
                  {activeTables.length} active
                </span>
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TABLES.map((n) => (
                  <TableCell key={n} num={n} active={activeTables.includes(n)} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Centre + Right: Live order feed ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Feed header */}
            <motion.div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                    Live Order Feed
                  </p>
                </div>
                <button
                  onClick={() => setRunning((r) => !r)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: running ? "rgba(16,185,129,0.12)" : "rgba(249,115,22,0.12)",
                    color: running ? "#10b981" : "var(--orange)",
                    border: `1px solid ${running ? "rgba(16,185,129,0.3)" : "rgba(249,115,22,0.3)"}`,
                  }}
                >
                  {running ? "⏸ Pause" : "▶ Resume"}
                </button>
              </div>

              {/* Status legend */}
              <div className="flex flex-wrap gap-3 mb-4">
                {(Object.entries(STATUS_META) as [Status, typeof STATUS_META[Status]][]).map(([key, meta]) => (
                  <div key={key} className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: meta.color }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                    {meta.label}
                  </div>
                ))}
              </div>

              {/* Order cards */}
              <div className="space-y-2.5 max-h-[420px] overflow-y-auto scrollbar-hide">
                <AnimatePresence initial={false}>
                  {live.map((order) => {
                    const meta = STATUS_META[order.status];
                    return (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, y: -16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 40, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{
                          backgroundColor: meta.bg,
                          border: `1px solid ${meta.color}30`,
                        }}
                      >
                        {/* Table badge */}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: meta.color, color: "#fff" }}
                        >
                          T{order.table}
                        </div>

                        {/* Items */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                            {order.items.join(", ")}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            #{order.id} · ₹{order.total}
                          </p>
                        </div>

                        {/* Status pill */}
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.color}40` }}
                        >
                          {meta.label}
                        </span>

                        {/* Progress dots */}
                        <div className="flex gap-1 flex-shrink-0">
                          {(["new", "preparing", "ready", "served"] as Status[]).map((s) => {
                            const steps = ["new", "preparing", "ready", "served"];
                            const done = steps.indexOf(order.status) >= steps.indexOf(s);
                            return (
                              <motion.div
                                key={s}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: done ? meta.color : "var(--border)" }}
                                animate={done && s === order.status ? { scale: [1, 1.5, 1] } : {}}
                                transition={{ duration: 0.6, repeat: Infinity }}
                              />
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {live.length === 0 && (
                  <div className="text-center py-8" style={{ color: "var(--text-muted)" }}>
                    <p className="text-2xl mb-2">🎉</p>
                    <p className="text-sm">All orders served! New ones coming in…</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Bottom row: mini stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Scan-to-order", value: "8 sec", sub: "avg guest time", color: "var(--orange)" },
                { label: "Error rate",    value: "0.3%",  sub: "vs 12% manual",  color: "#10b981"       },
                { label: "Upsell rate",   value: "+34%",  sub: "avg basket size", color: "#8b5cf6"      },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ backgroundColor: "var(--bg-card)", border: "1.5px solid var(--border)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  whileHover={{ y: -3 }}
                >
                  <p className="text-xl font-extrabold" style={{ color: stat.color, letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--text-primary)" }}>
                    {stat.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            This is a live simulation. Your real dashboard looks exactly like this.
          </p>
          <motion.a
            href="#get-started"
            className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-sm"
            style={{ backgroundColor: "var(--orange)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Set up your dashboard in 5 minutes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
