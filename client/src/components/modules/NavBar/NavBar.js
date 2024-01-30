import React from "react";

import "./NavBar.css";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import TabBar from "./TabBar";
import GradingButton from "./GradingButton";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout, handleGradingLogin }) => {
  return (
    <div className="NavBar-container">
      <Logo />
      {userId && <TabBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />}
      <div className={`NavBar-login-container ${userId ? "logged-in" : ""}`}>
        {!userId && (
          <GradingButton handleGradingLogin={handleGradingLogin} handleLogout={handleLogout} />
        )}
        <LoginButton handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      </div>
    </div>
  );
};

export default NavBar;
