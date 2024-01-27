import React, { useState, useEffect } from "react";

import Post from "../modules/Posts/Post";
import ActivityTracker from "../modules/Profile/ActivityTracker";
import Friends from "../modules/Friends/Friends";
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

  useEffect(() => {
    get("/api/workouts/feed").then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      setWorkouts(reversedWorkoutObjs);
    });
    console.log(`SHOULD BE ME ${props.userId}`);
  }, []);

  const deleteWorkout = (workout_id) => {
    post("/api/workout/delete", { workout_id: workout_id }).then((workout) => {
      setWorkouts(workouts.filter((wkt) => wkt._id !== workout_id));
    });
  };

  let workoutsList = null;
  const hasWorkouts = workouts.length !== 0;
  if (hasWorkouts) {
    workoutsList = workouts.map((workoutObj) => (
      <Post
        key={`Card_${workoutObj._id}`}
        workout_id={workoutObj._id}
        creator_name={workoutObj.creator_name}
        creator_id={workoutObj.creator_id}
        posted={workoutObj.posted}
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
        deleteWorkout={deleteWorkout}
      />
    ));
  }

  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return (
    <div className="feed-background-container">
      <div className="feed-posts-container">{workoutsList}</div>
      <div className="feed-activityFriends-container">
        <Friends />
      </div>
    </div>
  );
};

export default Feed;
