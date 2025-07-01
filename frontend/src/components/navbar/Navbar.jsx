"use client";

import { NAVIGATION_LINKS } from "./navigationLinks";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "../Logo/Logo";

const LogoComponent = () => {
  {
    /* Logo */
  }
  return (
    <div className="flex-shrink-0">
      <Link href="/" className="block">
        <Logo />
      </Link>
    </div>
  );
};

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.2, ease: "linear" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  backdrop-blur-md">
        <nav className="flex justify-between h-16 items-center ">
          {/* Logo */}
          <LogoComponent />

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* Mobile Menu Button */}
          <Mobile_menu_button
            setMobileMenuOpen={setMobileMenuOpen}
            mobileMenuOpen={mobileMenuOpen}
          />

          {/* Mobile Navigation */}
          <MobileMenu
            setMobileMenuOpen={setMobileMenuOpen}
            mobileMenuOpen={mobileMenuOpen}
          />
        </nav>
      </div>
    </motion.header>
  );
};

const DesktopMenu = ({}) => {
  return (
    <>
      <div className={` md:flex hidden  items-center`}>
        {NAVIGATION_LINKS.map((link, index) => (
          <NavLink
            key={index}
            label={link.name}
            href={link.href}
            className={"text-sm"}
          />
        ))}
      </div>
    </>
  );
};

const NavLink = ({ label, href, className }) => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <Link
      tabIndex={0}
      href={href}
      className={`px-3 py-2 text-gray-700 font-medium transition-colors duration-200 flex items-center ${className}`}
    >
      <span
        className=" relative"
        onMouseMove={() => {
          setisHovered(true);
        }}
        onMouseLeave={() => {
          setisHovered(false);
        }}
      >
        {label}
        <span
          className={`absolute nav-menu-underline -bottom-1 left-0 ${
            isHovered ? "w-full" : "w-0"
          } h-[2px] bg-gradient-to-r from-amber-800 to-amber-700 group-hover:w-full transition-all duration-300`}
        ></span>
      </span>
    </Link>
  );
};

const MobileMenu = ({ setMobileMenuOpen, mobileMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = `${mobileMenuOpen ? "hidden" : "auto"}`;
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`md:hidden fixed top-0 right-0 h-[100dvh] overflow-auto w-screen max-w-md bg-[#000000b8] backdrop-blur-sm shadow-lg z-50`}
          >
            <div className="px-10 pt-10 h-full">
              <button
                aria-label="close navbar menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white mb-3 cursor-pointer focus:outline-none p-2 bg-white/5 rounded-full"
              >
                <X className=" w-5 h-5" />
              </button>

              <div className="flex flex-col items-start gap-10 py-[20px] text-white ">
                {NAVIGATION_LINKS.map((link, index) => (
                  <Link
                    tabIndex={0}
                    key={index}
                    onClick={() => setMobileMenuOpen(false)}
                    href={link.href}
                    className="hover:underline nav-menu-mobile text-base ml-2"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Mobile_menu_button = ({setMobileMenuOpen  ,mobileMenuOpen}) => {
    return (
        <>
            <div className={`md:hidden`}>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={` rounded-md text-gray-800 hover:bg-gray-100 hover:text-gray-500 transition`}
                    aria-label="Toggle Menu"
                >
                    <Menu size={24} />
                </button>
            </div>
        </>
    )
}