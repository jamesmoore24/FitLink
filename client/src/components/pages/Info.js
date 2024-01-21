import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Info.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Info = (props) => {
  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return <div className="info-background-container">Information</div>;
};

export default Info;
