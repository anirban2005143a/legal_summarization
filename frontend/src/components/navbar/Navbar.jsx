"use client"

import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import NavLinks from './Navbar_links';
import MobileMenu from './Mobile_menu';
import { Search, Menu } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full z-30 transition-all duration-300   ${
        isScrolled ? ' shadow-md py-2' : ' py-4'
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

            {/* Right side elements */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search toggle - Desktop */}
              <button 
                className="hidden md:flex items-center text-gray-700 hover:text-maroon-700"
                // onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </button>
              
              
              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Search bar - Expanded */}
          {/* <div className={`mt-3 transition-all duration-300 ${isSearchOpen ? 'h-12 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search case law, judgments, or legal documents..."
                className="w-full py-2 pl-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-maroon-700">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div> */}
        </div>
      </header>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
 
    </>
  );
};

export default Navbar;
