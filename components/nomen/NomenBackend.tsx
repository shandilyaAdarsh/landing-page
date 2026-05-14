"use client";

import { motion } from "framer-motion";

const arch = [
  { icon: "⚡", title: "Real-time Order Engine", desc: "WebSocket-powered dispatch with sub-100ms latency. Orders flow from customer → kitchen → rider instantly.", color: "#f97316", tech: ["WebSockets", "Redis", "Node.js"] },
  { icon: "🗺️", title: "Smart Routing", desc: "ML-based rider assignment using live traffic, distance, and load balancing across the delivery fleet.", color: "#7c3aed", tech: ["Python", "Maps API", "TensorFlow"] },
  { icon: "🔐", title: "Secure Payments", desc: "PCI-DSS compliant processing with UPI, Razorpay, and Stripe. Instant settlement to restaurants.", color: "#10b981", tech: ["Razorpay", "UPI", "Stripe"] },
  { icon: "📊", title: "Analytics Engine", desc: "Real-time restaurant analytics — revenue, popular items, peak hours, and customer retention.", color: "#3b82f6", tech: ["ClickHouse", "Grafana", "Next.js"] },
  { icon: "🚀", title: "Microservices", desc: "Independently scalable services: Auth, Orders, Delivery, Payments, Notifications — all containerised.", color: "#ec4899", tech: ["Docker", "Kubernetes", "gRPC"] },
  { icon: "🔔", title: "Notifications", desc: "Multi-channel alerts via FCM, SMS, and WhatsApp. Customers get live updates at every step.", color: "#f59e0b", tech: ["FCM", "Twilio", "WhatsApp API"] },
];

export default function NomenBackend() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#a78bfa" }}>Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Enterprise-grade backend
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            Built to scale from 100 to 1,000,000 orders without breaking a sweat.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {arch.map((card, i) => (
            <motion.div key={card.title}
              className="rounded-2xl p-5"
              style={{ backgroundColor: "rgba(255,255,255,0.03)", border: `1px solid ${card.color}22` }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, backgroundColor: `${card.color}08` }}>
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: `${card.color}18` }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                {card.icon}
              </motion.div>
              <h4 className="font-bold text-white text-sm mb-2">{card.title}</h4>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>{card.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {card.tech.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${card.color}18`, color: card.color }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <motion.a href="#" className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-full text-base"
            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", boxShadow: "0 8px 32px rgba(124,58,237,0.45)" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Start delivering with Nomen
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
