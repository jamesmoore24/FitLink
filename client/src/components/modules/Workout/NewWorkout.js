import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import NewExercise from "./NewExercise";
import ExerciseSection from "../Posts/ExerciseSection";

import "./NewWorkout.css";

/**
 * @param {string} workoutId
 */
const NewWorkout = (props) => {
  const [exercises, setExercises] = useState(undefined);
  const [selectedExercise, setSelectedExercise] = useState(undefined);
  const [deletedExercise, setDeletedExercise] = useState(true);
  const [createdExercise, setCreatedExercise] = useState(true);

  useEffect(() => {
    console.log("Rerendering...");
    get("/api/exercises", { parent: props.workoutId }).then((exerciseObjs) => {
      let reversedExerciseObjs = exerciseObjs.reverse();
      const hasExercises = exerciseObjs.length !== 0;
      if (hasExercises) {
        setExercises(
          reversedExerciseObjs.map((exerciseObj) => (
            <ExerciseSection
              key={exerciseObj._id}
              exerciseId={exerciseObj._id}
              selectedExercise={selectedExercise}
              setSelectedExercise={setSelectedExercise}
              deleteExercise={deleteExercise}
            />
          ))
        );
      } else {
        setExercises(<div>Add an exercise!</div>);
      }
    });
  }, [props.workoutId, selectedExercise, deletedExercise, createdExercise]);

  const createExercise = () => {
    post("/api/exercise/create", { workoutId: props.workoutId }).then((exercise) => {
      setCreatedExercise(!createdExercise);
    });
  };

  const deleteExercise = (exerciseId) => {
    console.log("Deleted exercise!");
    post("/api/exercise/delete", { exerciseId: exerciseId }).then(() => {
      setDeletedExercise(!deletedExercise);
    });
  };

  return (
    <>
      <div className="newWorkout-container">
        {exercises}
        <button className="newWorkout-newExercise" onClick={createExercise}>
          New exercise
        </button>
      </div>
      <NewExercise activeExercise={selectedExercise} />
    </>
  );
};

export default NewWorkout;
