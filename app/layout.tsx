import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* ── Inter — clean body / UI text ── */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/*
 * Playwrite England SemiJoined is loaded via CSS @import in globals.css
 * because next/font/google doesn't export it under a stable name yet.
 * We expose it as a CSS variable --font-display for use in components.
 */

export const metadata: Metadata = {
  title: "Orderlyy — QR Ordering for Hospitality",
  description:
    "Let guests order on their own with Orderlyy's QR ordering system. Save on staff costs while increasing revenue. No app required. Works with your POS system.",
  keywords: [
    "QR ordering",
    "restaurant ordering system",
    "hospitality software",
    "table ordering",
    "digital menu",
    "bar ordering",
    "hotel ordering",
  ],
  openGraph: {
    title: "Orderlyy — QR Ordering for Hospitality",
    description:
      "Let guests order on their own with Orderlyy's QR ordering system. Save on staff costs while increasing revenue.",
    type: "website",
    locale: "en_US",
    siteName: "Orderlyy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orderlyy — QR Ordering for Hospitality",
    description:
      "Let guests order on their own with Orderlyy's QR ordering system. Save on staff costs while increasing revenue.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Playwrite England SemiJoined — display / brand font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playwrite+England+SemiJoined:wght@100;200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
