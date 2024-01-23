import React, { useState } from "react";

import "./SetSquare.css";

/**
 * @param {number} setIndex
 * @param {string} reps
 * @param {() => {}} setReps
 * @param {string} weight
 * @param {() => {}} setWeight
 * @param {string} rpe
 * @param {() => {}} setRPE
 * @param {string} setNumber
 * @param {() => {}} setSetNumber
 * @param {() => {}} deleteSet
 * @param {string} viewStyle //either "create" or "view"
 */
const SetSquare = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  //TO DO IMPLEMENT THE SHADING BASED ON RPE
  return (
    <div
      className={
        props.viewStyle === "create"
          ? props.setNumber == props.setIndex
            ? "setSquare-container-create-chosen"
            : "setSquare-container-create"
          : "setSquare-container"
      }
      onClick={() => {
        if (props.viewStyle == "create") {
          props.setSetNumber(props.setIndex);
          props.setReps(props.reps);
          props.setWeight(props.weight);
          props.setRPE(props.rpe);
          console.log("CLICKED");
        }
      }}
    >
      <div className="setSquare-text-top">{props.reps}</div>
      <div className="setSquare-text">{props.weight}</div>
    </div>
  );
};

export default SetSquare;
