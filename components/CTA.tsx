"use client";

import { motion } from "framer-motion";

const orbs = [
  { color: "#f97316", size: 300, top: "10%",  left: "5%",  delay: 0   },
  { color: "#fbbf24", size: 360, top: "25%",  left: "27%", delay: 1.2 },
  { color: "#fb923c", size: 420, top: "40%",  left: "49%", delay: 2.4 },
  { color: "#f59e0b", size: 480, top: "55%",  left: "71%", delay: 3.6 },
];

export default function CTA() {
  return (
    <section
      id="get-started"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--orange) 0%, #f59e0b 100%)" }}
    >
      {/* Animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            backgroundColor: orb.color,
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            opacity: 0.18,
            filter: "blur(72px)",
          }}
          animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
          aria-hidden="true"
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Don&apos;t leave guests waiting.
        </motion.h2>

        <motion.p
          className="text-xl mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.85)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join hundreds of hospitality businesses already using Orderlyy to serve
          guests faster and increase revenue.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.a
            href="#"
            className="font-bold px-10 py-4 rounded-full text-lg"
            style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--orange)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
            whileHover={{ rotate: 2, scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            Get started with Orderlyy
          </motion.a>

          <motion.a
            href="#"
            className="font-bold px-10 py-4 rounded-full text-lg text-white"
            style={{ border: "2px solid rgba(255,255,255,0.5)" }}
            whileHover={{ rotate: -2, scale: 1.05, borderColor: "rgba(255,255,255,0.9)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            Schedule a demo
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 text-sm"
          style={{ color: "rgba(255,255,255,0.8)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {[
            { icon: "🔒", text: "No hidden costs"   },
            { icon: "📅", text: "Cancel monthly"    },
            { icon: "⚡", text: "Easy installation" },
            { icon: "🎯", text: "Free 14-day trial" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <motion.span
                style={{ display: "inline-block" }}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {icon}
              </motion.span>
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
