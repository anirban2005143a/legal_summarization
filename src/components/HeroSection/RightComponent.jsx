import { BookOpen, CheckCircle, ChevronRight, FileText, Scale } from 'lucide-react'
import React from 'react'

const RightComponent = () => {
    return (
        <div className="md:w-[45%] ">
            <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white">
                {/* Document header */}
                <div className="user-select-none relative py-5 bg-gradient-to-r from-[#7b1113] to-[#9e1518] flex items-center px-4">
                    <div className=" absolute left-0 top-1/2 -translate-y-1/2 md:ps-4 ps-2 flex space-x-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-white opacity-70"></div>
                    </div>
                    <div className="mx-auto text-white text-sm font-medium flex items-center">
                        <Scale className="h-4 w-4 mr-2" />
                        Supreme Court of India
                    </div>
                </div>

                {/* Document content */}
                <div className=" px-3 py-6 ">
                    {/* Document title */}
                    <div className=" mb-6 pb-3 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <div className="px-2 py-1 bg-[#7b1113]/10 rounded text-xs text-[#7b1113] font-medium">
                                Civil Appeal No. 3456 of 2023
                            </div>
                            <div className="text-xs text-gray-500">Filed on: 12 Mar 2023</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Sharma vs. State of Maharashtra</h3>
                        <p className="text-sm text-gray-500 mt-1">Right to Privacy - Constitutional Bench</p>
                    </div>

                    {/* Document text with highlights */}
                    <div className="user-select-none my-10 text-sm text-gray-700">
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                            <FileText className="h-4 w-4" />
                            <span>JUDGMENT EXCERPT</span>
                        </div>

                        <p className="leading-relaxed">
                            The Constitution of India guarantees to all its citizens the right to equality before law and equal
                            protection of laws...
                        </p>

                        <div className="p-3 bg-[#f8f2e9] rounded border-l-3 border-[#7b1113] my-4">
                            <p className="italic text-gray-700 leading-relaxed">
                                "The right to privacy is protected as an intrinsic part of the right to life and personal liberty
                                under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution."
                            </p>
                            <div className="text-xs text-gray-500 mt-2">— Chief Justice, Paragraph 24</div>
                        </div>

                        <p className="leading-relaxed">
                            This Court has consistently held that <span className="bg-yellow-100 px-1">Article 21</span>{" "}
                            encompasses within its ambit the right to live with human dignity...
                        </p>

                        {/* Key points section */}
                        <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                                <CheckCircle className="h-4 w-4 text-[#7b1113] mr-2" />
                                Key Points
                            </h4>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <div className="h-5 w-5 rounded-full bg-[#7b1113]/10 flex items-center justify-center text-[#7b1113] text-xs mr-2 mt-0.5">
                                        1
                                    </div>
                                    <span className="text-gray-700">Privacy is a fundamental right under Article 21</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="h-5 w-5 rounded-full bg-[#7b1113]/10 flex items-center justify-center text-[#7b1113] text-xs mr-2 mt-0.5">
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
                    <div className="absolute h-10 bottom-2 left-4 right-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center text-xs text-gray-500 hover:text-[#7b1113]">
                                <BookOpen className="h-4 w-4 mr-1" />
                                <span>Full Text</span>
                            </button>
                            <div className="h-4 border-r border-gray-200"></div>
                            <div className="text-xs text-gray-500">Page 1 of 24</div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1.5 rounded-full hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-400 rotate-180" />
                            </button>
                            <button className="p-1.5 rounded-full hover:bg-gray-100">
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightComponent