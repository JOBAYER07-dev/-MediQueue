import CallToAction from "@/components/CallToAction";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategories";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <Testimonials />
      <CallToAction/>
    </div>
  );
}
