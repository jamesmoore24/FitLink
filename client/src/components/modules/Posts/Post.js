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
 * @param {string} workout_id
 * @param {string} creator_id id of user who made the workout object
 * @param {string} creator_name
 * @param {boolean} posted
 * @param {Date} timestamp
 * @param {boolean} starred
 * @param {number} likes
 * @param {string} userId
 * @param {() => {}} deleteWorkout
 * @param {boolean} changedProfilePicture
 */
const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState(""); // Step 1: State variable for input value
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const addNewComment = (commentObj) => {
    if (commentText.length > 0) {
      post("/api/comment", { parent: props.workout_id, content: commentText }).then((comment) => {
        setComments(comments.concat([comment]));
      });
    }
    setCommentText("");
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    post("/api/like/", { workoutId: props.workout_id, isLiked: !isLiked }).then((like) => {});
  };

  useEffect(() => {
    setVisibility(props.posted);

    get("/api/like/", { userId: props.userId, workoutId: props.workout_id }).then((likeVal) => {
      //if an object is returned then we know that we have a like on a post
      if (likeVal.length) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });

    get("/api/star/", { userId: props.userId, workoutId: props.workout_id }).then((starVal) => {
      //if an object is returned then we know that we have a like on a post
      console.log(props.workout_id);
      if (starVal.length) {
        setIsStarred(true);
      } else {
        setIsStarred(false);
      }
    });

    get("/api/comments/", { parent: props.workout_id }).then((comments) => {
      setComments(comments);
    });

    get("/api/exercises", { parent: props.workout_id }).then((exercises) => {
      setExercises(exercises);
    });

    get("/api/user/info", { creator_id: props.creator_id }).then((user) => {
      setProfilePicture(user.profile_picture);
    });
  }, [props.changedProfilePicture]);

  return (
    <div className="post-container">
      <PostTop
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        creator_pfp={profilePicture}
        userId={props.userId}
        posted={props.posted}
        workout_id={props.workout_id}
        timestamp={props.timestamp}
        isStarred={isStarred}
        setIsStarred={setIsStarred}
        deleteWorkout={props.deleteWorkout}
        visibility={visibility}
        setVisibility={setVisibility}
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
              creatorId={comment.creatorId}
              content={comment.content}
              timestamp={comment.timestamp}
              changedProfilePicture={props.changedProfilePicture}
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
