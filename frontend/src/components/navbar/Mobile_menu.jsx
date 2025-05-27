import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const MobileMenu = ({ setIsMenuOpen, menuRef }) => {
    return (
        <>
            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={` fixed top-0 translate-x-[150%] h-screen w-screen bg-[#000000c2] backdrop-blur-sm shadow-lg z-50 `}

            >
                <div className="px-10 pt-[50px] h-full">
                    <button
                        onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false);
                        }}
                        className=" absolute top-5 right-5 bg-gray-400/20 rounded-full p-2.5   cursor-pointer focus:outline-none"
                    >
                        <X className='text-white font-bold w-7 h-7' />
                    </button>
                    <div className=' flex flex-col items-start gap-10 pt-[40px] text-xl font-light underline-offset-4 text-[#c1c0c0]'>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href={`/`} className="  relative nav-menu-mobile">
                            Home
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[2px] bg-amber-700 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href='/judgments' className=" relative nav-menu-mobile">
                            Judgments
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[2px] bg-amber-700 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href='/chat' className=" relative nav-menu-mobile">
                            Ai Assistant
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[2px] bg-amber-700 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileMenu