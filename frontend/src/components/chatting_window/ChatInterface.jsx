"use client"
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './Chatwindow';
import Navbar from '../navbar/Navbar';

const ChatInterface = () => {

  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 700 ? true : false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isChatInfoFetching, setisChatInfoFetching] = useState(true)
  const [chatCount, setchatCount] = useState(0)
  const [width, setwidth] = useState(window.innerWidth)

  const mainRef = useRef(null);

  // console.log(selectedChat)

  useEffect(() => {
    const changeWidth = () => {
      setwidth(window.innerWidth)
    }
    window.addEventListener("resize", changeWidth)
    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  }, [])


  return (
    <>
      <div id='chatInterface' className=' relative h-full '>
        <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />


        {/* Main content area */}
        <div className="workSpace pt-[80px] h-full">
          <div className="sm:flex sm:flex-row h-full">
            {/* navigation panel  */}
            <Sidebar
              isNavOpen={isNavOpen}
              setisChatInfoFetching={setisChatInfoFetching}
              setSelectedChatId={setSelectedChatId}
              selectedChatId={selectedChatId}
              setchatCount={setchatCount}
              width={width}
            />
            {/* chat window  */}
            <div
              ref={mainRef}
              className="h-full transition-all duration-150"
              style={{ width: width >= 768 ? isNavOpen ? "100%" : "100%" : "100%" }}
            >
              <ChatWindow
                isChatInfoFetching={isChatInfoFetching}
                setisChatInfoFetching={setisChatInfoFetching}
                setSelectedChatId={setSelectedChatId}
                selectedChatId={selectedChatId}
                chatCount={chatCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ChatInterface;

