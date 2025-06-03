import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import {useEffect} from 'react'
import { NAVIGATION_LINKS } from './navigationLinks';

const MobileMenu = ({ setMobileMenuOpen, mobileMenuOpen }) => {
    
    useEffect(() => {
        document.body.style.overflow = `${mobileMenuOpen ? "hidden" : "auto"}`
    }, [mobileMenuOpen])

    return (
        <>
            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobileMenu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className={`md:hidden fixed top-0 right-0 h-[100dvh] overflow-auto w-screen max-w-md bg-[#000000b8] backdrop-blur-sm shadow-lg z-50`}
                    >
                        <div className="px-10 pt-5 h-full">
                            <button
                                aria-label='close navbar menu'
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white cursor-pointer focus:outline-none p-2 bg-white/5 rounded-full"
                            >
                                <X width={5} height={5} />
                            </button>

                            <div className="flex flex-col items-start gap-10 py-[20px] text-white">

                                {NAVIGATION_LINKS.map((link, index) => (
                                    <Link
                                        tabIndex={0}
                                        key={index}
                                        onClick={() => setMobileMenuOpen(false)}
                                        href={link.href}
                                        className="hover:underline nav-menu-mobile text-sm ml-2">{link.name}</Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default MobileMenu