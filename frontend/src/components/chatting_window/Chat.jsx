"use client";
import React from "react";
import { Navbar } from "../navbar/Navbar";
import { ToastContainer } from "react-toastify";
import ChatWindow from "./Chatwindow";
import { BackGround } from "../Background/BackGround";

export const Chat = () => {
  return (
    <>
      <BackGround />
      <div className="app h-[100dvh]  overflow-hidden">
        <div id="chatInterface" className=" relative h-full ">
          <Navbar />
          <ToastContainer />
          {/* chat window  */}
          <div className="workSpace pt-[55px] h-full ">
            <ChatWindow />
          </div>
        </div>
      </div>
    </>
  );
}