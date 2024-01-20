import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import Post from "../modules/Posts/Post";

import "../../utilities.css";
import "./Feed.css";
import VideoPlayer from "../modules/SignUp/Video";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Feed = (props) => {
  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return (
    <div className="feed-background-container">
      <Post />
      <Post />
      <Post />
      <div className="feed-endPosts">No more posts</div>
    </div>
  );
};

export default Feed;
