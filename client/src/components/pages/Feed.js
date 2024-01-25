import React, { useState, useEffect } from "react";

import Post from "../modules/Posts/Post";
import ActivityTracker from "../modules/Profile/ActivityTracker";
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
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        console.log(`LOL HACKY ${user._id}`);
        props.setUserId(user._id);
      }
    });
    console.log(`SHOULD BE ME ${props.userId}`);
  }, []);

  let workoutsList = null;
  const hasWorkouts = workouts.length !== 0;
  if (hasWorkouts) {
    workoutsList = workouts.map((workoutObj) => (
      <Post
        key={`Card_${workoutObj._id}`}
        workoutId={workoutObj._id}
        creator_name={workoutObj.creator_name}
        creator_id={workoutObj.creator_id}
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
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
        <ActivityTracker userId={props.userId} />
      </div>
    </div>
  );
};

export default Feed;
