import React, { useState, useEffect } from "react";

import "./ExerciseSection.css";

import TrashCan from "../../../public/trashcan.png";
import TrashCanHalfFilled from "../../../public/trashcan_half_filled.png";
import TrashCanFilled from "../../../public/trashcan_filled.png";
import SetSquare from "./SetSquare";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} exerciseId
 * @param {string}
 * @param {string} selectedExercise
 * @param {() => {}} setSelectedExercise
 * @param {() => {}} deleteExercise
 * @param {() => {}} setDeletedExercise
 */
const ExerciseSection = (props) => {
  //need to use map or something to render all of the squares
  const [trashCanSrc, setTrashCanSrc] = useState(TrashCan);
  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <>
      <div
        className={
          props.selectedExercise === props.exerciseId
            ? "exerciseSection-selected-container"
            : "exerciseSection-container"
        }
        onClick={() => {
          props.setSelectedExercise(props.exerciseId);
        }}
      >
        <img
          src={trashCanSrc}
          className="exerciseSection-trashCan"
          onMouseEnter={() => {
            console.log("HELLO");
            setTrashCanSrc(TrashCanHalfFilled);
          }}
          onMouseLeave={() => setTrashCanSrc(TrashCan)}
          onClick={() => {
            console.log("Clicked can");
            props.deleteExercise(props.exerciseId);
          }}
        />
        <div className="exerciseSection-text-container">Bench Press</div>
        <div className="exerciseSection-set-container">
          <SetSquare />
          <SetSquare />
          <SetSquare />
          <SetSquare />
          <SetSquare />
        </div>
      </div>
    </>
  );
};

export default ExerciseSection;
