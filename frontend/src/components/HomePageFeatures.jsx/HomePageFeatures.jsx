"use client";

import { Scale, Languages, Bot, FileText, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Features = () => {
  const router = useRouter();
  const [width, setwidth] = useState(null);

  useEffect(() => {
    setwidth(window.innerWidth);
    const changeWidth = () => {
      setwidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  if (!width) return null;

  return (
    <section className=" text-[#2B2B2B] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Features Section */}
        <h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
          Why Choose LegalSummarize?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText className="w-10 h-10 text-amber-800" />,
              title: "Instant Summaries",
              desc: "Upload or paste judgments and get concise, accurate summaries within seconds.",
            },
            {
              icon: <Languages className="w-10 h-10 text-amber-800" />,
              title: "Multilingual Support",
              desc: "Read judgments in Hindi, Bengali, Tamil, and more with AI-powered translation.",
            },
            {
              icon: <Bot className="w-10 h-10 text-amber-800" />,
              title: "AI Legal Assistant",
              desc: "Chat with our AI to clarify legal terms, ask questions, and explore case details.",
            },
            {
              icon: <BookOpen className="w-10 h-10 text-amber-800" />,
              title: "Citation Finder",
              desc: "Automatically discover related cases and references connected to your judgment.",
            },
            {
              icon: <Scale className="w-10 h-10 text-amber-800" />,
              title: "Expert-Reviewed",
              desc: "Summaries reviewed and validated by legal experts for maximum accuracy.",
            },
            {
              icon: <Users className="w-10 h-10 text-amber-800" />,
              title: "Trusted by Professionals",
              desc: "Used by lawyers, students, and researchers across India.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col bg-white/30 items-center p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-center text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <h2 className="text-3xl font-bold text-center text-amber-800 mt-20 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            {
              step: "1",
              title: "Upload Document",
              desc: "Paste or upload a legal judgment.",
            },
            {
              step: "2",
              title: "AI Summarizes",
              desc: "Our model generates concise summaries.",
            },
            {
              step: "3",
              title: "Translate & Explore",
              desc: "View summaries in multiple languages.",
            },
            {
              step: "4",
              title: "Chat with AI",
              desc: "Ask questions and clarify instantly.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#FFF8F0] shadow-sm"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#7B4B00] text-white font-bold text-lg">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Chat Assistant Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-amber-800 mb-6">
            Your Legal AI Companion
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interact with our AI chatbot to clarify judgments, ask legal
            questions, and explore precedents instantly.
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("/chat");
            }}
            className="mt-6 px-6  py-3 cursor-pointer bg-amber-900 text-white rounded-xl font-medium hover:bg-[#774701] transition"
          >
            Try the Chatbot →
          </button>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-[#ffffffa8] border-2 border-amber-800/20 rounded-2xl py-8 md:px-12 sm:px-8 px-4 text-center shadow-md">
          <h2 className="text-3xl font-bold text-amber-800">
            Start Summarizing Today
          </h2>
          <p className="mt-4 text-gray-700">
            Experience the fastest way to understand Indian legal judgments.
          </p>
          <div className="mt-6 flex md:flex-row flex-col items-center justify-center gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/chat");
              }}
              className="px-6 py-3 cursor-pointer bg-[#7B4B00] text-white rounded-xl font-medium hover:bg-[#633C00] transition"
            >
              Summarize Document
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/judgments");
              }}
              className="px-6 py-3 border cursor-pointer border-[#7B4B00] text-amber-800 rounded-xl font-medium hover:bg-[#7B4B00] hover:text-white transition"
            >
              Browse Library
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
