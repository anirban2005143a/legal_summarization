import React from 'react'
import NavLinks from './Navbar_links'

const Desktop_view = ({ LogoComponent }) => {

    return (
        <div className="md:block hidden max-w-[1500px] backdrop-blur-3xl py-4 mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-between ">
                {/* logo component  */}
                {LogoComponent}

                {/* Navigation Links - Desktop */}
                <NavLinks />

            </div>
        </div>
    )
}

export default Desktop_view