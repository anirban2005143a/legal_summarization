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

const ChatWindow = ({}) => {
  const [messages, setMessages] = useState([]);
  const [isChatInfoFetching, setisChatInfoFetching] = useState(true);
  const [isFetching, setisFetching] = useState(false);
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [selectedFiles, setselectedFiles] = useState(null);
  const [isReady, setisReady] = useState(false);

  const massagesRef = useRef(null);

  // add asked question to message array
  const handelSubmitQuery = async (input, setInput) => {
    if (!input.trim()) return;
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
          parameters: {
            max_new_tokens: 40, // Override local default of 128
            num_beams: 8,
            length_penalty: 0.8, // Favors longer outputs (values <1.0)
          },
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

  // copy the question or answer to clip board
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
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
                      <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%] flex-row">
                          <div className="flex-shrink-0 h-8 w-8  rounded-full flex items-center justify-center bg-purple-100">
                            <Bot className="w-6 h-6 text-white p-1 bg-purple-600 rounded-full" />
                          </div>
                          <div className=" group relative">
                            <div className="px-4 text-sm py-2 w-full bg-gray-100/20 text-gray-800 rounded-bl-2xl rounded-r-2xl shadow">
                              <p>{message.answer}</p>
                              <p className=" text-[10px] font-normal text-gray-700 mt-1">
                                {formatISODateToDDMMYYYY(Date.now())}
                              </p>
                            </div>
                            <div className="absolute left-2 top-full flex items-center gap-4 w-fit">
                              <button
                                aria-label="copy answer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  copyToClipboard(message.answer);
                                }}
                                className=" cursor-pointer py-2"
                              >
                                <Copy className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
                              </button>
                              <button
                                aria-label="download answer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDownload({
                                    data: { title: "Judgment Summary" },
                                    textContent: message.answer,
                                  });
                                }}
                                className=" cursor-pointer py-2"
                              >
                                <Download className=" hover:text-gray-800 text-gray-600 w-3.5 h-3.5 " />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
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
            isReady={isReady}
            setisReady={setisReady}
            isFetching={isFetching}
            handelSubmitQuery={handelSubmitQuery}
            selectedFiles={selectedFiles}
            setselectedFiles={setselectedFiles}
          />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
