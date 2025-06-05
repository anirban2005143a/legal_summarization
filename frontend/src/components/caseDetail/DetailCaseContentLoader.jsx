import React from 'react';

const DetailCaseCardContentLoader = () => {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200 animate-pulse mt-[80px]">
      {/* Header Section */}
      <div className="bg-gray-300 text-white px-6 py-5">
        <div className="h-8 w-3/4 bg-gray-400 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-400 rounded"></div>
      </div>

      {/* Main Content Section */}
      <div className="px-6 py-5">
        {/* Section Title */}
        <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
        
        {/* Section Content */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          <div className="h-4 w-3/5 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>

        {/* Show More Button */}
        <div className="mt-4 h-4 w-24 bg-gray-300 rounded"></div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200"></div>

        {/* Ask AI Section */}
        <div className="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>

        {/* Document Info Section */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div>
            <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* References Section */}
        <div className="mt-6">
          <div className="h-5 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
        </div>

        {/* Coverage Section */}
        <div className="mt-6">
          <div className="h-5 w-1/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200"></div>

        {/* Related Queries Section */}
        <div className="h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-6 py-4 border-t border-gray-300">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default DetailCaseCardContentLoader;