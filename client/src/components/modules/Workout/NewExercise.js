import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import SetSquare from "../Posts/SetSquare";

import MagnifyingGlass from "../../../public/search.png";

import "./NewExercise.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} selectedExerciseId
 * @param {() => {}} updateExercise
 */
const NewExercise = (props) => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRPE] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);
  const [setNumber, setSetNumber] = useState(0);

  //everytime the selected exercise changes, get information about exercise and store in variables
  useEffect(() => {
    console.log(`HERE AT SELECTED`);
    if (props.selectedExerciseId) {
      get("/api/exercise/", {
        id: props.selectedExerciseId,
      }).then((exercise) => {
        setName(exercise.name);
        setSets(exercise.sets);
        setSetNumber(exercise.sets.length);
      });
    }
  }, [props.selectedExerciseId]);

  const updateSet = () => {
    console.log(
      `Updating with ${reps}, ${weight}, and ${rpe}. Set number is ${setNumber}. Sets length${sets.length} `
    );
    const newSet = { reps: reps, weight: weight, rpe: rpe };
    if (setNumber === sets.length) {
      setSets([...sets, newSet]);
      setSetNumber(setNumber + 1);
    } else {
      //modify the sets array using setSets at the index of setNumber
      const updatedSets = sets.map((set, index) => {
        if (index === setNumber) {
          // Modify the set at this index
          return newSet;
        }
        return set;
      });
      setSets(updatedSets);
      setSetNumber(sets.length);
    }
    console.log(`Sets is now ${sets}`);
  };

  if (!props.selectedExerciseId) {
    return <div className="newExercise-container">No exercise selected.</div>;
  }
  return (
    <div className="newExercise-container">
      <div className="newExercise-search-container">
        <input
          className="newExercise-exerciseInput"
          placeholder="Add an exercise..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="newExercise-exerciseRecommendation">AI Search</div>
      </div>
      <div className="newExercise-setNumber-container">Set #{setNumber + 1}</div>
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
          <div className="newExercise-setInfoIndividual-text">Weight</div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
      </div>
      <div className="newExercise-previousSets-container">
        <div className="newExercise-previousSets-text">Previous sets:</div>
        <div className="newExercise-previousSets-sets">
          {sets.map((set, ix) => {
            return (
              <SetSquare
                key={ix}
                setIndex={ix}
                reps={set.reps}
                weight={set.weight}
                rpe={set.rpe}
                setSetNumber={setSetNumber}
                viewStyle={"create"}
              />
            );
          })}
        </div>
      </div>
      <div className="newWorkout-finishButton-container">
        <div className="newExercise-finishButton" onClick={updateSet}>
          Save Set
        </div>
        <div className="newExercise-finishButton">Save Exercise</div>
      </div>
    </div>
  );
};

export default NewExercise;
