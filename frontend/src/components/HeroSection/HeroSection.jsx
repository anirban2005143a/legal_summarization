"use client";

import {
  BookOpen,
  FileText,
  Scale,
  CheckCircle,
  ChevronRight,
  Search,
  Send,
  User,
  Bot,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export const HeroSection = () => {
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
    <>
      {/* {!width && <HeroContentLoader />} */}
      {width && (
        <div className="relative overflow-hidden  pt-[90px]  xl:pt-[120px] ">
          {/* Main content */}
          <div className=" mx-auto sm:px-6 px-3  relative z-10">
            <div
              className={`flex ${
                width > 900 ? " flex-row " : " flex-col "
              } max-w-[1500px] mx-auto ${
                width > 900 ? " gap-4 " : " gap-15 "
              } justify-between items-start `}
            >
              {/* Left Content  */}
              <LeftSection width={width} />

              {/* Right Content */}
              <RightComponent width={width} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const RightComponent = ({ width }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  // Ref for chat scroll container
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    const el = chatContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages]);

  const sampleJudgment = `Sharma vs. State of Maharashtra - Right to Privacy - Constitutional Bench

The Constitution of India guarantees to all its citizens the right to equality before law and equal protection of laws...

*"The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution."*

— Chief Justice, Paragraph 24

This Court has consistently held that Article 21 encompasses within its ambit the right to live with human dignity...`;

  const sampleSummary = `Summary of Sharma vs. State of Maharashtra:

1. The Supreme Court ruled that the right to privacy is a fundamental right under Article 21 of the Indian Constitution.
2. Privacy is protected as part of the right to life and personal liberty.
3. The judgment establishes that any state restriction on privacy must demonstrate a compelling interest.
4. The Court emphasized that Article 21 includes the right to live with human dignity.`;

  const startDemo = () => {
    if (isPlaying) return;
    setShowPrompt(false);
    setIsPlaying(true);
    setMessages([]);

    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: sampleJudgment,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(true);
    }, 500);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: 2,
          text: sampleSummary,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 2500);

    setTimeout(() => {
      setIsPlaying(false);
    }, 4000);
  };

  useEffect(() => {
    let isCancelled = false;

    const loopDemo = () => {
      if (isCancelled) return;
      startDemo();
      setTimeout(loopDemo, 7000);
    };

    loopDemo();

    return () => {
      isCancelled = true;
      setIsPlaying(false);
    };
  }, []);

  return (
    <div
      className={`
        ${
          width > 900 ? " w-[40%] min-w-[340px] max-w-[500px] " : ""
        } xl:w-[40%] xl:max-w-[580px]
        flex flex-col h-[550px] bg-gray-50 rounded-lg shadow-lg overflow-hidden`}
    >
      {/* Chat header */}
      <div className="bg-amber-800 text-white p-3 sm:p-4 flex items-center">
        <div className="flex items-center">
          <Bot className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
          <h2 className="text-sm sm:text-lg font-semibold">
            Summarize with our Legal AI Assistant
          </h2>
        </div>
      </div>

      {/* Chat messages area (scrollable) */}
      <div ref={chatContainerRef} className="flex-1 p-2 sm:p-4 overflow-y-auto">
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4"
            >
              <button
                onClick={startDemo}
                className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Bot className="h-4 w-4 mr-2" />
                Summarize judgment with AI model
              </button>
              <p className="text-xs sm:text-sm text-gray-400">
                Summarize judgment with AI model
              </p>
            </motion.div>
          )}

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-3 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[90%] sm:max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full ${
                    message.sender === "user"
                      ? "bg-indigo-100 text-indigo-600 ml-2"
                      : "bg-[#eee6dc] text-[#5a3a1c] mr-2"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <motion.div
                  initial={{ scale: 0.97 }}
                  animate={{ scale: 1 }}
                  className={`p-3 w-[90%] rounded-lg text-sm leading-relaxed ${
                    message.sender === "user"
                      ? "bg-[#fffaf3] border border-amber-200 text-gray-700 rounded-tr-none"
                      : "bg-white border border-[#e6dccf] text-gray-700 rounded-tl-none shadow"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 font-semibold text-[#52310e]`}>
                    {message.timestamp}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex mb-3 justify-start"
            >
              <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-purple-100 text-purple-600 mr-2">
                <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <div className="bg-white p-2 sm:p-3 rounded-lg rounded-tl-none shadow-sm">
                <div className="flex space-x-1">
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input placeholder area */}
      <div className="border-t border-gray-200 p-2 sm:p-3 bg-gray-100 cursor-not-allowed">
        <div className="flex items-end">
          <div className="flex-1 border border-amber-800 rounded-lg px-3 py-1 sm:px-4 sm:py-2 bg-white text-gray-400 text-xs sm:text-sm">
            Paste a legal judgment to summarize...
          </div>
          <button
            className="ml-2 bg-[#ae815d19] text-gray-500 border-1 border-amber-700 p-1 sm:p-2 rounded-lg cursor-not-allowed"
            disabled
          >
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const LeftSection = ({ width }) => {
  const [query, setquery] = useState("");
  const router = useRouter();

  return (
    <div className={`relative  ${width > 900 ? " w-[55%] px-5 " : ""} `}>
      {/* <h1 className="user-select-none text-4xl md:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9e600a] to-[#d4812e]">
          Indian Legal Document
        </span>
        <br />
        Summarization & Analysis
      </h1> */}

      <h1 className="user-select-none text-4xl md:text-[40px] xl:text-[50px] font-bold text-gray-900 leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9e600a] to-[#d4812e]">
          AI-Powered Indian Legal
        </span>
        <br />
        Judgment Summarization
      </h1>

      <div className="user-select-none my-2 inline-flex items-center rounded-full bg-[#f8f2e998] px-4 py-2 text-sm font-medium text-[#7b4f11] shadow-sm border border-[#7b561129] animate-fade-in">
        <Scale className="mr-2 h-4 w-4" />
        <span>India's Premier Legal Judgment Summarization</span>
        <ChevronRight className="ml-2 h-4 w-4" />
      </div>

      <p className="user-select-none text-gray-600 text-sm md:w-[90%] pt-2">
        Access, explore, and understand court judgments from across India with
        our advanced AI-powered summarization platform. Search, download, and
        instantly summarize judgments — built for legal professionals, law
        students, and practitioners who need speed, clarity, and accuracy.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 user-select-none">
        {[
          {
            title: "Comprehensive Coverage",
            description: "Judgments from Supreme to District Courts.",
            icon: (
              <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />
            ),
          },
          {
            title: "Multilingual Support",
            description: "Supports different major Indian languages.",
            icon: (
              <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />
            ),
          },
          {
            title: "Expert Analysis",
            description: "Summaries reviewed by legal experts.",
            icon: (
              <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />
            ),
          },
          {
            title: "Citation Network",
            description: "Find related cases and precedents.",
            icon: (
              <CheckCircle className="h-5 w-5 text-[#7b5111] mt-0.5 flex-shrink-0" />
            ),
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 ps-0 rounded-lg "
          >
            <div className="p-1 bg-[#7b541129] rounded-full  ">
              {feature.icon}
            </div>
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
          <span className="rounded md:hover:text-[#7b4b11]">
            Landmark Cases
          </span>
        </div>
        <div className="relative flex items-center xl:h-16 h-12 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className=" inset-y-0 left-0 px-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            value={query}
            onChange={(e) => {
              setquery(e.target.value);
            }}
            type="text"
            className="block w-full h-full pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
            placeholder="Search case law, judgments, or legal documents..."
          />
          <div className="h-full inset-y-0">
            <button
              aria-label="search button"
              onClick={(e) => {
                e.preventDefault();
                if (query) {
                  sessionStorage.setItem("query", query);
                  router.push("/judgments");
                }
              }}
              className={`h-full px-6 bg-amber-900 text-base text-white font-medium md:hover:bg-[#562303] transition ${
                query ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col gap-4 pt-2">
        <Link
          tabIndex={0}
          href={"/chat"}
          className="bg-amber-900 text-sm text-white md:px-5 px-3 py-3 rounded-lg md:hover:bg-[#562303] transition flex items-center justify-center"
        >
          <FileText className="mr-2 h-5 w-5" />
          Summarize Document
        </Link>

        <Link
          href={"/judgments"}
          className="group border text-sm border-gray-300 bg-[#ffdda12c] text-gray-700 md:px-5 px-3 py-3 rounded-lg md:hover:border-[#7b4f11] md:hover:text-[#7b4d11] transition-colors flex items-center justify-center"
        >
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
          <span className="ml-3 text-xs">
            Trusted by 5000+ legal professionals
          </span>
        </div>
      </div>
    </div>
  );
};

export const HomePageBackGround = () => {
  return (
    <>
      {/* Enhanced decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-1">
        <div className="fixed -top-[10%] -right-[10%] w-[50%] h-[70%] bg-[#74603e38] rounded-full blur-[75px]"></div>
        <div className="fixed -bottom-[10%] right-[20%] w-[30%] h-[40%] bg-[#d4812e2a] rounded-full blur-[75px]"></div>

        {/* Decorative patterns */}
        <div className="fixed top-0 left-0 w-full h-full opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
    </>
  );
};
