import Banner from "@/components/sheare/Banner";
import FAQSection from "@/components/sheare/FAQSection";
import Image from "next/image";
import WhyChooseGym from "../components/sheare/WhyChooseGym";
import FaturedClass from "@/components/Home/FaturedClass";

export default function Home() {
  return (
    <div>
      <Banner />
      <FaturedClass />
      <WhyChooseGym />
      <FAQSection />
    </div>
  );
}
