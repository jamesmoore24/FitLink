import React from "react";
import { Link } from "react-router-dom";

import "./Logo.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Logo = () => {
  return (
    <Link to="/">
      <div className="LogoText u-inlineBlock">FitLink</div>
      <div className="LogoBar1 u-inlineBlock" />
      <div className="LogoBar2 u-inlineBlock" />
      <div className="LogoBar3 u-inlineBlock" />
    </Link>
  );
};

export default Logo;
