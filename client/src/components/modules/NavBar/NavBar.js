import React from "react";

import "./NavBar.css";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import TabBar from "./TabBar";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="NavBar-container">
      <Logo />
      {userId && <TabBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
      <LoginButton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
    </div>
  );
};

export default NavBar;
