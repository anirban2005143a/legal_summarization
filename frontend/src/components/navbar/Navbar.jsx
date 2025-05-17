"use client"

import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import NavLinks from './Navbar_links';
import MobileMenu from './Mobile_menu';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [path, setpath] = useState("/")
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

  useEffect(() => {
    console.log(pathname)
    setpath(pathname)
  }, [])



  return (
    <>
      <nav className={`fixed w-full ${path === "/" ? "bg-transparent" : "bg-orange-50"} z-30 transition-all backdrop-blur-xl duration-300 py-4 ${!isVisible ? ' -top-[100px]' : ' top-0 '
        }`}>
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Logo />
              </Link>
            </div>

            {/* Navigation Links - Desktop */}
            <NavLinks />

            {/* Mobile menu */}
            <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          </div>
        </div>
      </nav>


    </>
  );
};

export default Navbar;
