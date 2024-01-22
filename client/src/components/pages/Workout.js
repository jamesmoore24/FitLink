import React from "react";

import NewWorkout from "../modules/Workout/NewWorkout";
import NewExercise from "../modules/Workout/NewExercise";

import "../../utilities.css";
import "./Workout.css";

/**
 * Page component to display when at the "/workout" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Workout = (props) => {
  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="workout-background-container">
      <NewWorkout />
    </div>
  );
};

export default Workout;
