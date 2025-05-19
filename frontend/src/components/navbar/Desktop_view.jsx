import React, { useEffect, useRef, useState } from 'react'
import NavLinks from './Navbar_links'

const DesktopView = ({ LogoComponent }) => {

    return (
        <div className="md:block hidden max-w-[1500px] backdrop-blur-3xl py-3 mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between ">
                {/* logo component  */}
                {LogoComponent}

                {/* Navigation Links - Desktop */}
                <NavLinks />

            </div>
        </div>
    )
}

export default DesktopView