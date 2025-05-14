import React from 'react'
import { BookOpen, FileText, Scale, CheckCircle, ChevronRight } from "lucide-react"

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white overflow-x-hidden relative">


            {/* Main Hero Section */}
            <div className="relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#000000] to-transparent opacity-30 -rotate-6 scale-125"></div>
                <div className="absolute top-0 right-10 w-1/5 h-full bg-[#6c6256] -skew-x-12"></div>


                {/* Content */}
                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center rounded-full bg-[#f8f2e9] px-4 py-2 text-sm font-medium text-[#7b1113] shadow-sm border border-[#7b1113]/10">
                                <Scale className="mr-2 h-4 w-4" />
                                <span>India's Premier Legal Document Service</span>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7b1113] to-[#d42e32]">
                                    Indian Legal Document
                                </span><br />
                                Summarization & Analysis
                            </h1>

                            <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
                                Access, understand, and utilize landmark judgments from Indian courts with our AI-powered
                                summarization service. Perfect for legal professionals, researchers, and students.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "Comprehensive Coverage",
                                        description: "All courts, from Supreme Court to District Courts",
                                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />
                                    },
                                    {
                                        title: "Multilingual Support",
                                        description: "Available in 12 Indian languages",
                                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />
                                    },
                                    {
                                        title: "Expert Analysis",
                                        description: "Reviewed by legal professionals",
                                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />
                                    },
                                    {
                                        title: "Citation Network",
                                        description: "See related cases and precedents",
                                        icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />
                                    }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="p-1 bg-[#7b1113]/10 rounded-full">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                {/* <SearchDialog /> */}

                                <button variant="outline" className="group border-gray-300 text-gray-700 px-6 py-6 text-lg rounded-lg hover:border-[#7b1113] hover:text-[#7b1113] transition-colors">
                                    <BookOpen className="mr-2 h-5 w-5 group-hover:text-[#7b1113]" />
                                    Browse Library
                                </button>
                            </div>

                            <div className="flex items-center gap-4 pt-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
                                        ))}
                                    </div>
                                    <span className="ml-3">Trusted by 5000+ legal professionals</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Placeholder for image */}
                        <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-gradient-to-br from-[#f8f2e9d6] to-white">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="text-center space-y-4">
                                    <FileText className="h-16 w-16 mx-auto text-[#7b1113]" />
                                    <h3 className="text-xl font-semibold text-gray-800">Legal Document Preview</h3>
                                    <p className="text-gray-600">Interactive document viewer with annotations and highlights</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection