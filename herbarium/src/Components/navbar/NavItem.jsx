import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded-md transition-all duration-200 ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
      }`
    }
  >
    {label}
  </NavLink>
);

export default NavItem;
