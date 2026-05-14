"use client";

import { motion } from "framer-motion";

const features = [
  { icon: "🚫", title: "Zero commission", desc: "No per-order cuts. Pay a flat monthly fee and keep every rupee you earn.", tint: "#7c3aed" },
  { icon: "🛵", title: "Flexible delivery", desc: "Use your own riders, hire through Nomen, or tap our on-demand rider network.", tint: "#10b981" },
  { icon: "📱", title: "Branded app", desc: "White-label mobile app with your logo, colours, and menu. Customers see your brand.", tint: "#f97316" },
  { icon: "📊", title: "Real-time analytics", desc: "Track orders, revenue, popular items, and customer retention from one dashboard.", tint: "#3b82f6" },
  { icon: "🔗", title: "Orderlyy integration", desc: "Dine-in QR orders and delivery orders managed from one unified Orderlyy dashboard.", tint: "#ec4899" },
  { icon: "💬", title: "WhatsApp ordering", desc: "Customers can order directly via WhatsApp. No app download needed.", tint: "#f59e0b" },
];

export default function NomenFeatures() {
  return (
    <section id="nomen-features" className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#7c3aed" }}>Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Everything you need to deliver
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}>
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: `${f.tint}15` }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                {f.icon}
              </motion.div>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
