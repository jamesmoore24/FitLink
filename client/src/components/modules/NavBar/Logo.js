import React from "react";
import { Link } from "react-router-dom";

import LogoBars from "../../../public/logo_bars.png";

import "./Logo.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Logo = () => {
  return (
    <div className="Logo-container">
      <div className="LogoText u-inlineBlock">FitLink</div>
      <img className="logo-barsImg" src={LogoBars} />
    </div>
  );
};

export default Logo;
