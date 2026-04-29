import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PointsCalculator } from "@/components/PointsCalculator";
import { TrustBadges } from "@/components/TrustBadges";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Marquee />
      <div className="max-w-5xl mx-auto">
        <Hero />
        <PointsCalculator />
        <TrustBadges />
        <Testimonials />
      </div>
      <Footer />
    </main>
  );
}
