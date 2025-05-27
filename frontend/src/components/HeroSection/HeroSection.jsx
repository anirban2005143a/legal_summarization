"use client"

import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"
import RightComponent from "./RightComponent"
import LeftSection from "./LeftSection"
import { useEffect, useState } from "react"
import HeroContentLoader from "./Hero_content_loader/ContentLoader"
import BackGround from "./BackGround"

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

  if(!width) return null

  return (
    <>
      {/* {!width && <HeroContentLoader />} */}
      {width && <div className="relative overflow-hidden  pt-[90px]  xl:pt-[120px] ">
        <BackGround />

        {/* Main content */}
        <div className=" mx-auto sm:px-6 px-3  relative z-10">
          <div className={`flex ${width > 900 ? " flex-row " : " flex-col "} max-w-[1500px] mx-auto ${width > 900 ? " gap-4 " : " gap-15 "} justify-between items-start `}>
            {/* Left Content  */}
            <LeftSection width={width} />

            {/* Right Content */}
            <RightComponent width={width} />
          </div>
        </div>

      </div>}
    </>
  )
}

export default HeroSection
