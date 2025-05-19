"use client"

import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import MobileMenu from './Mobile_menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Desktop_view from './Desktop_view';

const LogoComponent = () => {
  {/* Logo */ }
  return (<div className="flex-shrink-0">
    <Link href="/" className="block">
      <Logo />
    </Link>
  </div>)
}


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname()

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <nav className={`fixed w-full ${pathname === "/" ? "bg-transparent" : "bg-orange-50"} z-30 transition-all  duration-300 ${!isVisible ? ' -top-[100px]' : ' top-0 '
        }`}>
        {/* Navigation Links - Desktop */}
        <Desktop_view LogoComponent={<LogoComponent />}  />
        {/* Mobile menu */}
        <MobileMenu LogoComponent={<LogoComponent />} />
      </nav>

    </>
  );
};

export default Navbar;
