import { BookOpen, CheckCircle, ChevronRight, FileText, Scale, Search } from 'lucide-react'
import React from 'react'

const LeftSection = () => {
    return (
        <div className="lg:col-span-7 space-y-8">
            <div className="user-select-none inline-flex items-center rounded-full bg-[#f8f2e9] px-4 py-2 text-sm font-medium text-[#7b1113] shadow-sm border border-[#7b1113]/10 animate-fade-in">
                <Scale className="mr-2 h-4 w-4" />
                <span>India's Premier Legal Document Service</span>
                <ChevronRight className="ml-2 h-4 w-4" />
            </div>

            <h1 className="user-select-none text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7b1113] to-[#d42e32]">
                    Indian Legal Document
                </span>
                <br />
                Summarization & Analysis
            </h1>

            <p className="user-select-none text-gray-600 text-lg md:text-xl max-w-2xl">
                Access, understand, and utilize landmark judgments from Indian courts with our AI-powered summarization
                service. Perfect for legal professionals, researchers, and students.
            </p>


            {/* Search bar */}
            <div className="max-w-2xl">
                <div className="relative flex items-center h-16 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                    <div className=" inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full h-full pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                        placeholder="Search case law, judgments, or legal documents..."
                    />
                    <div className="h-full inset-y-0">
                        <button className="h-full px-6 bg-[#7b1113] text-white font-medium hover:bg-[#5a0d0f] transition-colors">
                            Search
                        </button>
                    </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 pl-4">
                    <span className="mr-3">Quick searches:</span>
                    <button className="mr-2 px-2 py-0.5 rounded hover:bg-gray-100 hover:text-[#7b1113]">Article 14</button>
                    <button className="mr-2 px-2 py-0.5 rounded hover:bg-gray-100 hover:text-[#7b1113]">IPC 302</button>
                    <button className="px-2 py-0.5 rounded hover:bg-gray-100 hover:text-[#7b1113]">Landmark Cases</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 user-select-none">
                {[
                    {
                        title: "Comprehensive Coverage",
                        description: "All courts, from Supreme Court to District Courts",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Multilingual Support",
                        description: "Available in 12 Indian languages",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Expert Analysis",
                        description: "Reviewed by legal professionals",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
                    },
                    {
                        title: "Citation Network",
                        description: "See related cases and precedents",
                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
                    },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg "
                    >
                        <div className="p-1 bg-[#7b1113]/10 rounded-full  ">{feature.icon}</div>
                        <div>
                            <h3 className="font-semibold text-gray-900 ">{feature.title}</h3>
                            <p className="text-gray-600 text-sm ">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="bg-[#7b1113] text-white px-6 py-3 rounded-lg hover:bg-[#7b1113]/90 transition-colors flex items-center justify-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Try Document Analysis
                </button>

                <button className="group border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg hover:border-[#7b1113] hover:text-[#7b1113] transition-colors flex items-center justify-center">
                    <BookOpen className="mr-2 h-5 w-5 group-hover:text-[#7b1113]" />
                    Browse Library
                </button>
            </div>

            <div className="flex items-center gap-4 pt-4 text-sm text-gray-500 user-select-none">
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
                    <span className="ml-3">Trusted by 5000+ legal professionals</span>
                </div>
            </div>
        </div>
    )
}

export default LeftSection