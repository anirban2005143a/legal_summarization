"use client"
import Link from "next/link";
import { useState } from "react"

export const NavLink = ({ label, href,className }) => {
    const [isHovered, setisHovered] = useState(false)
    return (
        <Link
            tabIndex={0}
            href={href}
            className={`px-3 py-2 text-gray-700 font-medium transition-colors duration-200 flex items-center ${className}`}
        >
            <span className=' relative'
                onMouseMove={() => { setisHovered(true) }}
                onMouseLeave={() => { setisHovered(false) }}
            >
                {label}
                <span className={`absolute nav-menu-underline -bottom-1 left-0 ${isHovered ? "w-full" : "w-0"} h-[2px] bg-gradient-to-r from-amber-800 to-amber-700 group-hover:w-full transition-all duration-300`}></span>
            </span>
        </Link>
    );
};