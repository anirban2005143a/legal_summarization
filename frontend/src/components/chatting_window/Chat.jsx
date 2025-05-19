"use client"
import React from 'react';
import ChatInterface from './ChatInterface';
import BackGround from './BackGround';

function Chat() {

  return (
    <>
      <BackGround />
      <div className="app h-[100dvh]  overflow-hidden">
        <ChatInterface />
      </div>
    </>
  );
}

export default Chat;