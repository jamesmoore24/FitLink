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
 * @param {string} workoutId
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
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [exercises, setExercises] = useState([]);

  const addNewComment = (commentObj) => {
    if (commentText.length > 0) {
      post("/api/comment", { parent: props.workoutId, content: commentText }).then((comment) => {
        setComments(comments.concat([comment]));
      });
    }
    setCommentText("");
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    post("/api/like/", { workoutId: props.workoutId, isLiked: !isLiked }).then((like) => {});
  };

  useEffect(() => {
    get("/api/like/", { userId: props.userId, workoutId: props.workoutId }).then((likeVal) => {
      //if an object is returned then we know that we have a like on a post
      if (likeVal.length) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });

    get("/api/star/", { userId: props.userId, workoutId: props.workoutId }).then((starVal) => {
      //if an object is returned then we know that we have a like on a post
      if (starVal.length) {
        setIsStarred(true);
      } else {
        setIsStarred(false);
      }
    });

    get("/api/comments/", { parent: props.workoutId }).then((comments) => {
      setComments(comments);
    });

    get("/api/exercises", { parent: props.workoutId }).then((exercises) => {
      setExercises(exercises);
    });
  }, []);

  return (
    <div className="post-container">
      <PostTop
        creator_name={props.creator_name}
        workoutId={props.workoutId}
        timestamp={props.timestamp}
        isStarred={isStarred}
        setIsStarred={setIsStarred}
      />

      <div className="post-exercise-container">
        {exercises.length === 0 ? (
          <div className="newWorkout-reminderText">Start a new exercise!</div>
        ) : (
          exercises.map((exercise, ix) => (
            <ExerciseSection
              key={exercise._id}
              index={ix}
              exerciseId={exercise._id}
              exerciseName={exercise.name}
              exerciseSets={exercise.sets}
              viewingStyle={"view"}
            />
          ))
        )}
      </div>

      <div className="post-fistbump-container" onClick={toggleLike}>
        <img src={isLiked ? FistFilled : Fist} className="post-fistbumpImage" />
        <div className="post-fistbump-text">
          {isLiked
            ? props.likes === 0
              ? `${isLiked ? props.likes + 1 : props.likes} fistbump`
              : `${isLiked ? props.likes + 1 : props.likes} fistbumps`
            : "Leave a fistbump!"}
        </div>
      </div>

      <div className="post-commentSectionIndicator">
        {comments.length > 0 ? `Comments (${comments.length})` : "Be the first to add a comment!"}
      </div>
      {comments.length > 0 && (
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
      )}

      <div className="post-addCommentBox">
        <input
          className="post-addCommentInput"
          placeholder="Leave a comment..."
          value={commentText} // Bind the input value to the state variable
          onChange={(e) => {
            setCommentText(e.target.value);
          }} // Handle input changes
        />
        <button className="post-addCommentPost" onClick={addNewComment}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
