import React from "react";

import "./Comment.css";

import ProfilePicture from "../../../public/example_profile.jpg";

/**
 * Proptypes
 * @param {string} creator_id
 * @param {string} creator_name
 * @param {string} parent
 * @param {string} params
 * @param {string} timestamp
 */
const Comment = (props) => {
  //need to use map or something to render all of the squares
  function timeSince(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000; // Number of seconds in a year

    if (interval > 1) {
      return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000; // Number of seconds in a month
    if (interval > 1) {
      return Math.floor(interval) + "mo";
    }
    interval = seconds / 86400; // Number of seconds in a day
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    interval = seconds / 3600; // Number of seconds in an hour
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    interval = seconds / 60; // Number of seconds in a minute
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    return Math.floor(seconds) + "s";
  }

  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <div className="comment-container">
      <div className="comment-profilePicture-container">
        <img className="comment-profilePicture" src={ProfilePicture} />
      </div>
      <div className="comment-nameAndComment-container">
        <div className="comment-nameTime-container">
          <div className="comment-name">{props.creator_name}</div>
          <div className="comment-time">{timeSince(props.timestamp)}</div>
        </div>

        <div className="comment-comment">{props.content}</div>
      </div>
    </div>
  );
};

export default Comment;
