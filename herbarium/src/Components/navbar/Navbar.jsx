import React from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import AiIcon from './AiIcon';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <NavItem to="/home" label="Home" />
        <NavItem to="/world" label="Garden" />
        <NavItem to="/about" label="About" />
      </div>
      {!isHomePage && <AiIcon />}
    </nav>
  );
};

export default Navbar;
