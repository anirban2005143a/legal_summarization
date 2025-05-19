import React from 'react';

export const DocumentLoader = ({ className }) => {

    return (
        [1, 2, 3, 4, 5].map(() => {

            return (<div className={`w-full my-5 rounded-lg bg-white md:p-6 p-3 shadow-lg border-[1px] border-gray-500/20 ${className || ''}`}>
                {/* Title skeleton */}
                <div className="mb-4 space-y-2">
                    <div className="h-7 w-1/3 animate-pulse rounded bg-gray-200" />
                    <div className="h-7 w-1/4 animate-pulse rounded bg-gray-200" />
                </div>

                {/* Content skeleton */}
                <div className="mb-6 space-y-2">
                    <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-[95%] animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-[90%] animate-pulse rounded bg-gray-200" />
                </div>

                {/* Action buttons skeleton */}
                <div className="flex items-center gap-4">
                    <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
                    <div className="h-9 w-32 animate-pulse rounded-md bg-gray-200" />
                    <div className="flex-1" />
                    <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
                    <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200" />
                </div>
            </div>)
        })

    );
};