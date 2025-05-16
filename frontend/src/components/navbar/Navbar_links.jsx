"use client"
import Link from 'next/link';
import React from 'react';

const NavItem = ({ href, label, hasDropdown = false }) => {
  return (
    <li className="relative group">
      <Link 
        href={href}
        className="px-3 py-2 text-gray-700 hover:text-maroon-700 font-medium transition-colors duration-200 flex items-center"
      >
        {label}
        {hasDropdown && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform duration-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>
      
      {hasDropdown && (
        <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
          <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700">
            Supreme Court
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700">
            High Courts
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700">
            District Courts
          </Link>
          <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700">
            Tribunals
          </Link>
        </div>
      )}
    </li>
  );
};

const NavLinks = () => {
  return (
    <ul className="hidden md:flex items-center space-x-1 text-sm ">
      <NavItem href="/" label="Home" />
      <NavItem href="/cases/all" label="Cases" />
      <NavItem href="#" label="Services" hasDropdown />
      <NavItem href="#" label="Courts & Judgments" hasDropdown />
      <NavItem href="#" label="Resources" hasDropdown />
      <NavItem href="#" label="Contact" />
    </ul>
  );
};

export default NavLinks;
