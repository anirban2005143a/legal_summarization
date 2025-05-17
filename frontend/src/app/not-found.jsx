
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-50 to-white px-2 sm:px-6">
      <div 
        className={cn(
          "max-w-md w-full rounded-2xl bg-white md:p-8 p-4 sm:p-10 shadow-xl transition-all duration-700 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-red-100 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-2">
              <AlertCircle className="h-12 w-12 text-red-600" />
            </div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-red-600 text-center tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-medium text-gray-900 text-center mb-4">Page Not Found</h2>
        
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-red-200 to-transparent mb-6"></div>
        
        <p className="text-gray-600 text-center mb-8">
          We couldn't find the page you're looking for. It might have been moved, 
          deleted, or perhaps never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            Go Back
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "mt-8 text-sm text-gray-500 transition-all duration-700",
          isVisible ? "opacity-80" : "opacity-0"
        )}
        style={{ transitionDelay: '400ms' }}
      >
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </div>
  );
}