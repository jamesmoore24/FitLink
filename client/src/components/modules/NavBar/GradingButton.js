import React from "react";
import "./GradingButton.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {funct}
 */
const GradingButton = ({ handleGradingLogin }) => {
  return (
    <div className="gradingButton-container" onClick={handleGradingLogin}>
      Grading Login
    </div>
  );
};

export default GradingButton;
