import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import NewExercise from "./NewExercise";
import ExerciseSection from "../Posts/ExerciseSection";

import "./NewWorkout.css";

/**
 * @param {string} workoutId
 * @param {string} userId
 */
const NewWorkout = (props) => {
  const [currentWorkoutId, setCurrentWorkoutId] = useState(undefined);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(undefined);

  useEffect(() => {
    get("/api/current-workout", { userId: props.userId }).then((workout) => {
      let workoutId;
      if (workout.length == 0) {
        post("/api/workout", { current: true }).then((workout) => {
          console.log("Workout created");
          workoutId = workout._id;
        });
      } else {
        workoutId = workout[0]._id;
      }
      setCurrentWorkoutId(workoutId);
      get("/api/exercises", { parent: workoutId }).then((exercises) => {
        console.log(exercises);
        setExercises(exercises);
      });
    });
  }, []);

  const createExercise = () => {
    post("/api/exercise/create", { workoutId: currentWorkoutId }).then((exercise) => {
      setExercises(exercises.concat([exercise]));
    });
  };

  const deleteExercise = (exerciseId) => {
    post("/api/exercise/delete", { exerciseId: exerciseId }).then(() => {
      setExercises(exercises.filter((exercise) => exercise._id !== exerciseId));
    });
  };

  return (
    <>
      <div className="newWorkout-container">
        {exercises.map((exercise, ix) => (
          <ExerciseSection
            key={exercise._id}
            index={ix}
            exerciseId={exercise._id}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
            deleteExercise={deleteExercise}
            viewingStyle={"create"}
          />
        ))}
        <button className="newWorkout-newExercise" onClick={createExercise}>
          New exercise
        </button>
      </div>
      <NewExercise activeExercise={selectedExercise} />
    </>
  );
};

export default NewWorkout;
