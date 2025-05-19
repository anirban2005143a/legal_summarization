import React from 'react';

const NavbarContentLoader= () => {
  return (
    <nav className="bg-[#F8F4F1] px-6 py-4 flex items-center justify-between">
      {/* Logo and Company Name */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-3 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
        <div className="h-4 w-24 bg-gray-300 rounded animate-pulse ml-4" />
      </div>
    </nav>
  );
};

export default NavbarContentLoader;