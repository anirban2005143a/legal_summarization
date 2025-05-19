"use client"


import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import MobileMenuToggleButton from './MobileMenuToggleButton';
import MobileMenu from './Mobile_menu';

const MobileView = ({ LogoComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);


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

        {/* mobile menu toggle button  */}
        <MobileMenuToggleButton setIsMenuOpen={setIsMenuOpen} />
      </div>

      {/* mobile menu */}
      <MobileMenu setIsMenuOpen={setIsMenuOpen} menuRef={menuRef} />
    </>
  );
};

export default MobileView;
