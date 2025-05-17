// app/components/NavbarWrapper.jsx
'use client';

import Navbar from '@/components/navbar/Navbar';
import { usePathname } from 'next/navigation';

export default function NavbarWrapper({ children }) {
  const pathname = usePathname();
  console.log(pathname)

  // Define pages where you don't want to show the Navbar
  const hideNavbarOn = ['/not-found', '/error'];
  const shouldShowNavbar = !hideNavbarOn.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}
