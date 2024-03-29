import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import { useNavigate } from "react-router-dom";

import NewExercise from "./NewExercise";
import ExerciseSection from "../Posts/ExerciseSection";

import "./NewWorkout.css";

/**
 * @param {string} userId
 * @param {string} setNotificationOn
 * @param {string} setNotificationText
 * @param {string} changeSet
 */
const NewWorkout = (props) => {
  let navigate = useNavigate();
  const [currentWorkoutId, setCurrentWorkoutId] = useState(undefined);
  const [exercises, setExercises] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(undefined);
  const [errorText, setErrorText] = useState("");
  const [newPR, setNewPR] = useState(false);

  useEffect(() => {
    //get the current workout
    get("/api/workout/current", { userId: props.userId }).then((workout) => {
      //if there isn't a current workout then create one
      if (workout.length == 0) {
        post("/api/workout/create", { current: true }).then((workout) => {
          setCurrentWorkoutId(workout._id);
        });
      } else {
        setCurrentWorkoutId(workout[0]._id);
      }
    });
  }, []);

  useEffect(() => {
    get("/api/exercises", { parent: currentWorkoutId }).then((exercises) => {
      setExercises(exercises);
    });
  }, [currentWorkoutId, newPR]);

  const createExercise = () => {
    if (currentWorkoutId) {
      post("/api/exercise/create", { creator_id: props.userId, workoutId: currentWorkoutId }).then(
        (exercise) => {
          setExercises(exercises.concat([exercise]));
          setSelectedExerciseId(exercise._id);
        }
      );
    }
  };

  const deleteExercise = (exerciseId) => {
    post("/api/exercise/delete", { exerciseId: exerciseId }).then(() => {
      setExercises(exercises.filter((exercise) => exercise._id !== exerciseId));
      setSelectedExerciseId(undefined);
    });
  };

  const saveWorkout = () => {
    if (exercises.every((obj) => obj.name && obj.name.trim().length > 0) && exercises.length > 0) {
      post("/api/workout/save", { id: currentWorkoutId }).then(() => {
        navigate(`/profile/${props.userId}`);
        setErrorText("");
        props.setNotificationOn(true);
        props.setNotificationText("Workout posted privately!");
      });
    } else if (exercises.length == 0) {
      setErrorText("You must save an exercise first.");
    } else {
      setErrorText("You must name your exercises first.");
    }
  };

  const postWorkout = () => {
    if (exercises.every((obj) => obj.name && obj.name.trim().length > 0) && exercises.length > 0) {
      post("/api/workout/post", { id: currentWorkoutId }).then(() => {
        navigate("/feed");
        setErrorText("");
        props.setNotificationOn(true);
        props.setNotificationText("Workout posted!");
      });
    } else if (exercises.length == 0) {
      setErrorText("You must save an exercise first.");
    } else {
      setErrorText("You must name your exercises first.");
    }
  };

  return (
    <>
      <div className="newWorkout-container">
        <div className="newWorkout-topHalf-container">
          <div className="newWorkout-title">Exercises:</div>
          {exercises.length !== 0 && (
            <div className="newWorkout-exerciseBox">
              {exercises.map((exercise, ix) => (
                <ExerciseSection
                  key={exercise._id}
                  index={ix}
                  exerciseId={exercise._id}
                  exerciseName={exercise.name}
                  exerciseSets={exercise.sets}
                  pr={exercise.pr}
                  selectedExerciseId={selectedExerciseId}
                  setSelectedExerciseId={setSelectedExerciseId}
                  deleteExercise={deleteExercise}
                  viewingStyle={"create"}
                />
              ))}
            </div>
          )}
          {currentWorkoutId && (
            <button className="newWorkout-newExercise" onClick={createExercise}>
              New exercise
            </button>
          )}
        </div>

        <div className="newWorkout-errorPost-container">
          <div className="newWorkout-postError">{errorText}</div>
          <div className="newWorkout-postBox">
            <button
              className="newWorkout-postBoxButton-save"
              onClick={() => {
                saveWorkout();
              }}
            >
              Post Privately
            </button>
            <button
              className="newWorkout-postBoxButton"
              onClick={() => {
                postWorkout();
              }}
            >
              Post Publicly
            </button>
          </div>
        </div>
      </div>
      <NewExercise
        selectedExerciseId={selectedExerciseId}
        exercises={exercises}
        deleteExercise={deleteExercise}
        setExercises={setExercises}
        setNotificationOn={props.setNotificationOn}
        setNotificationText={props.setNotificationText}
        setNewPR={setNewPR}
        newPR={newPR}
      />
    </>
  );
};

export default NewWorkout;
