"use client"

import gsap from 'gsap';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

const MobileMenu = ({ isOpen, setIsOpen }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);


  // GSAP animation for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      // Slide in the menu from the right
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5 }
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
          duration: 0.5,
          stagger: 0.2,
          delay: 0.2,
        }
      );
    } else {
      // Slide out the menu to the right
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [isMenuOpen]);


  return (
    <>
      {/* Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => {
          // console.log(menuRef.current)
          setIsMenuOpen(!isMenuOpen);
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

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`${isMenuOpen ? "" : "hidden "
          } md:hidden fixed top-0 right-0 h-screen w-screen  bg-[#00000084] backdrop-blur-sm shadow-lg `}
      >
        <div className="px-10 pt-[50px] h-full">
          <button
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className="text-white cursor-pointer focus:outline-none"
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className=' flex flex-col items-start gap-10  pt-[20px] text-white'>
            <Link onClick={() => {
              setIsMenuOpen(false)
            }} href={`/`} className="text-white hover:underline hover:underline-offset-4  nav-menu-mobile">
              Home
            </Link>
            <Link onClick={() => {
              setIsMenuOpen(false)
            }} href='/cases' className="text-white hover:underline hover:underline-offset-4  nav-menu-mobile">
              Cases
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
