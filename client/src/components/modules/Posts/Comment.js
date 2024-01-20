import React from "react";

import "./Comment.css";

import ProfilePicture from "../../../public/example_profile.jpg";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Comment = ({ userId, handleLogin, handleLogout }) => {
  //need to use map or something to render all of the squares

  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <div className="comment-container">
      <img className="comment-profilePicture-container" src={ProfilePicture} />
      <div className="comment-nameAndComment-container">
        <div className="comment-name">Helo</div>
        <div className="comment-comment">This is a good workout lol</div>
      </div>
    </div>
  );
};

export default Comment;
