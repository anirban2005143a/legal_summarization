import { Bot, User } from 'lucide-react';
import React from 'react';

const ChatContentLoader = ({ messageCount = 5 }) => {
  return (
    <div className="flex flex-col pt-[80px] justify-between md:w-[60%] md:min-w-[600px] w-full max-w-[1500px] mx-auto h-[100dvh]">
      {/* Messages area */}
      <div className="overflow-y-auto p-4 space-y-6">
        {Array.from({ length: messageCount }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Bot message loader */}
            {index % 2 === 0 && <BotMessageLoader />}

            {/* User message loader */}
            {index % 2 === 1 && <UserMessageLoader />}
          </React.Fragment>
        ))}
      </div>

      {/* Input area loader */}
      <InputLoader />
    </div>
  );
};

const BotMessageLoader = () => {
  return (
    <div className="flex items-start space-x-3">
      {/* Bot avatar */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-purple-100">
        <Bot className="w-6 h-6 text-indigo-600" />
      </div>

      {/* Message content */}
      <div className="flex-1 max-w-md">
        <div className="bg-gray-200/80 rounded-2xl p-4 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const UserMessageLoader = () => {
  const randomWidth = `${30 + Math.floor(Math.random() * 40)}%`;

  return (
    <div className="flex items-start justify-end space-x-3">
      {/* Message content */}
      <div className="flex-1 max-w-md flex justify-end">
        <div className="bg-gray-200/80 rounded-2xl p-4 animate-pulse" style={{ width: randomWidth }}>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      {/* User avatar */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-indigo-100">
        <User className="w-6 h-6 text-white bg-indigo-600 rounded-full p-1" />
      </div>
    </div>
  );
};

const InputLoader = () => {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center bg-gray-100 rounded-full p-3 animate-pulse">
        <div className="h-6 bg-gray-300 rounded-full flex-1"></div>
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2"></div>
      </div>
    </div>
  );
};

export default ChatContentLoader;
