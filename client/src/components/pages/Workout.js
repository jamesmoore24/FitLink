import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";

import NewWorkout from "../modules/Workout/NewWorkout";
import NewExercise from "../modules/Workout/NewExercise";

import "../../utilities";
import "./Workout.css";

/**
 * Page component to display when at the "/workout" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {string} currentWorkout
 */
const Workout = (props) => {
  const [currentWorkout, setCurrentWorkout] = useState(undefined);

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="workout-background-container">
      <NewWorkout workoutId={currentWorkout} userId={props.userId} />
    </div>
  );
};

export default Workout;
