import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

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
 * @param {number} index
 * @param {string} selectedExercise
 * @param {() => {}} setSelectedExercise
 * @param {string} viewingStyle //either "create" or "feed"
 * @param {string} exerciseName
 *
 */
const ExerciseSection = (props) => {
  //need to use map or something to render all of the squares
  const [trashCanSrc, setTrashCanSrc] = useState(TrashCan);

  return (
    <>
      <div
        className={
          props.viewingStyle === "create"
            ? props.selectedExercise === props.exerciseId
              ? "exerciseSection-selected-container"
              : "exerciseSection-container"
            : "exerciseSection-container"
        }
        onClick={() => {
          props.setSelectedExercise(props.exerciseId);
        }}
      >
        {props.viewingStyle === "create" && (
          <img
            src={trashCanSrc}
            className="exerciseSection-trashCan"
            onMouseEnter={() => {
              console.log(props.selectedExercise);
              setTrashCanSrc(TrashCanHalfFilled);
            }}
            onMouseLeave={() => setTrashCanSrc(TrashCan)}
            onClick={() => {
              console.log("Clicked can");
              props.deleteExercise(props.exerciseId);
            }}
          />
        )}
        <div className="exerciseSection-text-container">
          {props.index + 1}. {props.exerciseName}
        </div>
        <div className="exerciseSection-set-container"></div>
      </div>
    </>
  );
};

export default ExerciseSection;
