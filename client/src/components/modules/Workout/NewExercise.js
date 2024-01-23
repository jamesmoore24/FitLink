import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import SetSquare from "../Posts/SetSquare";

import MagnifyingGlass from "../../../public/search.png";

import "./NewExercise.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} selectedExercise
 * @param {string} exerciseName
 * @param {() => {}} setExerciseName
 * @param {string}
 */
const NewExercise = (props) => {
  useEffect(() => {
    console.log("HERE");
    if (props.selectedExercise) {
      post("/api/exercise/change-type", {
        id: props.selectedExercise,
        name: props.exerciseName,
      }).then(() => {
        console.log("Changed type");
      });
    }
  }, [props.exerciseName]);

  if (!props.selectedExercise) {
    return <div className="newExercise-container">No exercise selected.</div>;
  }
  return (
    <div className="newExercise-container">
      <div className="newExercise-search-container">
        <input
          className="newExercise-exerciseInput"
          placeholder="Add an exercise..."
          value={props.exerciseInput}
          onChange={(e) => props.setExerciseName(e.target.value)}
        />
        <div className="newExercise-exerciseRecommendation">AI Search</div>
      </div>
      <div className="newExercise-setInfo-container">
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text">Reps</div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text">RPE</div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={rpe}
            onChange={(e) => setRPE(e.target.value)}
          />
        </div>
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text">Set #</div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={setNumber}
            onChange={(e) => setSetNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="newExercise-previousSets-container">
        <div className="newExercise-previousSets-text">Previous sets:</div>
        <div className="newExercise-previousSets-sets">
          <SetSquare />
        </div>
      </div>
      <div className="newWorkout-finishButton-container">
        <div className="newExercise-finishButton">Save Set</div>
        <div className="newExercise-finishButton">Save Exercise</div>
      </div>
    </div>
  );
};

export default NewExercise;
