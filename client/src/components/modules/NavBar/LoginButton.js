import React from "react";
import { Link } from "react-router-dom";

import "./LoginButton.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const LoginButton = () => {
  return (
    <Link to="/login" className="login-button">
      Login
    </Link>
  );
};

export default LoginButton;
