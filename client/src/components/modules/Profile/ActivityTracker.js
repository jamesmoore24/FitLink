import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import "./ActivityTracker.css";

/**
 * @param {string} userId
 */
const ActivityTracker = (props) => {
  const [exercises, setExercises] = useState([]);
  const [setData, setSetData] = useState([]);
  const [topText, setTopText] = useState([]);
  //Obtain the date for today and subtract one year in javascript
  //get all of the exercises for a particular user
  //parse the data and take the amount of sets done for each exercise and sum them
  //calculate a maximum and scale all of the other set #'s for each day respectively
  //Iterate through the normalized set number array (1-10) and render a square with the color that matches the normalized number
  //somehow make the squares wrap from bottom to top once the container reaches a certain max heightlz

  useEffect(() => {
    setTopText(getMonthSwitches());
    get("/api/exercises/year", { creator_id: props.userId }).then((exercises) => {
      let reversedExercises = exercises.reverse();
      setExercises(reversedExercises);
    });

    //get("/api/nukedb").then((data) => console.log("Database objects deleted"));
  }, []);

  useEffect(() => {
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
        setSum += exercises[index_exercises].sets.length;
        index_exercises++;
      }

      resultArray.push(setSum);
    }

    const maxValue = Math.max(...resultArray);

    const normalizedDataSet = resultArray.map((value) => {
      return 1 + (value * 9) / maxValue;
    });
    setSetData(normalizedDataSet);
  }, [exercises]);

  const getColorForValue = (value) => {
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
    return colors[Math.floor(value) - 1];
  };

  function getMonthSwitches() {
    const result = [];
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    let previousMonth = currentDate.getMonth();

    for (let i = 0; i < 26; i++) {
      // Add two weeks to the current date
      currentDate.setDate(currentDate.getDate() + 14);

      // Check if the month has changed
      if (currentDate.getMonth() !== previousMonth) {
        // Month has changed, add abbreviated month name to the array
        result.push(currentDate.toLocaleString("en-us", { month: "short" }));
        previousMonth = currentDate.getMonth();
      } else {
        // Month hasn't changed, add empty string
        result.push("");
      }
    }
    return result;
  }

  return (
    <div className="activityTracker-container">
      <div className="activityTracker-title">Activity this year:</div>
      {exercises.length === 0 ? (
        <div className="activityTracker-title">Create a workout first!</div>
      ) : (
        <div className="activityTracker-graphText-container">
          <div className="activityTracker-topText-container">
            {topText.map((month, ix) => {
              return (
                <div key={ix} className="activityTracker-squareText">
                  {month}
                </div>
              );
            })}
          </div>
          <div className="activityTracker-sideTextGraph-container">
            <div className="activityTracker-sideText-container">
              <div className="activityTracker-squareText">Mon</div>
              <div className="activityTracker-squareText"></div>
              <div className="activityTracker-squareText">Wed</div>
              <div className="activityTracker-squareText"></div>
              <div className="activityTracker-squareText">Fri</div>
              <div className="activityTracker-squareText"></div>
              <div className="activityTracker-squareText">Sun</div>
            </div>
            <div className="activityTracker-graph-container ">
              {setData &&
                setData.map((value, index) => (
                  <div
                    key={index}
                    className="activityTracker-square"
                    style={{ backgroundColor: getColorForValue(value) }}
                    title={`Value: ${value}`}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;
