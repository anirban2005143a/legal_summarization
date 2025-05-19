"use client"
import React from 'react';
import ChatInterface from './ChatInterface';
import BackGround from './BackGround';

function Chat() {

  return (
    <>
      <BackGround />
      <div className="app w-screen h-screen  overflow-hidden">
        <ChatInterface />
      </div>
    </>
  );
}

export default Chat;