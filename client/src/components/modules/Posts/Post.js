import React, { useState, useEffect } from "react";

import "./Post.css";
import { get, post } from "../../../utilities";

import PostTop from "./PostTop";
import ExerciseSection from "./ExerciseSection";
import Comment from "./Comment";

import Fist from "../../../public/fist.png";
import FistFilled from "../../../public/fist_filled.png";

/**
 * Proptypes
 * @param {string} postId
 * @param {string} creator_id id of current logged in user
 * @param {string} creator_name
 * @param {Date} timestamp
 * @param {boolean} starred
 * @param {number} likes
 * @param {string} userId
 */
const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(""); // Step 1: State variable for input value
  const [isLiked, setIsLiked] = useState(-1);

  const handleChange = (e) => {
    // Step 2: Update state with input value
    setCommentText(e.target.value);
  };

  const addNewComment = (commentObj) => {
    console.log("Posting a comment");
    post("/api/comment", { parent: props.postId, content: commentText }).then((comment) => {
      setComments(comments.concat([comment]));
    });
    setCommentText("");
  };

  const toggleLike = () => {
    setIsLiked(-1 * isLiked);
    console.log(props.postId);
    post("/api/like/", { postId: props.postId, like: isLiked }).then((like) => {
      console.log("Liked");
    });
  };

  useEffect(() => {
    get("/api/comments/", { parent: props.postId }).then((comments) => {
      setComments(comments);
    });
  }, []);

  return (
    <div className="post-container">
      <PostTop creator_name={props.creator_name} timestamp={props.timestamp} />

      <div className="post-exercise-container">
        <ExerciseSection />
        <ExerciseSection />
        <ExerciseSection />
        <ExerciseSection />
      </div>

      <div className="post-fistbump-container" onClick={toggleLike}>
        <img src={isLiked === 1 ? FistFilled : Fist} className="post-fistbumpImage" />
        <p>{isLiked === 1 ? props.likes + 1 : props.likes} fistbumps!</p>
      </div>

      <div className="post-commentSectionIndicator">Comments</div>
      <div className="post-commentSection">
        {comments.map((comment) => (
          <Comment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            creator_id={comment.creator_id}
            content={comment.content}
          />
        ))}
      </div>

      <div className="post-addCommentBox">
        <input
          className="post-addCommentInput"
          placeholder="Leave a comment..."
          value={commentText} // Bind the input value to the state variable
          onChange={handleChange} // Handle input changes
        />
        <button className="post-addCommentPost" onClick={addNewComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
