"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HoverDiv, RandomColorDiv, useColorStore } from "@/lib/motionHOC";

/* ── Theme types ─────────────────────────────────────────────────────────── */
type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");
  if (theme === "light")  root.classList.add("theme-light");
  if (theme === "dark")   root.classList.add("theme-dark");
  // "system" → no class, CSS @media handles it
  try { localStorage.setItem("Orderlyy-theme", theme); } catch {}
}

function getStoredTheme(): Theme {
  try {
    const t = localStorage.getItem("Orderlyy-theme") as Theme | null;
    if (t === "light" || t === "dark" || t === "system") return t;
  } catch {}
  return "system";
}

/* ── Theme icon ──────────────────────────────────────────────────────────── */
function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "light") return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  );
  if (theme === "dark") return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
    </svg>
  );
}

/* ── Theme picker dropdown ───────────────────────────────────────────────── */
function ThemePicker() {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    setOpen(false);
  };

  const options: { value: Theme; label: string }[] = [
    { value: "light",  label: "Light"  },
    { value: "dark",   label: "Dark"   },
    { value: "system", label: "System" },
  ];

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
        style={{
          color: "var(--text-secondary)",
          backgroundColor: open ? "var(--bg-subtle)" : "transparent",
          border: "1px solid var(--border)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Change theme"
        aria-expanded={open}
      >
        <ThemeIcon theme={theme} />
        <span className="hidden lg:inline capitalize">{theme}</span>
        <svg
          className="w-3 h-3 opacity-50"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-2 rounded-2xl overflow-hidden z-50"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
              minWidth: 140,
            }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => choose(opt.value)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left"
                style={{
                  color: theme === opt.value ? "var(--orange)" : "var(--text-secondary)",
                  backgroundColor: theme === opt.value ? "var(--orange-light)" : "transparent",
                }}
              >
                <ThemeIcon theme={opt.value} />
                {opt.label}
                {theme === opt.value && (
                  <svg className="w-3.5 h-3.5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { background } = useColorStore();

  useEffect(() => {
    const onScroll = () => {
      // Hero is min-h-screen — appear once user scrolls past ~80% of viewport height
      setScrolled(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount so SSR→client is consistent
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features",     href: "#features"     },
    { label: "Integrations", href: "#integrations" },
    { label: "Live demo",    href: "#live-demo"     },
    { label: "Nomen 🛵",     href: "/nomen"         },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      /* Invisible + no blur at hero, full glass when scrolled past */
      animate={{
        opacity: scrolled ? 1 : 0,
        y:       scrolled ? 0 : -8,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: "var(--nav-bg)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
        pointerEvents: scrolled ? "auto" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo — modern Orderlyy wordmark ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            {/* Icon mark: stylised "O" with QR dot pattern */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              style={{ width: 34, height: 34 }}
            >
              <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Outer ring */}
                <circle cx="17" cy="17" r="16" fill="url(#logoGrad)" />
                {/* QR-style inner pattern */}
                <rect x="8"  y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                <rect x="19" y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                <rect x="8"  y="19" width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                {/* Center dot */}
                <rect x="14.5" y="14.5" width="5" height="5" rx="1" fill="white" opacity="0.7"/>
                {/* Corner dots */}
                <rect x="9.5"  y="9.5"  width="4" height="4" rx="0.8" fill="url(#logoGrad2)"/>
                <rect x="20.5" y="9.5"  width="4" height="4" rx="0.8" fill="url(#logoGrad2)"/>
                <rect x="9.5"  y="20.5" width="4" height="4" rx="0.8" fill="url(#logoGrad2)"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f97316"/>
                    <stop offset="1" stopColor="#dc2626"/>
                  </linearGradient>
                  <linearGradient id="logoGrad2" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24"/>
                    <stop offset="1" stopColor="#f97316"/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Wordmark */}
            <span
              className="brand-wordmark text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              Orderlyy
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <HoverDiv key={label} style={{ display: "inline-block" }}>
                <Link
                  href={href}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </Link>
              </HoverDiv>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme picker */}
            <ThemePicker />

            {/* Accent color — click to randomise */}
            <RandomColorDiv
              className="text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
              style={{ backgroundColor: background }}
              title="Click to randomise accent colour"
            >
              <Link href="#get-started" className="text-white text-sm font-semibold whitespace-nowrap">
                Get started
              </Link>
            </RandomColorDiv>
          </div>

          {/* ── Mobile: theme + hamburger ── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemePicker />
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }} transition={{ duration: 0.22 }}>
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden px-4 pb-4 pt-2 space-y-1"
            style={{
              backgroundColor: "var(--nav-bg)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid var(--nav-border)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2">
              <RandomColorDiv
                className="block text-white text-sm font-semibold px-5 py-3 rounded-full text-center"
                style={{ backgroundColor: background }}
              >
                <Link
                  href="#get-started"
                  className="text-white text-sm font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </RandomColorDiv>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
