import React from 'react';

export const NavbarContentLoader = () => {
  return (
    <nav className="bg-[#F8F4F1] fixed top-0 left-0 w-full md:px-6 sm:px-4 px-2 py-4 z-50 ">
      <div className='max-w-[1500px] mx-auto w-full flex items-center justify-between'>

        {/* Logo and Company Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 md:w-32 w-20 bg-gray-300 rounded animate-pulse" />
            <div className="h-3 md:w-48 w-30 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <div className="h-4 md:block hidden w-16 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 md:block hidden w-24 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 md:block hidden w-20 bg-gray-300 rounded animate-pulse" />
          <div className="md:h-4 h-8 md:w-24 w-8 bg-gray-300 rounded animate-pulse  " />
        </div>
      </div>
    </nav>
  );
};

