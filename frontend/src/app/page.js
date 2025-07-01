import { HeroSection } from "@/components/HeroSection/HeroSection";
import { Navbar } from "@/components/navbar/Navbar";

export default async function Home() {

  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}
