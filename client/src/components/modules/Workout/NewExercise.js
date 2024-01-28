import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";
import SetSquare from "../Posts/SetSquare";

import TrashCan from "../../../public/trashcan.png";
import TrashCanHalfFilled from "../../../public/trashcan_half_filled.png";

import "./NewExercise.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} selectedExerciseId
 * @param {string} setNotificationOn
 * @param {string} setNotificationText
 * @param {[ExerciseObject]} exercises
 * @param {() => {}} deleteSet
 * @param {() => {}} setExercises
 */
const NewExercise = (props) => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRPE] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState([]);
  const [setNumber, setSetNumber] = useState(0);
  const [setChange, setSetChange] = useState(false);
  const [trashCanSrc, setTrashCanSrc] = useState(TrashCan);
  const [errorText, setErrorText] = useState("");

  //everytime the selected exercise changes, get information about exercise and store in variables
  useEffect(() => {
    if (props.selectedExerciseId) {
      get("/api/exercise/", {
        id: props.selectedExerciseId,
      })
        .then((exercise) => {
          setName(exercise.name);
          setSets(exercise.sets);
          setSetNumber(exercise.sets.length);
          setReps("");
          setRPE("");
          setWeight("");
          setErrorText("");
        })
        .catch((error) => {});
    }
  }, [props.selectedExerciseId]);

  //this gets triggered anytime the sets object updates
  useEffect(() => {
    if (props.selectedExerciseId && sets) {
      post("/api/exercise/update", { id: props.selectedExerciseId, name: name, sets: sets }).then(
        (exercise) => {
          props.setExercises(
            props.exercises.map((ex) => {
              if (ex._id === props.selectedExerciseId) {
                return exercise;
              } else {
                return ex;
              }
            })
          );
        }
      );
    }
  }, [setChange]);

  const updateSet = () => {
    const repsParsed = Math.round(parseInt(reps));
    const weightParsed = Math.round(parseInt(weight));
    const rpeParsed = Math.round(parseInt(rpe));
    if (
      Number.isInteger(repsParsed) &&
      Number.isInteger(weightParsed) &&
      Number.isInteger(rpeParsed) &&
      rpeParsed <= 10 &&
      name.length > 0
    ) {
      const newSet = { reps: repsParsed, weight: weightParsed, rpe: rpeParsed };
      setName(name);
      if (setNumber === sets.length) {
        setSets([...sets, newSet]);
        setSetNumber(setNumber + 1);
        setReps("");
        setRPE("");
        setWeight("");
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
        setReps("");
        setRPE("");
        setWeight("");
        setSetNumber(sets.length);
      }
      props.setNotificationOn(true);
      props.setNotificationText("Exercise saved!");
      setErrorText("");
    } else if (!name) {
      setErrorText("Please enter the name of the exercise.");
    } else {
      setErrorText("Please enter valid numeric values before saving.");
    }
    setSetChange(!setChange);
  };

  const deleteSet = () => {
    setSets(sets.filter((set, ix) => ix !== setNumber));
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
      <div className="newExercise-setNumber-container">
        {setNumber === sets.length ? "New" : "Editing"} set #{setNumber + 1}
        {setNumber !== sets.length && (
          <img
            src={trashCanSrc}
            className="newExercise-setDelete"
            onMouseEnter={() => {
              setTrashCanSrc(TrashCanHalfFilled);
            }}
            onMouseLeave={() => setTrashCanSrc(TrashCan)}
            onClick={deleteSet}
          />
        )}
      </div>
      <div className="newExercise-setInfo-container">
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text-container">
            <div className="newExercise-setInfoIndividual-titleText">Reps</div>
            <div className="newExercise-setInfoIndividual-subText"></div>
          </div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text-container">
            <div className="newExercise-setInfoIndividual-titleText">Weight</div>
            <div className="newExercise-setInfoIndividual-subText">(lbs)</div>
          </div>
          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="newExercise-setInfoIndividual-container">
          <div className="newExercise-setInfoIndividual-text-container">
            <div className="newExercise-setInfoIndividual-titleText">Difficulty</div>
            <div className="newExercise-setInfoIndividual-subText">(1-10)</div>
          </div>

          <input
            className="newExercise-setInfoIndividual-input"
            placeholder="?"
            value={rpe}
            onChange={(e) => setRPE(e.target.value)}
          />
        </div>
      </div>
      <div className="newExercise-previousSets-container">
        <div className="newExercise-previousSets-text">
          {sets.length === 0 ? "No previous sets" : "Previous sets:"}
        </div>
        <div className="newExercise-previousSets-sets">
          {sets.map((set, ix) => {
            return (
              <SetSquare
                key={ix}
                setIndex={ix}
                reps={set.reps}
                setReps={setReps}
                weight={set.weight}
                setWeight={setWeight}
                rpe={set.rpe}
                setRPE={setRPE}
                setNumber={setNumber}
                setSetNumber={setSetNumber}
                viewStyle={"create"}
              />
            );
          })}
        </div>
      </div>
      <div className="newWorkout-finishButton-container">
        <div className="newWorkout-errorSubmit-text">{errorText}</div>
        <div className="newExercise-finishButton" onClick={updateSet}>
          Save Set
        </div>
      </div>
    </div>
  );
};

export default NewExercise;
