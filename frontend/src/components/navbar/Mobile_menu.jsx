"use client"


import gsap from 'gsap';
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const MobileMenu = ({ LogoComponent, ChatNavigationButton }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);


  // GSAP animation for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Slide in the menu from the right
      gsap.to(
        menuRef.current,
        // { x: "100%", opacity: 0 },
        {
          x: "0%", opacity: 1, duration: 0.5,
        }
      );

      gsap.fromTo(
        document.querySelectorAll(".nav-menu-mobile"),
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.2,
          stagger: 0.2,
          delay: 0.3,
        }
      );
    } else {
      // Slide out the menu to the right
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [isMenuOpen]);


  return (
    <>
      <div className='md:hidden px-3 py-3 flex justify-between items-center backdrop-blur-xl'>
        {/* logo component  */}
        {LogoComponent}
      

        {/* Toggle Button */}
        <button
          ref={toggleButtonRef}
          onClick={() => {
            // console.log(menuRef.current)
            document.body.style.overflowY = "hidden"
            // if(isMenuOpen) document.body.style.overflowY = "auto"
            setIsMenuOpen(true);
          }}
          className="text-black md:hidden cursor-pointer focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={` md:hidden fixed top-0 translate-x-[110%] h-screen w-screen bg-gray-800/20 backdrop-blur-sm shadow-lg z-50 `}

      >
        <div className="px-10 pt-[50px] h-full">
          <button
            onClick={() => {
              document.body.style.overflowY = "auto"
              setIsMenuOpen(false);
            }}
            className=" absolute top-5 right-5 bg-gray-800/20 rounded-full p-2.5 border-[1px] border-gray-800/30 cursor-pointer focus:outline-none"
          >
            <X className='text-black font-bold w-7 h-7' />
          </button>
          <div className=' flex flex-col items-start gap-10 pt-[40px] text-xl font-semibold underline-offset-4 text-[#000000]'>
            <Link onClick={() => {
              document.body.style.overflowY = "auto"
              setIsMenuOpen(false)
            }} href={`/`} className="  relative nav-menu-mobile">
              Home
              <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link onClick={() => {
              document.body.style.overflowY = "auto"
              setIsMenuOpen(false)
            }} href='/judgments' className=" relative nav-menu-mobile">
              Judgments
              <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link onClick={() => {
              document.body.style.overflowY = "auto"
              setIsMenuOpen(false)
            }} href='/chat/123' className=" relative nav-menu-mobile">
              Ai Assistant
              <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
