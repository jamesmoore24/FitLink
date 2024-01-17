import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Login.css";

import NavBar from "../modules/NavBar/NavBar";
import EntryForm from "../modules/EntryForm";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "649629592071-7qdko7is45o1332qsj1s31kc04tcvmih.apps.googleusercontent.com";

const Login = ({ userId, handleLogin, handleLogout, formType }) => {
  return (
    <section className="login-container">
      <NavBar />
      <div className="background-container">
        <EntryForm
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
          formType={formType}
        />
      </div>
    </section>
  );
};

export default Login;
