import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import "./ActivityTracker.css";

/**
 * @param {string} userId
 */
const ActivityTracker = (props) => {
  const [workouts, setWorkouts] = useState([]);
  //Obtain the date for today and subtract one year in javascript
  //get all of the exercises for a particular user
  //parse the data and take the amount of sets done for each exercise and sum them
  //calculate a maximum and scale all of the other set #'s for each day respectively
  //Iterate through the normalized set number array (1-10) and render a square with the color that matches the normalized number
  //somehow make the squares wrap from bottom to top once the container reaches a certain max heightlz

  useEffect(() => {
    get("/api/exercises/year", { creator_id: props.userId }).then((workouts) => {
      console.log(workouts);
      setWorkouts(workouts);
    });

    //get("/api/nukedb").then((data) => console.log("Database objects deleted"));
  }, []);

  useEffect(() => {}, [workouts]);

  return (
    <div className="activityTracker-container">
      <div className="activityTracker-title">Activity this year</div>
    </div>
  );
};

export default ActivityTracker;
