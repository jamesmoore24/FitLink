import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import "./ActivityTracker.css";

/**
 * @param {string} userId
 */
const ActivityTracker = (props) => {
  const [exercises, setExercises] = useState([]);
  const [setData, setSetData] = useState([]);
  //Obtain the date for today and subtract one year in javascript
  //get all of the exercises for a particular user
  //parse the data and take the amount of sets done for each exercise and sum them
  //calculate a maximum and scale all of the other set #'s for each day respectively
  //Iterate through the normalized set number array (1-10) and render a square with the color that matches the normalized number
  //somehow make the squares wrap from bottom to top once the container reaches a certain max heightlz

  useEffect(() => {
    get("/api/exercises/year", { creator_id: props.userId }).then((exercises) => {
      console.log(`HEREEE ${exercises}`);
      let reversedExercises = exercises.reverse();
      setExercises(reversedExercises);
    });

    //get("/api/nukedb").then((data) => console.log("Database objects deleted"));
  }, []);

  useEffect(() => {
    console.log("CALCULATING DATA ARRAY");
    let index_exercises = 0;
    let resultArray = [];
    let dateToCompare = new Date();

    dateToCompare.setFullYear(dateToCompare.getFullYear() - 1);

    for (let i = 0; i < 365; i++) {
      let setSum = 0;
      dateToCompare.setDate(dateToCompare.getDate() + 1);

      // Ensure the dateToCompare is at the end of the day for accurate comparison
      let endOfDay = new Date(dateToCompare);
      endOfDay.setHours(23, 59, 59, 999);

      while (
        index_exercises < exercises.length &&
        new Date(exercises[index_exercises].timestamp) <= endOfDay
      ) {
        console.log(`IN HERE ${exercises[index_exercises].sets.length}`);
        setSum += exercises[index_exercises].sets.length;
        index_exercises++;
      }

      resultArray.push(setSum);
    }

    const maxValue = Math.max(...resultArray);

    const normalizedDataSet = resultArray.map((value) => {
      return 1 + (value * 9) / maxValue;
    });
    console.log(normalizedDataSet);
    setSetData(normalizedDataSet);
  }, [exercises]);

  return (
    <div className="activityTracker-container">
      <div className="activityTracker-title">Activity this year</div>
    </div>
  );
};

export default ActivityTracker;
