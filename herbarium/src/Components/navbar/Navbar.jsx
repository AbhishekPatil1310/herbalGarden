import React from 'react';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import AiIcon from './AiIcon';
import LogoutButton from '../authentication/LogOutButton';
import '../../Style/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <nav className="navbar">
      <div className="nav-items">
        <NavItem to="/home" label="Home" />
        <NavItem to="/world" label="Garden" />
        <NavItem to="/about" label="About" />
        <NavItem to="/quiz" label="Quiz" />
        <LogoutButton />
      </div>
      {!isHomePage && <AiIcon />}
    </nav>
  );
};

export default Navbar;
