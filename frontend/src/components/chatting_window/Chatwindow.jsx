"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Send,
  Bot,
  User,
  Loader2,
  MicOff,
  Mic,
  Copy,
  Download,
  Globe,
  ChevronDown,
} from "lucide-react";
import { saveChatResponse } from "./functions/saveChat";
import { getChatInfo } from "./functions/getChatInfo";
import { v4 as uuidv4 } from "uuid";
import { showToast } from "@/utils/ShowToast";
import axios from "axios";
import { ChatContentLoader } from "./ChatContentLoader";
import { TextAreaForQuery } from "./TextAreaForQuery";
import { formatISODateToDDMMYYYY } from "@/utils/formateDate";
import { handleDownload } from "@/utils/downlaodPdfFromText";
import { copyToClipboard } from "@/utils/copyToClipboard";

const ChatWindow = ({}) => {
  const [messages, setMessages] = useState([]);
  const [isChatInfoFetching, setisChatInfoFetching] = useState(true);
  const [selectedModel, setselectedModel] = useState("T5");
  const [isFetching, setisFetching] = useState(false);
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [selectedFiles, setselectedFiles] = useState(null);
  const [isReady, setisReady] = useState(false);

  const massagesRef = useRef(null);

  // add asked question to message array
  const handelSubmitQuery = async (input, setInput) => {
    if (!input.trim()) return;
    console.log("submitting")
    setisReady(false);
    const newMessage = {
      question: input,
      answer: undefined,
      _id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setquestion(input);
    setInput("");
    setselectedFiles(null);
  };

  //save chat question and answer to database
  const saveChat = async (question, answer) => {
    const data = await saveChatResponse(question, answer);
    // console.log(data);
  };

  //function to get chat question-answer from session storage
  const getChatQueAns = async () => {
    const chats = await JSON.parse(sessionStorage.getItem("allChat"));
    chats && Array.isArray(chats) && setMessages(chats);
    setisChatInfoFetching(false);
  };

  // get answer for input
  const getAnswer = async (input) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_FAST_URL}/predict`,
        {
          text: input,
          // parameters: {
          //   max_new_tokens: 128, 
          //   num_beams: 8,
          //   length_penalty: 0.8, 
          // },
          model_name: selectedModel || "t5",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const res = await new Promise((res, rej) => {
      //   setTimeout(() => {
      //     res("demo reponse from ai model")
      //   }, 2000);
      // });
      // setanswer(res);

      setanswer(res.data.summary);
    } catch (error) {
      console.log(error);
      setisFetching(false);
      showToast(
        error.response?.data?.detail ||
          error.message ||
          "Unknown Error . Please try again",
        1
      );
    }
  };

  // when ans come or answer changes .. if (answer) then clear all states
  useEffect(() => {
    if (answer) {
      saveChat(question, answer);

      if (messages.length > 0 && messages[messages.length - 1].question) {
        const updatedMessage = messages;
        updatedMessage[updatedMessage.length - 1].answer = `${answer}`;
        setMessages(updatedMessage);
      }

      setquestion("");
      setanswer("");
      setisReady(true);
      setisFetching(false);
    }
  }, [answer]);

  // whenever there is a question then call the getAnswer function with the question as a input
  useEffect(() => {
    if (question) {
      setisFetching(true);
      getAnswer(question);
    }
  }, [question]);

  //scroll to bottom as messages changes (means a question or answer is added to messages array)
  useEffect(() => {
    if (massagesRef.current || isFetching) {
      // massagesRef.current.scrollTop = massagesRef.current.scrollHeight;
      massagesRef.current.scrollTo({
        top: massagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isFetching]);

  // useEffect for fetch previous chats from session storage just for persist chat on reload page
  useEffect(() => {
    getChatQueAns();
  }, []);

  if (isChatInfoFetching) return <ChatContentLoader />;
// console.log(isReady)
  return (
    <>
      <div className="flex flex-col mx-auto h-full   justify-center items-center">
        {/* Messages Container */}
        {!isChatInfoFetching && messages && messages.length > 0 && (
          <div className="flex-1 overflow-y-auto" ref={massagesRef}>
            <div className=" md:w-[80%] md:min-w-[800px] w-full max-w-[1500px] mx-auto py-4 px-2 space-y-10 overflow-hidden ">
              {messages.map((message, ind) => {
                return (
                  <div
                    key={uuidv4()}
                    className={`flex flex-col space-y-10 py-5 ${
                      ind == 0 ? "pt-[55px]" : ""
                    }`}
                  >
                    {/* User Message */}
                    {message.question && (
                      <>
                        <div className="flex justify-end ">
                          <div className="flex gap-3 max-w-[80%] flex-row-reverse ">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100">
                              <User className="w-6 h-6 text-white bg-indigo-600 rounded-full p-1" />
                            </div>
                            <div className=" group relative">
                              <div className="px-4 py-2 w-full bg-indigo-600 max-h-[300px] overflow-y-auto text-white rounded-br-2xl rounded-l-2xl shadow-sm overflow-x-auto">
                                <p className="text-sm">{message.question}</p>
                                <p className=" text-[10px] font-normal text-gray-200 mt-1">
                                  {formatISODateToDDMMYYYY(Date.now())}
                                </p>
                              </div>
                              <button
                                aria-label="copy question"
                                onClick={(e) => {
                                  e.preventDefault();
                                  copyToClipboard(message.question);
                                }}
                                className="absolute right-2 top-full w-fit cursor-pointer mt-2 "
                              >
                                <Copy className=" text-gray-600 w-3.5 h-3.5 " />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Bot Message */}
                    {message.answer && (
                      <BotMessage message={message} />
                    )}
                  </div>
                );
              })}

              {/* Loading Message */}
              {!isChatInfoFetching && isFetching && (
                <div className="flex justify-start">
                  <div className="flex gap-3 w-[60%] flex-row">
                    <div className="flex-shrink-0 h-8 w-8  rounded-full flex items-center justify-center bg-purple-100">
                      <Bot className="w-6 h-6 text-white p-1 bg-purple-600 rounded-full" />
                    </div>
                    {/* Message content */}
                    <div className="bg-gray-200 px-2 py-3 w-full animate-pulse rounded-bl-2xl rounded-r-2xl">
                      <div className="h-4 bg-gray-400/60 rounded-full w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-400/60 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="md:w-[60%] md:min-w-[600px] w-full max-w-[1500px] ">
          <TextAreaForQuery
            isEmpty={!(!isChatInfoFetching && messages && messages.length > 0)}
            isReady={!isFetching}
            setisReady={setisReady}
            isFetching={isFetching}
            handelSubmitQuery={handelSubmitQuery}
            selectedFiles={selectedFiles}
            setselectedFiles={setselectedFiles}
            selectedModel={selectedModel}
            setselectedModel={setselectedModel}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;

const BotMessage = ({ message }) => {
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState("original"); // "original" or "translated"
  const [selectedLang, setSelectedLang] = useState("Telugu");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const langButtonRef = useRef(null);

  const SUPPORTED_LANGUAGES = [
    "Telugu",
    "Hindi",
    "Bengali",
    "Tamil",
    "Marathi",
    "Malayalam",
    "Gujarati",
    "Punjabi",
    "Odia",
    "Kannada"
  ];

  // Reset states when the original output changes
  useEffect(() => {
    setTranslatedText("");
    setActiveTab("original");
  }, [message.answer]);

  // Handle clicking outside the language dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        langDropdownRef.current && !langDropdownRef.current.contains(e.target) &&
        langButtonRef.current && !langButtonRef.current.contains(e.target)
      ) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTranslate = async () => {
    if (isTranslating || !message.answer) return;
    setIsTranslating(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_FAST_URL}/translate`, {
        text: message.answer,
        target_lang: selectedLang,
      });
      if (res.data.success && res.data.translated_text) {
        setTranslatedText(res.data.translated_text);
        setActiveTab("translated");
      } else {
        showToast(res.data.error || "Translation failed", 1);
      }
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.detail || err.message || "Failed to connect to translation server", 1);
    } finally {
      setIsTranslating(false);
    }
  };

  const displayText = activeTab === "translated" ? translatedText : message.answer;

  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[80%] flex-row">
        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-purple-100">
          <Bot className="w-6 h-6 text-white p-1 bg-purple-600 rounded-full" />
        </div>
        <div className="group relative flex flex-col min-w-[200px]">
          {/* Tabs header */}
          {message.answer && !isTranslating && (
            <div className="flex mb-1 gap-2 pl-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("original");
                }}
                className={`text-[10px] font-semibold border-b-2 transition-colors duration-200 ${
                  activeTab === "original"
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Original (EN)
              </button>
              {translatedText && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("translated");
                  }}
                  className={`text-[10px] font-semibold border-b-2 transition-colors duration-200 ${
                    activeTab === "translated"
                      ? "border-purple-600 text-purple-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Translated ({selectedLang})
                </button>
              )}
            </div>
          )}

          {/* Chat Bubble Body */}
          <div className="px-4 text-sm py-2 w-full bg-gray-100/20 text-gray-800 rounded-bl-2xl rounded-r-2xl shadow">
            {isTranslating ? (
              <div className="py-2 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                <span className="text-xs text-gray-500 italic">Translating...</span>
              </div>
            ) : (
              <p className="whitespace-pre-wrap">{displayText}</p>
            )}
            <p className="text-[10px] font-normal text-gray-700 mt-1">
              {formatISODateToDDMMYYYY(message.createdAt || Date.now())}
            </p>
          </div>

          {/* Action buttons + Translate */}
          {!isTranslating && (
            <div className="flex items-center gap-4 mt-1 bg-transparent px-1 relative w-full justify-between">
              {/* Copy & Download */}
              <div className="flex items-center gap-2">
                <button
                  aria-label="copy answer"
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(displayText);
                  }}
                  className="cursor-pointer py-1"
                >
                  <Copy className="hover:text-gray-800 text-gray-600 w-3.5 h-3.5" />
                </button>
                <button
                  aria-label="download answer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDownload({
                      data: { title: `Chat Response (${activeTab === 'translated' ? selectedLang : 'English'})` },
                      textContent: displayText,
                    });
                  }}
                  className="cursor-pointer py-1"
                >
                  <Download className="hover:text-gray-800 text-gray-600 w-3.5 h-3.5" />
                </button>
              </div>

              {/* Translation controls */}
              <div className="flex items-center gap-1.5 relative">
                <button
                  ref={langButtonRef}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLangDropdownOpen((prev) => !prev);
                  }}
                  className="px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1 transition-colors"
                >
                  <Globe className="w-3 h-3 text-gray-500" />
                  <span>{selectedLang}</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>

                {isLangDropdownOpen && (
                  <div
                    ref={langDropdownRef}
                    className="absolute z-35 bottom-full right-0 mb-1 w-36 bg-white border border-gray-200 rounded shadow-lg max-h-36 overflow-y-auto"
                  >
                    <ul className="py-1">
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <li
                          key={lang}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedLang(lang);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`px-2 py-1 text-[10px] hover:bg-purple-50 cursor-pointer text-gray-700 ${
                            selectedLang === lang ? "bg-purple-50 font-semibold text-purple-700" : ""
                          }`}
                        >
                          {lang}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleTranslate();
                  }}
                  className="px-2 py-0.5 text-[10px] font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded transition-all"
                >
                  Translate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
