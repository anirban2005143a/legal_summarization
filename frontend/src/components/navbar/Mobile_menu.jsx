"use client"

import React from 'react';

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed inset-0 z-50 md:hidden ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Menu panel */}
      <div className={`absolute top-0 right-0 w-3/4 max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-bold text-maroon-800">Menu</span>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-2">
            <ul className="space-y-1">
              <li>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md">
                  About
                </a>
              </li>
              <li>
                <div className="px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md cursor-pointer">
                  Services
                  <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Document Analysis</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Legal Research</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Case Summaries</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md cursor-pointer">
                  Courts & Judgments
                  <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Supreme Court</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">High Courts</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">District Courts</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Tribunals</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md cursor-pointer">
                  Resources
                  <div className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1">
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Articles</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Guides</a>
                    <a href="#" className="block py-2 text-gray-600 hover:text-maroon-700">Webinars</a>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-maroon-50 hover:text-maroon-700 rounded-md">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="px-6 py-4 border-t">
            <div className="flex flex-col space-y-3">
              <button className="w-full py-2 px-4 border border-maroon-700 text-maroon-700 rounded-md hover:bg-maroon-50 transition-colors duration-200">
                Sign In
              </button>
              <button className="w-full py-2 px-4 bg-maroon-700 text-white rounded-md hover:bg-maroon-800 transition-colors duration-200">
                Free Trial
              </button>
              <div className="flex justify-center mt-4">
                <select className="text-sm text-gray-600 border rounded-md px-2 py-1">
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="bn">বাংলা</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
