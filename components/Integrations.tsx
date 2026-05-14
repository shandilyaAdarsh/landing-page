"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "Lightspeed",  category: "POS",      tint: "#ef4444" },
  { name: "Vectron",     category: "POS",      tint: "#3b82f6" },
  { name: "unTill",      category: "POS",      tint: "#8b5cf6" },
  { name: "MplusKASSA",  category: "POS",      tint: "#10b981" },
  { name: "Stripe",      category: "Payments", tint: "#6366f1" },
  { name: "Adyen",       category: "Payments", tint: "#14b8a6" },
  { name: "Rootline",    category: "Payments", tint: "#f97316" },
  { name: "Mollie",      category: "Payments", tint: "#ec4899" },
];

const features = [
  { icon: "🔗", title: "Direct POS integration",   desc: "Orders flow straight into your existing register system." },
  { icon: "💳", title: "Multiple payment methods", desc: "Visa, Mastercard, Apple Pay, Google Pay, iDEAL, and more." },
  { icon: "⚡", title: "Real-time sync",            desc: "Menu changes and stock updates reflect instantly for guests." },
];

export default function Integrations() {
  return (
    <section id="integrations" className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "var(--text-primary)" }}>
              Works seamlessly with your POS system and other systems.
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Through our POS integration, orders are placed directly in the register. So staff can serve the order as they&apos;re used to — no new workflows, no retraining.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  {/* Icon — scale + hover rotate */}
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: "var(--orange-light)" }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              whileHover={{ x: 4 }}
            >
              View all integrations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Integration grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {integrations.map((integration, i) => (
                <motion.div
                  key={integration.name}
                  className="rounded-2xl p-4 text-center border"
                  style={{ backgroundColor: `${integration.tint}15`, borderColor: `${integration.tint}30` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 260 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                >
                  {/* Logo box — scale + hover rotate */}
                  <motion.div
                    className="w-10 h-10 rounded-xl shadow-sm flex items-center justify-center mx-auto mb-2"
                    style={{ backgroundColor: "var(--bg-card)" }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                      {integration.name.slice(0, 2)}
                    </span>
                  </motion.div>
                  <p className="text-xs font-bold" style={{ color: integration.tint }}>{integration.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{integration.category}</p>
                </motion.div>
              ))}
            </div>

            {/* Payment methods */}
            <motion.div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              whileHover={{ scale: 1.01 }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
                Accepted payment methods
              </p>
              <div className="flex flex-wrap gap-2">
                {["Visa","Mastercard","Maestro","Apple Pay","Google Pay","UPI","Razorpay","Paytm"].map((method, i) => (
                  <motion.div
                    key={method}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold border"
                    style={{
                      backgroundColor: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.1, backgroundColor: "var(--orange-light)", color: "var(--orange)" }}
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
