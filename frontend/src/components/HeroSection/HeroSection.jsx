"use client"

import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"
import RightComponent from "./RightComponent"
import LeftSection from "./LeftSection"
import BackGround from "./BackGround"
import { useEffect, useState } from "react"
import HeroContentLoader from "./Hero_content_loader/ContentLoader"

const HeroSection = () => {
  const [width, setwidth] = useState(null)

  useEffect(() => {

    setwidth(window.innerWidth)
    const changeWidth = () => {
      setwidth(window.innerWidth)
    }
    window.addEventListener("resize", changeWidth)
    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  }, [])

  return (
    <>
      {!width && <HeroContentLoader />}
      {width && <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f2e9] to-white pt-[40px] ">
        <BackGround />

        {/* Main content */}
        <div className=" mx-auto px-6 py-16 relative z-10">
          <div className={`flex ${width > 900 ? " flex-row " : " flex-col "} max-w-[1500px] mx-auto ${width > 900 ? " gap-4 " : " gap-15 "} justify-between items-start `}>
            {/* Left Content - Now spans 7 columns for better proportions */}
            <LeftSection width={width} />

            {/* Right Content - Improved document preview - Now spans 5 columns */}
            <RightComponent width={width} />
          </div>
        </div>

      </div>}
    </>
  )
}

export default HeroSection
