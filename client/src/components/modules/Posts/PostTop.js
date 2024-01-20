import React from "react";

import "./PostTop.css";

import ProfilePicture from "../../../public/example_profile.jpg";
import Medal from "../../../public/gold-medal.png";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const PostTop = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="postTop-profileAndPersonalBest-container">
      <div className="postTop-profilePictureAndDescription">
        <img className="postTop-profilePicture-container" src={ProfilePicture}></img>
        <div className="postTop-profileNameFollowTime-container">
          <div className="postTop-profileName">Jimmy Moore</div>
          <div className="postTop-profileDescription">Workout at 4:30pm @ the Z center</div>
        </div>
      </div>
      <div className="postTop-personalBest-container">
        <img className="postTop-personalBestMedal" src={Medal} />
        <div className="postTop-personalBestText">3 Personal Bests</div>
      </div>
    </div>
  );
};

export default PostTop;
