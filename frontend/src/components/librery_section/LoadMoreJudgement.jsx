import React, { useCallback } from 'react';
import { ChevronDown, Loader } from 'lucide-react';

const LoadMoreButton = ({ isLoading = false }) => {

    const handelClick = useCallback(
        () => {

        },
        [],
    )

    return (
        <div className="flex justify-center my-10 px-4">
            <button
                aria-label='load more button'
                onClick={handelClick}
                disabled={isLoading}
                className={`
          relative overflow-hidden
          flex items-center justify-center 
          px-8 py-3.5 rounded-lg
          text-base font-medium tracking-wide
          bg-white border border-gray-200
          shadow-xs hover:shadow-sm
          text-gray-700 hover:text-gray-900
          transition-all duration-300
          group
          ${isLoading ? 'cursor-wait' : 'cursor-pointer hover:border-amber-100'}
        `}
            >
                {/* Animated background (appears on hover) */}
                <span className="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-white/30 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                {/* Loading spinner */}
                {isLoading ? (
                    <div className="flex items-center gap-2.5">
                        <Loader className="h-5 w-5 animate-spin text-amber-700" />
                        <span className="text-gray-600">Loading Cases...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5">
                        <span>Show More Cases</span>
                        <ChevronDown className={`h-5 w-5 text-amber-700 transition-transform duration-300 
                                    ${isLoading ? 'opacity-0' : 'group-hover:translate-y-0.5'}`} />
                    </div>
                )}

                {/* Animated border bottom (appears on hover) */}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-700 
                        group-hover:w-4/5 group-hover:left-[10%] 
                        transition-all duration-300" />
            </button>
        </div>
    );
};

export default LoadMoreButton;