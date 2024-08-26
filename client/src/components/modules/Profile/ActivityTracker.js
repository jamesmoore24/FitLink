import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import { useParams } from "react-router-dom";

import "./ActivityTracker.css";

/**
 * @param {string} userId
 */
const ActivityTracker = (props) => {
  const [exercises, setExercises] = useState([]);
  const [setData, setSetData] = useState([]);
  const [topText, setTopText] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    setTopText(getMonthSwitches());
    get(`/api/workouts/profile/${userId}`).then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      const exercisePromises = reversedWorkoutObjs.map((workout) =>
        get("/api/exercises", { parent: workout._id }).then((exercises) =>
          exercises.map((exercise) => ({
            ...exercise,
            timestamp: workout.timestamp,
          }))
        )
      );
      Promise.all(exercisePromises).then((exercisesArrays) => {
        const flattenedExercises = exercisesArrays.flat();
        setExercises(flattenedExercises);
      });
    });
  }, []);

  useEffect(() => {
    let resultArray = [];
    let dateToCompare = new Date();
    dateToCompare.setFullYear(dateToCompare.getFullYear() - 1);
    dateToCompare.setHours(0, 0, 0, 0); // Set to start of day
    console.log(exercises);

    for (let i = 0; i < 365; i++) {
      dateToCompare.setDate(dateToCompare.getDate() + 1);
      let endOfDay = new Date(dateToCompare);
      endOfDay.setHours(23, 59, 59, 999);

      let setSum = exercises.reduce((sum, exercise) => {
        let exerciseDate = new Date(exercise.timestamp);
        if (exerciseDate > dateToCompare && exerciseDate <= endOfDay) {
          return sum + exercise.sets.length;
        }
        return sum;
      }, 0);

      let formattedDate = `${dateToCompare.getMonth() + 1}/${dateToCompare.getDate()}`;
      resultArray.push({
        date: formattedDate,
        setSum: setSum,
      });
    }

    const maxValue = Math.max(...resultArray.map((record) => record.setSum));

    const normalizedDataSet = resultArray.map((record) => ({
      ...record,
      normalizedSets: record.setSum > 0 ? 1 + (record.setSum * 9) / maxValue : 0,
    }));
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
    return colors[Math.floor(value) - 1] || colors[0];
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
      <div className="activityTracker-title-container">
        <div className="activityTracker-title">Activity this year</div>
      </div>

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
                    style={{ backgroundColor: getColorForValue(value.normalizedSets) }}
                  >
                    <div className="activityTracker-square-label">
                      {value.date}: {value.setSum} set{value.setSum == 1 ? "" : "s"}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTracker;
