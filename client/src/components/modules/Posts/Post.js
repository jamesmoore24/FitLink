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
 * The navigation bar at the top of all pages. Takes no props.
 */
const Post = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="post-container">
      <PostTop />

      <div className="post-exercise-container">
        <ExerciseSection />
        <ExerciseSection />
        <ExerciseSection />
      </div>

      <div className="post-fistbump-container">
        <img src={Fist} className="post-fistbumpImage" />
        <p>Leave a fistbump!</p>
      </div>

      <div className="post-commentSection">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
};

export default Post;
