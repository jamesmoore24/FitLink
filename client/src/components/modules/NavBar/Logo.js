import React from "react";
import { Link } from "react-router-dom";

import LogoBars from "../../../public/logo_bars.png";
import LogoImg from "../../../public/logo.png";

import "./Logo.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Logo = () => {
  return (
    <>
      <img src={LogoImg} className="Logo-container" />
    </>
  );
};

export default Logo;
