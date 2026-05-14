"use client";

import { motion } from "framer-motion";

const steps = [
  { icon: "🍽️", step: "01", title: "Restaurant lists menu", desc: "Add your menu, set delivery zones, and configure your pricing in under 10 minutes.", color: "#7c3aed" },
  { icon: "📱", step: "02", title: "Customer orders online", desc: "Customers browse your branded menu, add items, and pay via UPI, card, or COD.", color: "#4f46e5" },
  { icon: "🛵", step: "03", title: "Rider picks up order", desc: "Your own rider or our network picks up the order. Real-time GPS tracking for everyone.", color: "#10b981" },
  { icon: "🎉", step: "04", title: "Delivered & reviewed", desc: "Customer receives order, leaves a review. You keep 100% of the revenue.", color: "#f97316" },
];

export default function NomenHowItWorks() {
  return (
    <section id="nomen-how" className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            From order to doorstep in 4 steps
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Nomen handles the entire delivery flow so you can focus on cooking great food.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div key={s.title} className="relative text-center"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}>
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{ backgroundColor: `${s.color}15` }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {s.icon}
              </motion.div>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Step {s.step}</div>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
