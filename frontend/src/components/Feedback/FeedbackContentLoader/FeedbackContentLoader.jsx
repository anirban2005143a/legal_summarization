"use client"

import React from 'react';

export default function FeedbackContentLoader() {
  return (
    <div className="pt-[85px] md:w-[60%] md:min-w-[600px] max-w-[1000px] mx-auto py-12 md:py-24 px-3 rounded-lg  animate-pulse">
      {/* Header */}
      <div className="mb-6">
        <div className="h-7 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Title */}
      <div className="h-5 w-1/2 bg-gray-200 rounded mb-6"></div>

      {/* Feedback Type */}
      <div className="mb-6">
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-3"></div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-10 bg-gray-100 rounded-lg"></div>
      </div>

      {/* Feedback Textarea */}
      <div className="mb-6">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-32 bg-gray-100 rounded-lg"></div>
      </div>

      {/* Submit Button */}
      <div className="h-10 w-full bg-gray-200 rounded-lg mb-6"></div>

      {/* Footer */}
      <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto"></div>
    </div>
  );
}