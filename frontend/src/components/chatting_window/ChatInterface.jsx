"use client"
import React, { useEffect, useRef, useState } from 'react';
import ChatWindow from './Chatwindow';
import Navbar from '../navbar/Navbar';
import { ToastContainer } from 'react-toastify';

const ChatInterface = () => {


  return (
    <>
      <div id='chatInterface' className=' relative h-full '>
        <Navbar />
        <ToastContainer/>
        {/* chat window  */}
        <div className="workSpace pt-[55px] h-full ">
          <ChatWindow />
        </div>
      </div>
    </>
  )
};

export default ChatInterface;

