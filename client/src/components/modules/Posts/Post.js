import React from "react";

import "./Post.css";

import ProfilePicture from "../../../public/example_profile.jpg";
import Medal from "../../../public/gold-medal.png";
import PostTop from "./PostTop";
import ExerciseSection from "./ExerciseSection";
import Comment from "./Comment";

import Fist from "../../../public/fist.png";
import FistFilled from "../../../public/fist_filled.png";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} creator_id id of current logged in user
 * @param {string} creator_name
 * @param {Date} timestamp
 * @param {boolean} starred
 * @param {number} likes
 */
const Post = (props) => {
  return (
    <div className="post-container">
      <PostTop creator_name={props.creator_name} timestamp={props.timestamp} />

      <div className="post-exercise-container">
        <ExerciseSection />
        <ExerciseSection />
        <ExerciseSection />
      </div>

      <div className="post-fistbump-container">
        <img src={Fist} className="post-fistbumpImage" />
        <p>{`${props.likes}`}</p>
      </div>

      <div className="post-commentSectionIndicator">Comments</div>
      <div className="post-commentSection">
        <Comment />
        <Comment />
        <Comment />
      </div>

      <div className="post-addCommentBox">
        <input className="post-addCommentInput" placeholder="Leave a comment..." />
        <button className="post-addCommentPost">Post</button>
      </div>
    </div>
  );
};

export default Post;
