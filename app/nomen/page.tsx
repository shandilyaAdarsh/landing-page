import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import NomenHero from "@/components/nomen/NomenHero";
import NomenFeatures from "@/components/nomen/NomenFeatures";
import NomenHowItWorks from "@/components/nomen/NomenHowItWorks";
import NomenBackend from "@/components/nomen/NomenBackend";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nomen — Delivery Platform by Orderlyy",
  description:
    "Nomen is Orderlyy's zero-commission delivery platform for Indian restaurants. Own your delivery, own your data.",
  openGraph: {
    title: "Nomen — Delivery Platform by Orderlyy",
    description: "Zero-commission delivery for Indian restaurants.",
    type: "website",
  },
};

export default function NomenPage() {
  return (
    <>
      <Navbar />
      <main>
        <NomenHero />
        <NomenHowItWorks />
        <NomenFeatures />
        <NomenBackend />
      </main>
      <Footer />
    </>
  );
}
