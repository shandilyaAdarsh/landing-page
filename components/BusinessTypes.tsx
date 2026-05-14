"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const businessTypes = [
  {
    id: "bars",       label: "Bars",        emoji: "🍺", tint: "#f59e0b",
    features: ["Advanced upsell features","Happy hour integration","Pay later (with tip)","Overview for large drink menus"],
    description: "Perfect for busy bars where guests don't want to wait at the counter. Increase your average order value with smart upsell suggestions.",
  },
  {
    id: "restaurants",label: "Restaurants", emoji: "🍽️", tint: "#ef4444",
    features: ["Course-based ordering","Allergen information","Split bill support","Kitchen display integration"],
    description: "Give your restaurant guests a seamless ordering experience while your staff focuses on delivering exceptional hospitality.",
  },
  {
    id: "hotels",     label: "Hotels",      emoji: "🏨", tint: "#3b82f6",
    features: ["Room service ordering","Pool & terrace ordering","Multi-location support","Guest room billing"],
    description: "From the lobby bar to room service, Orderlyy works across all hotel touchpoints to delight your guests.",
  },
  {
    id: "festivals",  label: "Festivals",   emoji: "🎪", tint: "#8b5cf6",
    features: ["High-volume handling","Multiple vendor support","Cashless payments","Real-time stock updates"],
    description: "Handle thousands of orders simultaneously. Reduce queues and keep festival-goers happy with instant mobile ordering.",
  },
  {
    id: "bowling",    label: "Bowling",     emoji: "🎳", tint: "#10b981",
    features: ["Lane-based ordering","Food & drinks together","Tab management","Group ordering"],
    description: "Let bowlers order food and drinks without leaving their lane. More fun, more orders, happier guests.",
  },
  {
    id: "foodcourts", label: "Foodcourts",  emoji: "🏪", tint: "#f97316",
    features: ["Multi-vendor ordering","Single checkout","Pickup notifications","Vendor dashboard"],
    description: "One QR code, multiple vendors. Guests order from different stalls in one go and get notified when their food is ready.",
  },
];

export default function BusinessTypes() {
  const [active, setActive] = useState("bars");
  const current = businessTypes.find((b) => b.id === active)!;

  return (
    <section
      id="features"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-semibold text-sm uppercase tracking-widest mb-3" style={{ color: "var(--orange)" }}>
            Why Orderlyy?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "var(--text-primary)" }}>
            Suitable for any type of hospitality business
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Whether you run a cozy café or a large festival, Orderlyy adapts to your needs.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Business types">
          {businessTypes.map((type) => (
            <motion.button
              key={type.id}
              role="tab"
              aria-selected={active === type.id}
              aria-controls={`panel-${type.id}`}
              onClick={() => setActive(type.id)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors border"
              style={
                active === type.id
                  ? { backgroundColor: "var(--orange)", color: "#fff", borderColor: "var(--orange)" }
                  : { backgroundColor: "var(--bg-card)", color: "var(--text-secondary)", borderColor: "var(--border)" }
              }
            >
              <motion.span
                animate={active === type.id ? { scale: 1.5 } : { scale: 1 }}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                style={{ display: "inline-block" }}
              >
                {type.emoji}
              </motion.span>
              {type.label}
            </motion.button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            id={`panel-${current.id}`}
            role="tabpanel"
            className="rounded-3xl p-8 lg:p-12 border"
            style={{
              backgroundColor: `${current.tint}10`,
              borderColor: `${current.tint}30`,
            }}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <motion.div
                  className="text-5xl mb-4 inline-block"

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90, scale: 1.7 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {current.emoji}
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                  Orderlyy for {current.label}
                </h3>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {current.description}
                </p>
                <motion.a
                  href="#get-started"
                  className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  style={{ backgroundColor: "var(--orange)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Get started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}
                initial="hidden"
                animate="show"
              >
                {current.features.map((feature) => (
                  <motion.div
                    key={feature}
                    variants={{ hidden: { opacity: 0, scale: 0.9, y: 10 }, show: { opacity: 1, scale: 1, y: 0 } }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="rounded-2xl p-5 flex items-start gap-3"
                    style={{
                      backgroundColor: "var(--bg-card)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                    whileHover={{ scale: 1.04, y: -2 }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "var(--orange-light)" }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--orange)" }}>
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
