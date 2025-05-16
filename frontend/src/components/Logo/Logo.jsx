"use client"

import React from 'react';
import { Scale } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Scale className="h-6 w-6 text-maroon-700" />
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-tight text-maroon-800">LegalSummarize</span>
        <span className="text-xs text-gray-600">India's Premier Legal Document Service</span>
      </div>
    </div>
  );
};

export default Logo;
