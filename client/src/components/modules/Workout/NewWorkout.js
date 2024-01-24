import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import { useNavigate } from "react-router-dom";

import NewExercise from "./NewExercise";
import ExerciseSection from "../Posts/ExerciseSection";

import "./NewWorkout.css";

/**
 * @param {string} userId
 */
const NewWorkout = (props) => {
  let navigate = useNavigate();
  const [currentWorkoutId, setCurrentWorkoutId] = useState(undefined);
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(undefined);

  useEffect(() => {
    //get the current workout
    get("/api/workout", { userId: props.userId, current: true }).then((workout) => {
      //if there isn't a current workout then create one
      let workoutId;
      if (workout.length == 0) {
        post("/api/workout/create", { current: true }).then((workout) => {
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
    console.log(currentWorkoutId);
    post("/api/exercise/create", { workoutId: currentWorkoutId }).then((exercise) => {
      setExercises(exercises.concat([exercise]));
    });
  };

  const deleteExercise = (exerciseId) => {
    post("/api/exercise/delete", { exerciseId: exerciseId }).then(() => {
      setExercises(exercises.filter((exercise) => exercise._id !== exerciseId));
      setSelectedExerciseId(undefined);
    });
  };

  const saveWorkout = () => {
    console.log("HERE");
    post("/api/workout/save", { id: currentWorkoutId }).then(() => {
      console.log("Workout saved to drafts");
      navigate(`/profile/${props.userId}`);
    });
  };

  const postWorkout = () => {
    post("/api/workout/post", { id: currentWorkoutId }).then(() => {
      console.log("Workout posted!");
      navigate("/feed");
    });
  };

  return (
    <>
      <div className="newWorkout-container">
        <div className="newWorkout-topHalf-container">
          <div className="newWorkout-title">Exercises:</div>
          <div className="newWorkout-exerciseBox">
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
                  selectedExerciseId={selectedExerciseId}
                  setSelectedExerciseId={setSelectedExerciseId}
                  deleteExercise={deleteExercise}
                  viewingStyle={"create"}
                />
              ))
            )}
          </div>
          <button className="newWorkout-newExercise" onClick={createExercise}>
            New exercise
          </button>
        </div>

        <div className="newWorkout-postBox">
          <button className="newWorkout-postBoxButton" onClick={saveWorkout}>
            Save Workout
          </button>
          <button className="newWorkout-postBoxButton" onClick={postWorkout}>
            Post Workout
          </button>
        </div>
      </div>
      <NewExercise
        selectedExerciseId={selectedExerciseId}
        exercises={exercises}
        deleteExercise={deleteExercise}
        setExercises={setExercises}
      />
    </>
  );
};

export default NewWorkout;
