"use client"
import React from 'react';
import ChatInterface from './ChatInterface';

function Chat() {

  return (
    <>
      <div className="app w-screen h-screen bg-gray-950 overflow-hidden">
        <ChatInterface />
      </div>
    </>
  );
}

export default Chat;