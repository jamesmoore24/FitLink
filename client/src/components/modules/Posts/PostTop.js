import React from "react";

import "./PostTop.css";

import ProfilePicture from "../../../public/example_profile.jpg";
import Medal from "../../../public/gold-medal.png";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} creator_name
 * @param {Date} timestamp
 */
const PostTop = (props) => {
  const date = new Date(props.timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Format the time into a string with AM/PM
  const formattedTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}${period}`;

  return (
    <div className="postTop-profileAndPersonalBest-container">
      <div className="postTop-profilePictureAndDescription">
        <img className="postTop-profilePicture-container" src={ProfilePicture}></img>
        <div className="postTop-profileNameFollowTime-container">
          <div className="postTop-profileName">{props.creator_name}</div>
          <div className="postTop-profileDescription">
            Workout at {formattedTime} @ the Z center
          </div>
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
