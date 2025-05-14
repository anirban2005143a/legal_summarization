"use client"

import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"
import RightComponent from "./RightComponent"
import LeftSection from "./LeftSection"
import BackGround from "./BackGround"

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f2e9] to-white">
      <BackGround />

      {/* Main content */}
      <div className=" mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="flex md:flex-row flex-col max-w-[1500px] mx-auto md:gap-4 gap-10 justify-between items-start ">
          {/* Left Content - Now spans 7 columns for better proportions */}
          <LeftSection />

          {/* Right Content - Improved document preview - Now spans 5 columns */}
          <RightComponent />
        </div>
      </div>

    </div>
  )
}

export default HeroSection
