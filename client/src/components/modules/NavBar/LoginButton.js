import React from "react";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./LoginButton.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */

const GOOGLE_CLIENT_ID = "649629592071-7qdko7is45o1332qsj1s31kc04tcvmih.apps.googleusercontent.com";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {funct}
 */
const LoginButton = (props) => {
  return (
    <div className="loginButton-container">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} className="signup-button">
        {props.userId ? (
          <button
            onClick={() => {
              //THIS MIGHT ERROR
              googleLogout();
              props.handleLogout();
            }}
          >
            Logout
          </button>
        ) : (
          <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} />
        )}
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginButton;
