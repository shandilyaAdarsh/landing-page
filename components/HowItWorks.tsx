"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>
    ),
    step: "01", title: "Scan",
    description: "Guests scan the QR code on the table with their phone camera. No app download needed — it opens instantly in the browser.",
    tint: "#f97316", bgVar: "var(--orange-light)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    step: "02", title: "Order",
    description: "They go directly to your digital menu and choose what they want. Upsell suggestions and happy hour pricing happen automatically.",
    tint: "#3b82f6", bgVar: "rgba(59,130,246,0.1)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    step: "03", title: "Done",
    description: "The order goes directly to your staff and POS system. Your team serves it as they normally would — faster and with fewer errors.",
    tint: "#10b981", bgVar: "rgba(16,185,129,0.1)",
  },
];

const QR_PATTERN = [1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: "var(--orange)" }}>
            No app.
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "var(--text-primary)" }}>
            Experience how simple it is
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Three steps. That&apos;s all it takes for your guests to place an order — no friction, no downloads, no waiting.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.15 }}
            >
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 z-0"
                  style={{ backgroundColor: "var(--border)" }}
                  aria-hidden="true"
                />
              )}
              <div className="relative z-10">
                <motion.div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: step.bgVar, color: step.tint }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90, scale: 1.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {step.icon}
                </motion.div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
                  Step {step.step}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p style={{ color: "var(--text-secondary)" }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo CTA */}
        <motion.div
          className="rounded-3xl p-8 lg:p-12 text-center border"
          style={{
            background: "linear-gradient(135deg, var(--orange-light), var(--bg-subtle))",
            borderColor: "var(--border)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Try it yourself</h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            Scan the QR code below or click the button to experience Orderlyy as a guest would.
          </p>

          <motion.div
            className="inline-block p-4 rounded-2xl mb-6 cursor-pointer"
            style={{ backgroundColor: "var(--bg-card)", boxShadow: "var(--shadow-md)" }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90, scale: 1.6 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            aria-label="Demo QR code — hover to spin"
          >
            <div className="w-20 h-20 grid grid-cols-7 gap-0.5">
              {QR_PATTERN.map((cell, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ backgroundColor: cell ? "var(--text-primary)" : "var(--bg-card)" }}
                />
              ))}
            </div>
          </motion.div>

          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Hover the QR code ↑</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              className="text-white font-semibold px-8 py-3 rounded-full transition-colors"
              style={{ backgroundColor: "var(--orange)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Try the demo
            </motion.a>
            <motion.a
              href="#get-started"
              className="font-semibold px-8 py-3 rounded-full transition-colors"
              style={{
                border: "2px solid var(--border)",
                color: "var(--text-primary)",
                backgroundColor: "transparent",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Start demo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
