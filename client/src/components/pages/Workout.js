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
  const [currentExercises, setCurrentExercises] = useState(undefined);

  useEffect(() => {
    get("/api/current-workout").then((workout) => {
      console.log(workout[0]._id);
      if (workout.length === 0) {
        post("/api/workout").then((workout) => {
          console.log("New workout created");
        });
      }
      setCurrentWorkout(workout[0]._id);
      console.log(`SET WORKOUT ${workout}`);
    });
  }, []);

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="workout-background-container">
      <NewWorkout workoutId={currentWorkout} />
    </div>
  );
};

export default Workout;
