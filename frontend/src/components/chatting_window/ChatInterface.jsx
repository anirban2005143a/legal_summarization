"use client"
import React, { useEffect, useRef, useState } from 'react';
import ChatWindow from './Chatwindow';
import Navbar from '../navbar/Navbar';

const ChatInterface = () => {


  return (
    <>
      <div id='chatInterface' className=' relative h-full '>
        <Navbar />

        {/* chat window  */}
        <div className="workSpace pt-[80px] h-screen ">
          <ChatWindow />
        </div>
      </div>
    </>
  )
};

export default ChatInterface;

