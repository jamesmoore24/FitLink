import React, { useState } from "react";

import "./SetSquare.css";

/**
 * @param {number} setIndex
 * @param {string} reps
 * @param {string} weight
 * @param {string} rpe
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
        props.viewStyle === "create" ? "setSquare-container-create" : "setSquare-container"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        props.setSetNumber(props.setIndex);
        console.log("CLICKED");
      }}
    >
      <div className="setSquare-text-top">{props.reps}</div>
      <div className="setSquare-text">{props.weight}</div>
    </div>
  );
};

export default SetSquare;
