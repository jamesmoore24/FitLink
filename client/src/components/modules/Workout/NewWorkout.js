import React, { useState, useEffect } from "react";

import NewExercise from "./NewExercise";
import ExerciseSection from "../Posts/ExerciseSection";

import "./NewWorkout.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NewWorkout = ({ userId, handleLogin, handleLogout }) => {
  const [activeExercise, setActiveExercise] = useState(false);

  const toggleActiveExercise = () => {
    setActiveExercise(!activeExercise);
  };

  return (
    <>
      <div className="newWorkout-container" onClick={toggleActiveExercise}>
        <ExerciseSection />
        <ExerciseSection />
        <ExerciseSection />
      </div>
      <NewExercise activeExercise={activeExercise} />
    </>
  );
};

export default NewWorkout;
