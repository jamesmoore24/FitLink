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
  const getColorForValue = (rpe) => {
    const rpeParsed = Math.round(parseInt(rpe)) - 1;
    // Define your color scale here
    // This is a simple example; adjust with your actual color scale
    const colors = [
      "#ff4b261F", // Very light (Almost transparent)
      "#ff4b2619", // Significantly light
      "#ff4b2633", // Much lighter
      "#ff4b264C", // Lighter
      "#ff4b2666", // Moderately light
      "#ff4b267F", // Less light
      "#ff4b2699", // Slightly light
      "#ff4b26B2", // Approaching full color
      "#ff4b26CC", // Near full color
      "#ff4b26E6", // Almost full color
    ];
    return colors[Math.floor(rpeParsed) - 1];
  };
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
      style={{
        backgroundColor:
          props.setNumber === props.setIndex ? "#FFFFFFFF" : getColorForValue(props.rpe),
      }}
    >
      <div className="setSquare-text-top">{props.reps}</div>
      <div className="setSquare-text">{props.weight}</div>
    </div>
  );
};

export default SetSquare;
