import Link from "next/link";

const footerLinks = {
  Info: [
    { label: "Integrations", href: "#integrations" },
    { label: "Live demo",    href: "#live-demo" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Nomen Delivery", href: "/nomen" },
  ],
  "Orderlyy for": [
    { label: "Bars",           href: "#features" },
    { label: "Hotels",         href: "#features" },
    { label: "Festivals",      href: "#features" },
    { label: "Restaurants",    href: "#features" },
    { label: "Bowling alleys", href: "#features" },
    { label: "Foodcourts",     href: "#features" },
    { label: "All-you-can-eat",href: "#features" },
  ],
  Integrations: [
    { label: "Lightspeed", href: "#integrations" },
    { label: "unTill",     href: "#integrations" },
    { label: "Vectron",    href: "#integrations" },
    { label: "MplusKASSA", href: "#integrations" },
    { label: "Stripe",     href: "#integrations" },
    { label: "Adyen",      href: "#integrations" },
  ],
  Legal: [
    { label: "Privacy Policy",   href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  Company: [
    { label: "About us",      href: "#" },
    { label: "System status", href: "#" },
    { label: "Blog",          href: "#" },
    { label: "Contact",       href: "#" },
  ],
};

const paymentMethods = [
  "Visa","Mastercard","Maestro","Apple Pay","Google Pay","UPI","Razorpay","Paytm",
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-dark)", color: "var(--text-muted)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              {/* Logo mark */}
              <div style={{ width: 32, height: 32, flexShrink: 0 }}>
                <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="17" cy="17" r="16" fill="url(#footerLogoGrad)" />
                  <rect x="8"  y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                  <rect x="19" y="8"  width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                  <rect x="8"  y="19" width="7" height="7" rx="1.5" fill="white" opacity="0.95"/>
                  <rect x="14.5" y="14.5" width="5" height="5" rx="1" fill="white" opacity="0.7"/>
                  <rect x="9.5"  y="9.5"  width="4" height="4" rx="0.8" fill="#fbbf24"/>
                  <rect x="20.5" y="9.5"  width="4" height="4" rx="0.8" fill="#fbbf24"/>
                  <rect x="9.5"  y="20.5" width="4" height="4" rx="0.8" fill="#fbbf24"/>
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f97316"/>
                      <stop offset="1" stopColor="#dc2626"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="brand-wordmark text-lg" style={{ color: "#f0f0ff" }}>Orderlyy</span>
            </Link>
            <p className="text-sm mb-4 leading-relaxed">
              QR ordering for hospitality. Let guests order on their own and
              save on staff costs while increasing revenue.
            </p>
            <a
              href="tel:+31853030723"
              className="text-sm transition-colors"
              style={{ color: "var(--orange)" }}
            >
              +31 85 303 07 23
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "#f1f5f9" }}>
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-orange-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div
          className="pt-8 mb-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Accepted payment methods
          </p>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="rounded-lg px-3 py-1.5 text-xs"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm">
            Copyright © 2026 Orderlyy B.V. Made with 🎉 in Rotterdam &amp; Delft
          </p>

          <div className="flex items-center gap-4">
            {[
              {
                href: "https://www.instagram.com/Orderlyy.nl/",
                label: "Instagram",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
              },
              {
                href: "https://x.com/OrderlyyNL",
                label: "X",
                path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
              },
              {
                href: "https://www.linkedin.com/company/Orderlyy",
                label: "LinkedIn",
                path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
              },
            ].map(({ href, label, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-orange-400"
                aria-label={`Orderlyy on ${label}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
