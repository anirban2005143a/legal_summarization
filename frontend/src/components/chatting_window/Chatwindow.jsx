"use client"

import React, { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2, MicOff, Mic } from "lucide-react";
import { saveChatResponse } from "./functions/saveChat";
import { getChatInfo } from "./functions/getChatInfo";
import { v4 as uuidv4 } from "uuid";
import ChatContentLoader from "./ChatContentLoader";

const ChatWindow = ({ }) => {

  const [messages, setMessages] = useState([]);
  const [isChatInfoFetching, setisChatInfoFetching] = useState(true)
  const [input, setInput] = useState("");
  const [isFetching, setisFetching] = useState(false);
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [isReady, setisReady] = useState(true);

  const textareaRef = useRef(null);
  const massagesRef = useRef(null);

  //state for voice recognization
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [isBrowserSupported, setIsBrowserSupported] = useState(true);


  const handelSubmitQuery = (e) => {
    e.preventDefault();
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
  };

  const handelAskAI = (e) => {
    if (e.key === "Enter" && !isFetching && !e.shiftKey) {
      e.preventDefault();
      handelSubmitQuery(e);
    }
    // Shift+Enter will naturally create a new line
  };

  //save chat question and answer to database
  const saveChat = async (question, answer) => {
    const data = await saveChatResponse(question, answer);
    console.log(data);
  };

  //function to get chat question-answer
  const getChatQueAns = async () => {
    const chats = await getChatInfo();
    setMessages(chats);

    console.log(chats);

    if (!chats || (chats && chats.length === 0)) {
      const res = await saveChatResponse(
        undefined,
        "How can i help you?"
      );
      if (res.error) {
        showToast(res.message, 1);
        return;
      }

      const newMessage = {
        question: undefined,
        answer: ["How can i help you?"],
        _id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);
    }

    setisChatInfoFetching(false);
  };

  const getAnswer = async (input) => {
    // const res = await getresponse(input);
    const res = await new Promise((res, rej) => {
      setTimeout(() => {
        res("demo reponse from ai model")
      }, 2000);
    });
    console.log(res);

    setanswer(res);
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 150; // Maximum height before scrolling
      const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;

      // Show scrollbar if content exceeds max height
      if (textareaRef.current.scrollHeight > maxHeight) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [input]);

  useEffect(() => {
    if (answer) {
      saveChat(
        question,
        answer
      );

      if (messages.length > 0 && messages[messages.length - 1].question) {
        const updatedMessage = messages
        updatedMessage[updatedMessage.length - 1].answer = `${answer}`
        setMessages(updatedMessage)
      }

      setquestion("");
      setanswer("");
      setisReady(true);
      setisFetching(false);
    }
  }, [answer]);

  useEffect(() => {
    if (question) {
      setisFetching(true);
      getAnswer(question);
    }
  }, [question]);

  useEffect(() => {
    if (massagesRef.current || isFetching) {
      massagesRef.current.scrollTop = massagesRef.current.scrollHeight;
    }
  }, [messages, isFetching]);

  useEffect(() => {
    getChatQueAns();
  }, []);

  // adding voice recognition
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      setIsBrowserSupported(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput((prev) => (prev + " " + finalTranscript).trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };

    return () => {
      if (recognition) recognition.stop();
    };
  }, []);

  const startListening = () => {
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  console.log(messages)

  if(isChatInfoFetching) return <ChatContentLoader />

  return (
    <>

      <div className="flex flex-col mx-auto h-full md:w-[60%] md:min-w-[600px] w-full max-w-[1500px]  ">
        {/* Messages Container */}
        <div ref={massagesRef} className="flex-1 overflow-y-auto p-4 space-y-4  ">

          {!isChatInfoFetching &&
            messages &&
            messages.map((message, ind) => {
              return (
                <div key={message._id} className="flex flex-col gap-4">
                  {/* User Message */}
                  {message.question && (
                    <div className="flex justify-end">
                      <div className="flex gap-3 max-w-[80%] flex-row-reverse">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100">
                          <User className="w-6 h-6 text-white bg-indigo-600 rounded-full p-1" />
                        </div>
                        <div className="px-4 py-2 w-full bg-indigo-600 text-white rounded-br-2xl rounded-l-2xl shadow-sm">
                          <p className="text-sm">{message.question}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bot Message */}
                  {message.answer && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%] flex-row">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-purple-100">
                          <Bot className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="px-4 py-2 w-full bg-gray-100 text-gray-800 rounded-bl-2xl rounded-r-2xl shadow">
                          <div className="text-sm">
                            <p>{message.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

          {/* Loading Message */}
          {!isChatInfoFetching && isFetching && (
            <div className="flex justify-start">
              <div className="flex gap-3 w-[80%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
                  <Bot className="w-6 h-6 text-indigo-600" />
                </div>
                {/* Message content */}
                <div className=" w-full">
                  <div className="bg-gray-200/80 rounded-xl px-2 py-3 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-500 p-4 ">
          <form onSubmit={handelSubmitQuery} className="max-w-4xl mx-auto">
            <div className="relative flex items-center rounded-xl border border-gray-300 bg-gray-200 ">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handelAskAI}
                placeholder="Type your message..."
                rows="1"
                className="w-full py-2 px-3 focus:outline-none text-black transition-colors placeholder-gray-600 resize-none"
                style={{
                  minHeight: "44px",
                  maxHeight: "150px",
                }}
              />
              <div className=" control-buttons w-[110px] flex justify-center gap-2 h-full">
                {isBrowserSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-1 cursor-pointer transition-colors outline-none ${isListening ? "text-red-500 hover:text-red-400" : "text-gray-600 hover:text-indigo-500"
                      }`}
                    disabled={!isReady}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
                <button
                  type="submit"
                  className={` p-1 text-gray-600 ${isReady ? "cursor-pointer" : "cursor-not-allowed"} hover:text-indigo-500 transition-colors disabled:cursor-not-allowed disabled:opacity-70`}
                  disabled={!isReady || !input.trim()}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>

  );
};

export default ChatWindow;
