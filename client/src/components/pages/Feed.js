import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Feed.css";
import VideoPlayer from "../modules/SignUp/Video";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Feed = (props) => {
  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return <div className="login-container">Feed</div>;
};

export default Feed;
