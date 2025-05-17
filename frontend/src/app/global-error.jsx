'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-8 text-center text-white">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <AlertTriangle className="h-10 w-10 animate-pulse text-white" />
              </div>
              <h1 className="mb-2 text-4xl font-bold">500</h1>
              <p className="text-lg font-medium text-red-100">System Error</p>
            </div>
            
            <div className="px-6 py-8">
              <h2 className="mb-4 text-xl font-semibold text-red-700">Something went wrong</h2>
              <p className="mb-6 text-gray-600">
                {error?.message || 'An unexpected error occurred. Our team has been notified.'}
              </p>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <button 
                  onClick={() => reset()}
                  className="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Return Home
                </button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
              <p className="text-center text-sm text-gray-500">
                If this problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}