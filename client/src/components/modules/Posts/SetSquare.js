import React from "react";

import "./SetSquare.css";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const SetSquare = ({ userId, handleLogin, handleLogout }) => {
  //need to use map or something to render all of the squares

  //should make an api call here to grab the information for the certain exercises for the specific post

  return (
    <div className="setSquare-container">
      <div className="setSquare-text-top">5</div>
      <div className="setSquare-text">135</div>
    </div>
  );
};

export default SetSquare;
