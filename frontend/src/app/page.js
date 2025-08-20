import {
  HeroSection,
  HomePageBackGround,
} from "@/components/HeroSection/HeroSection";
import { Features } from "@/components/HomePageFeatures.jsx/HomePageFeatures";
import { Navbar } from "@/components/navbar/Navbar";

export default async function Home() {
  return (
    <div >
      {/* <HomePageBackGround /> */}
      <div className=" fixed top-0 left-0 w-full h-[100dvh] bg-gradient-to-br from-gray-50/50 to-[#83530033] -z-1"/>
      <Navbar />
      <HeroSection />
      <Features />
    </div>
  );
}
