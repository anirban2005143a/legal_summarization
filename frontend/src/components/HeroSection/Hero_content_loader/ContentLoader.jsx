import React from 'react';
import { Skeleton } from '../../ui/Sckeleton';
import BackGround from '../BackGround';

export function HeroContentLoader() {
  return (
    <>
      <BackGround/>
      <div className="min-h-[100dvh] max-w-[1500px] mx-auto md:px-6 lg:px-6 pt-[90px] xl:pt-[120px]">
        <div className="flex md:flex-row flex-col md:gap-4 gap-15 justify-between items-start">
          <div className="md:w-[55%] px-5">
            <div className="mb-8">
              <Skeleton className="h-12 w-3/4 mb-3" />
              <Skeleton className="h-12 w-1/2" />
            </div>

            <Skeleton className="h-10 w-64 rounded-full mb-6" />

            <Skeleton className="h-3.5 w-full mb-2" />
            <Skeleton className="h-3.5 w-11/12 mb-2" />
            <Skeleton className="h-3.5 w-10/12 mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <Skeleton className="h-6 w-6 rounded-full flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <Skeleton className="h-3.5 w-40 mb-2" />
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
              <Skeleton className="h-12 md:w-48 w-full rounded-md" />
              <Skeleton className="h-12 md:w-48 w-full rounded-md" />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
              <Skeleton className="h-4 w-32 ml-4" />
            </div>
          </div>

          <div className=" md:w-[35%] md:min-w-[340px] md:max-w-[500px] xl:w-[40%] xl:max-w-[560px]">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#90521c] p-4 ">
                <div className="flex justify-between items-center">
                  <div className=' flex gap-2'>
                    <Skeleton className="h-4 w-4 delay-75 bg-white/50 rounded-full" />
                    <Skeleton className="h-4 w-4 delay-100 bg-white/50 rounded-full" />
                    <Skeleton className="h-4 w-4 delay-150 bg-white/50 rounded-full" />
                  </div>
                  <Skeleton className="h-3.5 w-40 bg-white/50" />
                </div>
              </div>

              <div className="md:p-6 py-6 px-3">
                <div className="flex justify-between mb-5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>

                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />

                <div className="flex items-center mb-5">
                  <Skeleton className="h-3.5 w-5 mr-2" />
                  <Skeleton className="h-3.5 w-32" />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-11/12 mb-2" />
                <Skeleton className="h-4 w-10/12 mb-2" />

                <div className="border-l-4 border-[#904a1c4e] rounded-l-md pl-4 py-2 mb-4">
                  <Skeleton className="h-4 w-11/12 mb-2" />
                  <Skeleton className="h-4 w-[80%] mb-2" />
                  <Skeleton className="h-4 w-[90%] mb-2" />
                  <Skeleton className="h-4 w-[85%] mb-2" />
                  <Skeleton className="h-4 w-11/12 " />
                </div>

                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-11/12 mb-2" />
                <Skeleton className="h-4 w-10/12 mb-8" />

                <div className="mb-4">
                  <Skeleton className="h-3.5 w-24 mb-4" />
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-3.5 w-3.5 rounded-full mr-2" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <div className="flex items-center">
                    <Skeleton className="h-3.5 w-3.5 rounded-full mr-2" />
                    <Skeleton className="h-4 w-72" />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <Skeleton className="h-5 w-16" />
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-4 rounded-full mr-2" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroContentLoader;
