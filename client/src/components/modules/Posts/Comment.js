import React from "react";

import "./Comment.css";

import ProfilePicture from "../../../public/example_profile.jpg";

/**
 * Proptypes
 * @param {string} creator_id
 * @param {string} creator_name
 * @param {string} parent
 * @param {string} params
 */
const Comment = (props) => {
  //need to use map or something to render all of the squares

  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <div className="comment-container">
      <div className="comment-profilePicture-container">
        <img className="comment-profilePicture" src={ProfilePicture} />
      </div>
      <div className="comment-nameAndComment-container">
        <div className="comment-name">{props.creator_name}</div>
        <div className="comment-comment">{props.content}</div>
      </div>
    </div>
  );
};

export default Comment;
