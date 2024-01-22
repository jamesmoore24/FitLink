import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MagnifyingGlass from "../../../public/search.png";

import "./NewExercise.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} activeExercise id of current logged in user
 */
const NewExercise = (props) => {
  const [exerciseInput, setExerciseInput] = useState("");

  if (!props.activeExercise) {
    return <div className="newExercise-container">No exercise selected.</div>;
  }
  return (
    <div className="newExercise-container">
      <div className="newExercise-search-container">
        <img src={MagnifyingGlass} className="newExercise-search-image" />
        <input
          className="newExercise-exerciseInput"
          placeholder="Add an exercise..."
          value={exerciseInput}
          onChange={(e) => setExerciseInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default NewExercise;
