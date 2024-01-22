import React from "react";

import "./ExerciseSection.css";

import ProfilePicture from "../../../public/example_profile.jpg";
import Medal from "../../../public/gold-medal.png";
import SetSquare from "./SetSquare";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const ExerciseSection = ({ userId, handleLogin, handleLogout }) => {
  //need to use map or something to render all of the squares

  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <>
      <div className="exerciseSection-container">
        <div className="exerciseSection-text-container">Bench Press</div>
        <div className="exerciseSection-set-container">
          <SetSquare />
          <SetSquare />
          <SetSquare />
        </div>
      </div>
    </>
  );
};

export default ExerciseSection;
