import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import Post from "../modules/Posts/Post";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Feed.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Feed = (props) => {
  const [workouts, setWorkouts] = useState([]);

  const workout = {
    creator_id: props.userId,
    creator_name: "Jimmy",
    starred: true,
    likes: 3,
  };

  useEffect(() => {
    console.log("Posting a new workout");
    get("/api/workouts", workout).then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      console.log(typeof reversedWorkoutObjs[0].timestamp);
      setWorkouts(reversedWorkoutObjs);
    });
  }, []);

  let workoutsList = null;
  const hasWorkouts = workouts.length !== 0;
  if (hasWorkouts) {
    workoutsList = workouts.map((workoutObj) => (
      <Post
        key={`Card_${workoutObj._id}`}
        _id={workoutObj._id}
        creator_name={workoutObj.creator_name}
        creator_id={workoutObj.creator_id}
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
      />
    ));
  } else {
    workoutsList = <div>No workouts!</div>;
  }

  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return (
    <div className="feed-background-container">
      {workoutsList}
      <div className="feed-endPosts">No more posts</div>
    </div>
  );
};

export default Feed;
