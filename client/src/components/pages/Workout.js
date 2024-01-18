import React from "react";

import "../../utilities.css";
import "./Feed.css";

/**
 * Page component to display when at the "/workout" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Workout = (props) => {
  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return <div>Workout</div>;
};

export default Workout;
