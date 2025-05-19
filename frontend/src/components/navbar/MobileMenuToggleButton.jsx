"use client"

import React, { useRef } from 'react'

const MobileMenuToggleButton = ({setIsMenuOpen}) => {
    
  const toggleButtonRef = useRef(null);
    return (
        <>
            {/* Toggle Button */}
            <button
                ref={toggleButtonRef}
                onClick={() => {
                    // console.log(menuRef.current)
                    document.body.style.overflowY = "hidden"
                    // if(isMenuOpen) document.body.style.overflowY = "auto"
                    setIsMenuOpen(true);
                }}
                className="text-black cursor-pointer focus:outline-none"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
        </>
    )
}

export default MobileMenuToggleButton