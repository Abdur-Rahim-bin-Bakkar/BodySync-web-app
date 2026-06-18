import FeaturedClasses from "@/components/Home/FaturedClass";
import Banner from "@/components/sheare/Banner";
import FAQSection from "@/components/sheare/FAQSection";
import WhyChooseGym from "@/components/sheare/WhyChooseGym";
// import FAQSection from "@/components/sheare/FAQSection";
import Image from "next/image";
// import WhyChooseGym from "../components/sheare/WhyChooseGym";
// import FaturedClass from "@/components/Home/FaturedClass";

export default function Home() {
  return (
    <div>
      <Banner />
      <FeaturedClasses />
      <WhyChooseGym />
      <FAQSection />
    </div>
  );
}
