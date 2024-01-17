import React, { useState } from "react";

import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./EntryForm.css";
import showPasswordIcon from "../../public/eye_view.png";
import hidePasswordIcon from "../../public/eye_hide.png";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const GOOGLE_CLIENT_ID = "649629592071-7qdko7is45o1332qsj1s31kc04tcvmih.apps.googleusercontent.com";

const EntryForm = ({ userId, handleLogin, handleLogout, formType }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form data
    console.log("Form submitted");
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [passwordIcon, setPasswordIcon] = useState(showPasswordIcon);

  const togglePasswordVisiblity = () => {
    setIsPasswordShown(!isPasswordShown);
    setPasswordIcon(isPasswordShown ? showPasswordIcon : hidePasswordIcon);
  };

  return (
    <div className="signup-container">
      <div className="text-signup">{formType}</div>
      <div className="signup-input-box">
        <div className="text-input">{formType === "Login" ? "Username or Email" : "Username"}</div>
        <input className="signup-input" />
      </div>
      {formType === "Sign-up" && (
        <div className="signup-input-box">
          <div className="text-input">Email</div>
          <input type="email" className="signup-input" />
        </div>
      )}
      <div className="signup-input-box">
        <div className="text-input">Password</div>
        <div className="signup-input">
          <input type={isPasswordShown ? "text" : "password"} className="password-input" />
          <img
            src={passwordIcon}
            alt="Show password"
            onClick={togglePasswordVisiblity}
            style={{ cursor: "pointer" }}
            className="toggle-password-icon"
          />
        </div>
      </div>
      {formType == "Sign-up" && (
        <div class="checkbox-container">
          <input type="checkbox" id="myCheckbox" class="custom-checkbox" />
          <label for="myCheckbox">
            I agree to the <a href="">Terms and Conditions</a> of FitLink
          </label>
        </div>
      )}
      <button type="submit" className="signup-button" onClick={handleSubmit}>
        {formType}
      </button>
      <div className="google-signup">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} className="signup-button">
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
          )}
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default EntryForm;
