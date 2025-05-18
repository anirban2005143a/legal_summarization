import React from 'react';
import { Skeleton } from './Sckeleton';

export function HeroContentLoader() {
  return (
    <div className="w-full min-h-screen bg-[#f8f5f2] p-6 lg:p-12 ">
      <div className="max-w-[1500px] mx-auto pt-[60px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-8">
              <Skeleton className="h-12 w-3/4 mb-3" />
              <Skeleton className="h-12 w-1/2" />
            </div>

            <Skeleton className="h-10 w-64 rounded-full mb-6" />

            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-11/12 mb-2" />
            <Skeleton className="h-5 w-10/12 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="h-6 w-6 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-4 w-64 mb-4" />

            <div className="flex items-center mb-10">
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-24 ml-2 rounded-md" />
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <Skeleton className="h-12 w-48 rounded-md" />
              <Skeleton className="h-12 w-48 rounded-md" />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#901C1C] p-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-4 bg-white/20 rounded-full" />
                  <Skeleton className="h-5 w-40 bg-white/20" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between mb-5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />

                <div className="flex items-center mb-5">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-5 w-32" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-11/12 mb-2" />
                <Skeleton className="h-4 w-10/12 mb-8" />

                <div className="border-l-4 border-[#901C1C]/20 pl-4 mb-8">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-11/12 mb-2" />
                  <Skeleton className="h-4 w-10/12 mb-2" />
                  <Skeleton className="h-4 w-1/3 mt-3" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-11/12 mb-2" />
                <Skeleton className="h-4 w-10/12 mb-8" />

                <div className="mb-4">
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-5 w-5 rounded-full mr-2" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-2" />
                    <Skeleton className="h-4 w-72" />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <Skeleton className="h-4 w-16" />
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-md mr-2" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroContentLoader;
