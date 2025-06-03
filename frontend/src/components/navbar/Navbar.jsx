"use client"

import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './Mobile_menu';
import Mobile_menu_button from './Mobile_menu_button';
import DesktopMenu from './Desktop_menu';
import {motion} from "framer-motion"

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.2, ease: "linear" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  backdrop-blur-md">
        <nav className="flex justify-between h-16 items-center">
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* Mobile Menu Button */}
          <Mobile_menu_button setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />

          {/* Mobile Navigation */}
          <MobileMenu setMobileMenuOpen={setMobileMenuOpen} mobileMenuOpen={mobileMenuOpen} />
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
