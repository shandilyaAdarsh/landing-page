"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Faster service",  value: "2×",   desc: "average order speed",  tint: "#f97316" },
  { label: "Higher revenue",  value: "+30%",  desc: "average order value",  tint: "#8b5cf6" },
  { label: "Fewer errors",    value: "99%",   desc: "order accuracy",       tint: "#10b981" },
  { label: "Happier guests",  value: "4.8★",  desc: "average rating",       tint: "#3b82f6" },
];

export default function PersonalContact() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image side */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]"
              style={{ background: "linear-gradient(135deg, var(--orange-light), var(--bg-subtle))" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  {/* Chef emoji — scale + hover rotate */}
                  <motion.div
                    className="text-8xl mb-4 inline-block"

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    👨‍🍳
                  </motion.div>

                  <motion.div
                    className="rounded-2xl p-4 max-w-xs mx-auto"
                    style={{ backgroundColor: "var(--bg-card)", boxShadow: "var(--shadow-md)" }}                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ backgroundColor: "var(--orange-light)" }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                        😊
                      </motion.div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Staff has more time</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>for personal service</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-green-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-green-600">+30%</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Revenue</p>
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-lg p-2 text-center">
                        <p className="text-lg font-bold text-blue-600">-40%</p>
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Wait time</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating review */}
            <motion.div
              className="absolute -bottom-6 -right-4 rounded-2xl p-4 max-w-[200px]"
              style={{ backgroundColor: "var(--bg-card)", boxShadow: "var(--shadow-lg)" }}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 260 }}
              whileHover={{ scale: 1.06, rotate: 2 }}
            >
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <motion.svg
                    key={s}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: s * 0.05 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-xs italic" style={{ color: "var(--text-secondary)" }}>
                &ldquo;Lightning fast service and you don&apos;t have to worry about getting a bartender to notice you!&rdquo;
              </p>
              <p className="text-xs font-semibold mt-2" style={{ color: "var(--text-primary)" }}>— André S.</p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" style={{ color: "var(--text-primary)" }}>
              Maintain personal contact.
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Orderlyy <strong style={{ color: "var(--text-primary)" }}>supplements your staff — not replaces them.</strong> By taking orders through Orderlyy, your staff has more time for a nice chat with guests and guests are served faster.
            </p>
            <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Your team can focus on what they do best: creating memorable experiences. Let the technology handle the order-taking.
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: "var(--bg-subtle)" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 260 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.p
                    className="text-2xl font-extrabold"
                    style={{ color: stat.tint }}

        param($m)
        # Reduce to 20 spaces max (5 levels of 4-space indent)
        $spaces = $m.Groups[1].Value
        $trimmed = $spaces.Substring([Math]::Max(0, $spaces.Length - 4))
        "$trimmed$($m.Groups[2].Value)"
    ={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{stat.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#get-started"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-full transition-colors"
              style={{ backgroundColor: "var(--orange)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get started today
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
