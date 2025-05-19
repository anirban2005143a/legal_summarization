import React from 'react'
import { Scale } from 'lucide-react';
import Skeleton from './Skeleton';

const NavbarContentLoader = () => {
  return (
     <div className="w-full bg-[#faf7f2] border-b border-gray-200 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Scale className="h-8 w-8 text-gray-300" />
          <div className="flex flex-col">
            <Skeleton className="h-6 w-36 mb-1" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>

        {/* Nav Items */}
        <div className="hidden md:flex items-center space-x-8">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28" />
        </div>

        {/* Mobile Nav Placeholder */}
        <div className="md:hidden">
          <Skeleton className="h-6 w-6 rounded" />
        </div>
      </div>
    </div>
  )
}

export default NavbarContentLoader
