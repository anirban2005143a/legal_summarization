"use client"

import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { HeroContentLoader } from "./ContentLoader"

export const HeroSection = () => {
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

const RightComponent = ({width}) => {
    return (
        <div className={`${width > 900 ?" w-[35%] min-w-[340px] max-w-[500px]":"" } xl:w-[40%] xl:max-w-[580px] `}>
            <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                {/* Document header */}
                <div className="user-select-none relative py-3 bg-gradient-to-r from-[#6b4102] to-[#9e4f00] flex items-center px-4">
                    <div className=" absolute left-0 top-1/2 -translate-y-1/2 md:ps-2.5 ps-2 flex space-x-1">
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                    </div>
                    <div className="mx-auto text-white text-sm xl:text-xl font-medium flex items-center">
                        <Scale className="h-4 w-4 mr-2" />
                        Supreme Court of India
                    </div>
                </div>

                {/* Document content */}
                <div className=" p-3 xl:py-5 xl:pb-12 pb-10 ">
                    {/* Document title */}
                    <div className=" pb-2 border-b border-gray-500">
                        <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="px-2 py-1 w-fit bg-[#7b511123] rounded text-xs xl:text-sm text-[#7b5811] font-medium">
                                Civil Appeal No. 3456 of 2023
                            </div>
                            <div className="text-xs xl:text-base text-gray-500">Filed on: 12 Mar 2023</div>
                        </div>
                        <h3 className="text-base xl:text-xl font-bold text-gray-900">Sharma vs. State of Maharashtra</h3>
                        <p className="text-xs xl:text-base text-gray-500 mt-1">Right to Privacy - Constitutional Bench</p>
                    </div>

                    {/* Document text with highlights */}
                    <div className="user-select-none my-2 xl:mt-6 text-gray-700">
                        <div className="flex items-center space-x-2 text-[10px] xl:text-sm text-gray-500 mb-2">
                            <FileText className="h-4 w-4 " />
                            <span  >JUDGMENT EXCERPT</span>
                        </div>

                        <p className="leading-relaxed text-xs xl:text-base">
                            The Constitution of India guarantees to all its citizens the right to equality before law and equal
                            protection of laws...
                        </p>

                        <div className="p-3 text-xs xl:text-base bg-[#f8f2e9] rounded border-l-3 border-[#7b5b11] my-4">
                            <p className="italic text-gray-700 leading-relaxed">
                                "The right to privacy is protected as an intrinsic part of the right to life and personal liberty
                                under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution."
                            </p>
                            <div className="text-xs xl:text-base text-gray-500 mt-2">— Chief Justice, Paragraph 24</div>
                        </div>

                        <p className="leading-relaxed text-xs xl:text-base mb-2 xl:mb-4">
                            This Court has consistently held that <span className="bg-orange-100 px-1">Article 21</span>{" "}
                            encompasses within its ambit the right to live with human dignity...
                        </p>

                        {/* Key points section */}
                        <div className=" pt-4 border-t border-gray-400">
                            <h4 className="font-medium text-gray-900 mb-2 text-xs xl:text-base flex items-center">
                                <CheckCircle className="h-4 w-4 text-[#7b4f11] mr-2" />
                                Key Points
                            </h4>
                            <ul className="space-y-2 text-xs xl:text-base">
                                <li className="flex items-center">
                                    <div className="h-5 w-5 rounded-full bg-[#7b51111e] flex items-center justify-center text-[#7b4911] text-xs xl:text-base mr-2 mt-0.5">
                                        1
                                    </div>
                                    <span className="text-gray-700">Privacy is a fundamental right under Article 21</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="h-5 w-5 rounded-full bg-[#7b51111c] flex items-center justify-center text-[#7b5611] text-xs xl:text-base mr-2 mt-0.5">
                                        2
                                    </div>
                                    <span className="text-gray-700">
                                        State must demonstrate compelling interest for restriction
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Document footer with annotations */}
                    <div className="absolute h-10 bottom-1 left-4 right-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button className="flex cursor-pointer items-center text-xs xl:text-base text-gray-500 md:hover:text-[#7b5411]">
                                <BookOpen className="h-4 w-4 mr-1" />
                                <span>Full Text</span>
                            </button>
                            <div className="h-4 border-r border-gray-200"></div>
                            <div className="text-xs xl:text-base text-gray-500">Page 1 of 24</div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1.5 rounded-full md:hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-400 rotate-180" />
                            </button>
                            <button className="p-1.5 rounded-full md:hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LeftSection = ({width}) => {
    return (
        <div className={`relative  ${width > 900 ?" w-[55%] px-5 ":"" } `} >

            <h1 className="user-select-none text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9e600a] to-[#d4812e]">
                    Indian Legal Document
                </span>
                <br />
                Summarization & Analysis
            </h1>

            <div className="user-select-none my-2 inline-flex items-center rounded-full bg-[#f8f2e998] px-4 py-2 text-sm font-medium text-[#7b4f11] shadow-sm border border-[#7b561129] animate-fade-in">
                <Scale className="mr-2 h-4 w-4" />
                <span>India's Premier Legal Document Service</span>
                <ChevronRight className="ml-2 h-4 w-4" />
            </div>

            <p className="user-select-none text-gray-600 text-sm md:w-[90%] pt-2">
                Access, understand, and utilize landmark judgments from Indian courts with our AI-powered summarization
                service. Perfect for legal professionals, researchers, and students.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 user-select-none">
                {[
                    {
                        title: "Comprehensive Coverage",
                        description: "All courts, from Supreme Court to District Courts",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Multilingual Support",
                        description: "Available in 12 Indian languages",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Expert Analysis",
                        description: "Reviewed by legal professionals",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Citation Network",
                        description: "See related cases and precedents",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />,
                    },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-3 p-3 ps-0 rounded-lg "
                    >
                        <div className="p-1 bg-[#7b541129] rounded-full  ">{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-gray-900 ">{feature.title}</h3>
                            <p className="text-gray-600 text-xs ">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search bar */}
            <div className=" my-3">
                <div className="mb-1 flex items-center justify-start gap-1 sm:text-xs text-[11px] text-gray-500 sm:pl-4 pl-1">
                    <span className="">Quick searches |</span>
                    <span className="rounded md:hover:text-[#7b4b11]">Article 14 |</span>
                    <span className="rounded md:hover:text-[#7b4b11]">IPC 302 |</span>
                    <span className="rounded md:hover:text-[#7b4b11]">Landmark Cases</span>
                </div>
                <div className="relative flex items-center xl:h-16 h-12 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                    <div className=" inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full h-full pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
                        placeholder="Search case law, judgments, or legal documents..."
                    />
                    <div className="h-full inset-y-0">
                        <button className="h-full px-6 bg-amber-900 text-base text-white font-medium md:hover:bg-[#562303] transition">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex sm:flex-row flex-col gap-4 pt-2">
                <Link
                tabIndex={0}
                href={"/chat"}
                className="bg-amber-900 text-sm text-white md:px-5 px-3 py-3 rounded-lg md:hover:bg-[#562303] transition flex items-center justify-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Summarize Document
                </Link>

                <Link href={"/judgments"}
                 className="group border text-sm border-gray-300 bg-[#ffdda12c] text-gray-700 md:px-5 px-3 py-3 rounded-lg md:hover:border-[#7b4f11] md:hover:text-[#7b4d11] transition-colors flex items-center justify-center">
                    <BookOpen className="mr-2 h-5 w-5 md:group-hover:text-[#7b4d11]" />
                    Browse Library
                </Link>
            </div>

            <div className=" relative flex items-center gap-4 pt-4  text-gray-500 user-select-none">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div
                                key={item}
                                className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <span className="ml-3 text-xs">Trusted by 5000+ legal professionals</span>
                </div>
            </div>

        </div>
    )
}

const BackGround = () => {
    return (
        <>
            {/* Enhanced decorative background elements */}
            <div className="absolute top-0 left-0 w-[100dvw] h-full overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#74603e38] rounded-full blur-[75px]"></div>
                <div className="absolute -bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#d4812e2a] rounded-full blur-[75px]"></div>

                {/* Decorative patterns */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

            </div>
        </>
    )
}