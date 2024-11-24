import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NavBar from "./modules/NavBar/NavBar.js";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Feed from "./pages/Feed.js";
import Workout from "./pages/Workout.js";
import Profile from "./pages/Profile.js";
import Info from "./pages/Info.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";
import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [notificationOn, setNotificationOn] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  //change

  useEffect(() => {
    let timer;
    if (notificationOn) {
      timer = setTimeout(() => {
        setNotificationOn(false);
      }, 2000); // 2500 milliseconds = 2.5 seconds
    }

    return () => clearTimeout(timer); // Cleanup the timer
  }, [notificationOn]);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      navigate("/feed");
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleGradingLogin = () => {
    post("/api/login/grading").then((user) => {
      setUserId(user._id);
      navigate("/feed");
    });
  };

  const handleLogout = () => {
    navigate("/");
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <div className="app-container">
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleGradingLogin={handleGradingLogin}
          userId={userId}
        />
        <div className={`app-popUpNotification ${notificationOn ? "show" : ""}`}>
          {notificationText}
          <div className="notification-bar"></div>
        </div>

        <Routes>
          <Route path="/" element={<Landing userId={userId} setUserId={setUserId} />} />
          <Route
            path="/feed"
            element={
              <Feed
                userId={userId}
                setUserId={setUserId}
                setNotificationOn={setNotificationOn}
                setNotificationText={setNotificationText}
              />
            }
          />
          <Route
            path="/workout"
            element={
              <Workout
                userId={userId}
                setUserId={setUserId}
                setNotificationOn={setNotificationOn}
                setNotificationText={setNotificationText}
              />
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <Profile
                userId={userId}
                setUserId={setUserId}
                setNotificationOn={setNotificationOn}
                setNotificationText={setNotificationText}
              />
            }
          />
          <Route path="/info" element={<Info userId={userId} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
