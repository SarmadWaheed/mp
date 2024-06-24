import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Navbar.css";

export const Navbar = () => {
  const { isloggedin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(true); // Initially set to true

  const toggleMenu = () => {
    console.log(menuOpen)
    setMenuOpen(!menuOpen);
    console.log(menuOpen)
    
 
  };

  return (
    <>
    
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">website</NavLink>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
        
        <nav className={menuOpen ? "open" : ""}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            {isloggedin && (
              <li>
                <NavLink to="/services">Services</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {isloggedin ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};
