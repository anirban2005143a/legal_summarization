

// "use client"
// import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"

// const HeroSection = () => {
//   return (
//     <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f2e9] to-white">
//       {/* Enhanced decorative background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#7b1113]/5 rounded-full blur-3xl"></div>
//         <div className="absolute top-[30%] -left-[10%] w-[40%] h-[60%] bg-[#6c6256]/5 rounded-full blur-3xl"></div>
//         <div className="absolute -bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#d42e32]/5 rounded-full blur-3xl"></div>

//         {/* Decorative patterns */}
//         <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>

//         {/* Accent lines */}
//         <div className="absolute top-[15%] right-0 w-[30%] h-[2px] bg-gradient-to-r from-transparent to-[#7b1113]/20"></div>
//         <div className="absolute top-[85%] left-0 w-[20%] h-[2px] bg-gradient-to-r from-[#7b1113]/20 to-transparent"></div>
//       </div>

//       {/* Main content */}
//       <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Left Content - Now spans 7 columns for better proportions */}
//           <div className="lg:col-span-7 space-y-8">
//             <div className="inline-flex items-center rounded-full bg-[#f8f2e9] px-4 py-2 text-sm font-medium text-[#7b1113] shadow-sm border border-[#7b1113]/10 animate-fade-in">
//               <Scale className="mr-2 h-4 w-4" />
//               <span>India's Premier Legal Document Service</span>
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7b1113] to-[#d42e32]">
//                 Indian Legal Document
//               </span>
//               <br />
//               Summarization & Analysis
//             </h1>

//             <p className="text-gray-600 text-lg md:text-xl max-w-2xl">
//               Access, understand, and utilize landmark judgments from Indian courts with our AI-powered summarization
//               service. Perfect for legal professionals, researchers, and students.
//             </p>

//             {/* Search bar */}
//             <div className="relative max-w-xl">
//               <div className="flex items-center h-14 w-full rounded-lg border border-gray-300 bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-[#7b1113] focus-within:border-[#7b1113]">
//                 <Search className="h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search for a case or legal document..."
//                   className="flex-1 border-0 bg-transparent px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
//                 />
//                 <button className="rounded-md bg-[#7b1113] px-4 py-2 text-sm font-medium text-white hover:bg-[#7b1113]/90 transition-colors">
//                   Search
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
//               {[
//                 {
//                   title: "Comprehensive Coverage",
//                   description: "All courts, from Supreme Court to District Courts",
//                   icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
//                 },
//                 {
//                   title: "Multilingual Support",
//                   description: "Available in 12 Indian languages",
//                   icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
//                 },
//                 {
//                   title: "Expert Analysis",
//                   description: "Reviewed by legal professionals",
//                   icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
//                 },
//                 {
//                   title: "Citation Network",
//                   description: "See related cases and precedents",
//                   icon: <CheckCircle className="h-5 w-5 text-[#7b1113] mt-0.5 flex-shrink-0" />,
//                 },
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-300"
//                 >
//                   <div className="p-1 bg-[#7b1113]/10 rounded-full">{feature.icon}</div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{feature.title}</h3>
//                     <p className="text-gray-600 text-sm">{feature.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 pt-2">
//               <button className="bg-[#7b1113] text-white px-6 py-3 rounded-lg hover:bg-[#7b1113]/90 transition-colors flex items-center justify-center">
//                 <FileText className="mr-2 h-5 w-5" />
//                 Try Document Analysis
//               </button>

//               <button className="group border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg hover:border-[#7b1113] hover:text-[#7b1113] transition-colors flex items-center justify-center">
//                 <BookOpen className="mr-2 h-5 w-5 group-hover:text-[#7b1113]" />
//                 Browse Library
//               </button>
//             </div>

//             <div className="flex items-center gap-4 pt-4 text-sm text-gray-500">
//               <div className="flex items-center">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4, 5].map((item) => (
//                     <div
//                       key={item}
//                       className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
//                     >
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//                 <span className="ml-3">Trusted by 5000+ legal professionals</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Enhanced document preview - Now spans 5 columns */}
//           <div className="lg:col-span-5 relative">
//             <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200 bg-white">
//               {/* Document header */}
//               <div className="absolute top-0 left-0 right-0 h-12 bg-[#7b1113] flex items-center px-4">
//                 <div className="flex space-x-2">
//                   {[1, 2, 3].map((item) => (
//                     <div key={item} className="h-3 w-3 rounded-full bg-white/20"></div>
//                   ))}
//                 </div>
//                 <div className="mx-auto text-white text-sm font-medium">Supreme Court of India</div>
//               </div>

//               {/* Document content */}
//               <div className="absolute top-12 left-0 right-0 bottom-0 p-6 overflow-hidden">
//                 {/* Document title */}
//                 <div className="text-center mb-4 pb-2 border-b border-gray-200">
//                   <h3 className="text-lg font-bold text-[#7b1113]">Landmark Judgment</h3>
//                   <p className="text-sm text-gray-500">Civil Appeal No. 3456 of 2023</p>
//                 </div>

//                 {/* Document text with highlights */}
//                 <div className="space-y-3 text-sm text-gray-700">
//                   <p>JUDGMENT</p>
//                   <p>
//                     <span className="bg-yellow-100 px-1">The Constitution of India</span> guarantees to all its citizens
//                     the right to equality before law and equal protection of laws...
//                   </p>
//                   <p>
//                     This Court has consistently held that Article 21 encompasses within its ambit the right to live with
//                     human dignity...
//                   </p>
//                   <p className="bg-[#7b1113]/5 p-2 rounded border-l-2 border-[#7b1113] font-medium">
//                     "The right to privacy is protected as an intrinsic part of the right to life and personal liberty
//                     under Article 21."
//                   </p>
//                   <p>
//                     Therefore, in light of the <span className="bg-yellow-100 px-1">precedents established</span> and
//                     the constitutional provisions...
//                   </p>

//                   {/* AI Summary section */}
//                   <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                     <div className="flex items-center mb-2">
//                       <div className="h-6 w-6 rounded-full bg-[#7b1113] flex items-center justify-center text-white text-xs mr-2">
//                         AI
//                       </div>
//                       <span className="font-medium text-gray-900">Summary</span>
//                     </div>
//                     <p className="text-xs text-gray-600">
//                       This landmark judgment establishes that the right to privacy is a fundamental right protected
//                       under Article 21 of the Constitution of India...
//                     </p>
//                   </div>
//                 </div>

//                 {/* Document footer with annotations */}
//                 <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-gray-500">
//                   <div>Page 1 of 24</div>
//                   <div>4 annotations</div>
//                 </div>
//               </div>

//               {/* Decorative elements */}
//               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f8f2e9] rounded-full opacity-50"></div>
//               <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#7b1113]/10 rounded-full"></div>
//             </div>

//             {/* Floating elements */}
//             <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-[#7b1113]/10 flex items-center justify-center">
//               <div className="h-8 w-8 rounded-full bg-[#7b1113] flex items-center justify-center text-white">
//                 <Scale className="h-4 w-4" />
//               </div>
//             </div>
//             <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-[#f8f2e9] border border-[#7b1113]/10 flex items-center justify-center">
//               <FileText className="h-6 w-6 text-[#7b1113]" />
//             </div>
//           </div>
//         </div>
//       </div>


//     </div>
//   )
// }

// export default HeroSection


import { BookOpen, FileText, Scale, CheckCircle, ChevronRight, Search } from "lucide-react"
import RightComponent from "./RightComponent"
import LeftSection from "./LeftSection"
import BackGround from "./BackGround"

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f2e9] to-white">
      <BackGround />

      {/* Main content */}
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
