import React from "react";
import { redirect } from "react-router-dom";

import "../../utilities.css";
import "./Feed.css";

/**
 * Page component to display when at the "/profile" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Profile = (props) => {
  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="big-container">
      <div className="small-container" />
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
