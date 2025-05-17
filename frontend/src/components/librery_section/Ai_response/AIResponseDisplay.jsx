import React from 'react';
import { Bot } from 'lucide-react';

const AIResponseDisplay = ({ output, isLoading }) => {
  return (
    <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-auto border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-blue-600" />
        <h3 className="text-sm uppercase text-gray-600 font-medium">AI Response</h3>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ) : output ? (
        <div className="prose max-w-none">
          {output.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-800 mb-2 whitespace-pre-wrap">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">AI response will appear here...</p>
      )}
    </div>
  );
};

export default AIResponseDisplay;
