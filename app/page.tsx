import { Hero } from "@/components/Hero";
import { PointsCalculator } from "@/components/PointsCalculator";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-5xl mx-auto">
        <Hero />
        <PointsCalculator />
      </div>
      <Footer />
    </main>
  );
}
