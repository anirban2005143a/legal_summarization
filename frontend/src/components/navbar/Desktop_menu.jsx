import { NAVIGATION_LINKS } from './navigationLinks'
import {NavLink} from './NavLink'

const DesktopMenu = ({ }) => {
    return (
        <>
           <div className={` md:flex hidden  items-center`}>
                {NAVIGATION_LINKS.map((link, index) => (
                    <NavLink key={index} label={link.name} href={link.href} className={"text-sm"} />
                ))}
              
            </div>
        </>
    )
}

export default DesktopMenu