import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import HowItWorks from "@/components/HowItWorks";
import ScrollRotatePhone from "@/components/ScrollRotatePhone";
import BusinessTypes from "@/components/BusinessTypes";
import PersonalContact from "@/components/PersonalContact";
import Integrations from "@/components/Integrations";
import OrderManagement from "@/components/OrderManagement";
import Testimonials from "@/components/Testimonials";
import LiveDemo from "@/components/LiveDemo";
import NomenSection from "@/components/NomenSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <HowItWorks />
        <ScrollRotatePhone />
        <BusinessTypes />
        <PersonalContact />
        <Integrations />
        <OrderManagement />
        <Testimonials />
        <LiveDemo />
        <NomenSection />
      </main>
      <Footer />
    </>
  );
}
