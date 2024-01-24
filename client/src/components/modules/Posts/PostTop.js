import React from "react";

import "./PostTop.css";
import { post } from "../../../utilities";

import ProfilePicture from "../../../public/example_profile.jpg";
import Medal from "../../../public/gold-medal.png";
import Star from "../../../public/star.png";
import StarFilled from "../../../public/star_filled.png";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} creator_name
 * @param {string} postId
 * @param {Date} timestamp
 * @param {Boolean} isStarred
 * @param {(PostObject) => {}} setIsStarred
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

  const toggleStar = () => {
    props.setIsStarred(!props.isStarred);
    post("/api/star/", { postId: props.postId, isStarred: !props.isStarred }).then((star) => {});
  };

  return (
    <div className="postTop-container">
      <div className="postTop-profilePictureAndDescription">
        <div className="postTop-profilePicture-container">
          <img className="postTop-profilePicture" src={ProfilePicture} />
        </div>

        <div className="postTop-profileNameFollowTime-container">
          <div className="postTop-profileName">{props.creator_name}</div>
          <div className="postTop-profileDescription">
            Workout at {formattedTime} @ the Z center
          </div>
        </div>
      </div>
      <div className="postTop-personalBest-container">
        <img
          className="postTop-star"
          src={props.isStarred ? StarFilled : Star}
          onClick={toggleStar}
        />
        <div className="postTop-personalBestText">3 Personal Bests</div>
      </div>
    </div>
  );
};

export default PostTop;
