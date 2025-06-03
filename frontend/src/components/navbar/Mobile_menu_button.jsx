import { Menu } from 'lucide-react'

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

export default Mobile_menu_button