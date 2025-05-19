import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const MobileMenu = ({setIsMenuOpen , menuRef}) => {
    return (
        <>
            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={` fixed top-0 translate-x-[110%] h-screen w-screen bg-gray-800/38 backdrop-blur-sm shadow-lg z-50 `}

            >
                <div className="px-10 pt-[50px] h-full">
                    <button
                        onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false);
                        }}
                        className=" absolute top-5 right-5 bg-gray-800/20 rounded-full p-2.5 border-[1px] border-gray-800/30 cursor-pointer focus:outline-none"
                    >
                        <X className='text-black font-bold w-7 h-7' />
                    </button>
                    <div className=' flex flex-col items-start gap-10 pt-[40px] text-xl font-semibold underline-offset-4 text-[#252222]'>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href={`/`} className="  relative nav-menu-mobile">
                            Home
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href='/judgments' className=" relative nav-menu-mobile">
                            Judgments
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link onClick={() => {
                            document.body.style.overflowY = "auto"
                            setIsMenuOpen(false)
                        }} href='/chat' className=" relative nav-menu-mobile">
                            Ai Assistant
                            <span className="absolute nav-menu-underline -bottom-1 left-0 w-full h-[1px] bg-red-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileMenu