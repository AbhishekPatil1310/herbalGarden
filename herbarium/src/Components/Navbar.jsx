import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ()=>{
    return (<>
        <div id="Home">
            <nav className="navbar-nav">
                <NavLink to="/" className="navbar-logo">
                    <span className="mx-auto">🏡</span>
                </NavLink>
            </nav>
        </div>
        <div id="about">
<nav>
        <NavLink
          to="/About"
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
          }
        >
          About
        </NavLink>
</nav>
</div>
<div id="contact">
<nav>
        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            isActive ? 'navbar-link navbar-link-active' : 'navbar-link'
          }
        >
          contact
        </NavLink>
</nav>
</div>
<div id="search" className="mt-4 px-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-sm p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
        </>
    )
}

export default Navbar