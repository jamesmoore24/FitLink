import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

import ActivityTracker from "../modules/Profile/ActivityTracker";
import TextChoose from "../modules/Profile/TextChoose";
import Metrics from "../modules/Profile/Metrics";
import Posts from "../modules/Home/Posts";

import "../../utilities.css";
import "./Profile.css";

/**
 * Page component to display when at the "/profile" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Profile = (props) => {
  const [textChooseChoice, setTextChooseChoice] = useState("posts");

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-left-subcontainer"></div>
      <div className="profile-right-subcontainer">
        <ActivityTracker />
        <TextChoose />
      </div>
    </div>
  );
};

export default Profile;
