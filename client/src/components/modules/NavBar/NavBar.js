import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";
import Logo from "./Logo";
import LoginButton from "./LoginButton";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = () => {
  return (
    <div className="NavBar-container">
      <Logo />
      <LoginButton />
    </div>
  );
};

export default NavBar;
