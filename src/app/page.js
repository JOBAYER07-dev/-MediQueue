import CallToAction from "@/components/CallToAction";
import FeaturedTutors from "@/components/FeaturedTutors";
import HowItWorks from "@/components/HowItWorks";
import PopularCategories from "@/components/PopularCategories";
import Testimonials from "@/components/Testimonials";
import BannerSection from "@/components/BannerSection";

export default function Home() {
  return (
    <div>
      <BannerSection/>
      <FeaturedTutors/>
      <HowItWorks />
      <PopularCategories />
      <Testimonials />
      <CallToAction/>
    </div>
  );
}
