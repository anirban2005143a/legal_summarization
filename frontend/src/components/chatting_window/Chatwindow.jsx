"use client"

import React, { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2, MicOff, Mic } from "lucide-react";
import { saveChatResponse } from "./functions/saveChat";
import { getChatInfo } from "./functions/getChatInfo";
import { v4 as uuidv4 } from "uuid";
import ChatContentLoader from "./ChatContentLoader";
import TextAreaForQuery from "./TextAreaForQuery";

const ChatWindow = ({ }) => {

  const [messages, setMessages] = useState([]);
  const [isChatInfoFetching, setisChatInfoFetching] = useState(true)
  const [isFetching, setisFetching] = useState(false);
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");

  const [isReady, setisReady] = useState(true);

  const massagesRef = useRef(null);


  const handelSubmitQuery = (input ,setInput) => {
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
    setInput("")
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

  console.log(messages)

  if (isChatInfoFetching) return <ChatContentLoader />

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

        <TextAreaForQuery
          isReady={isReady}
          isFetching={isFetching}
          handelSubmitQuery={handelSubmitQuery} />

      </div>
    </>

  );
};

export default ChatWindow;
