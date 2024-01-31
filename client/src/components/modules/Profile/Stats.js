import React, { useState, useEffect, useRef } from "react";
import "./Stats.css";
import { useParams } from "react-router-dom";
import { get, post } from "../../../utilities";

import SetSquare from "../Posts/SetSquare";

import Search from "../../../public/search.png";
import XMark from "../../../public/x-mark.png";
import XMarkHover from "../../../public/x-mark-filled.png";

const Stats = () => {
  const [dateRange, setDateRange] = useState("year");
  const [selectedName, setSelectedName] = useState(null);
  const [search, setSearch] = useState("");
  const [xMarkSrc, setXMarkSrc] = useState(XMark);
  const [exerciseList, setExerciseList] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const [maxWeight, setMaxWeight] = useState(0);
  const [numSets, setNumSets] = useState(0);
  const [allExercises, setAllExercises] = useState([]);
  const [filteredSets, setFilteredSets] = useState([]);
  const { userId } = useParams();

  const menuRef = useRef(null);

  useEffect(() => {
    get("/api/exercises/user/any", { id: userId }).then((exercises) => {
      if (exercises && exercises.length) {
        setAllExercises(exercises);
        const newExercises = exercises.map((exercise) => exercise.name);

        // Update exerciseList, ensuring no duplicates
        setExerciseList((prevExerciseList) => [...new Set([...prevExerciseList, ...newExercises])]);
      }
    });
  }, []);

  useEffect(() => {
    const activeItem = menuRef.current.querySelector(".stats-menu-item.active");
    if (activeItem) {
      setUnderlineStyle({
        width: activeItem.offsetWidth,
        left: activeItem.offsetLeft,
      });
    }
  }, [dateRange]);

  useEffect(() => {
    if (selectedName !== null) {
      // Function to calculate the start date of the selected date range
      const getStartDate = (range) => {
        const today = new Date();
        if (range === "year") {
          today.setFullYear(today.getFullYear() - 1);
        } else if (range === "month") {
          today.setMonth(today.getMonth() - 1);
        } else if (range === "week") {
          today.setDate(today.getDate() - 7);
        }
        return today;
      };

      const startDate = getStartDate(dateRange);

      const relevantExercises = allExercises.filter((exercise) => {
        const exerciseDate = new Date(exercise.timestamp);
        return exercise.name === selectedName && exerciseDate >= startDate;
      });

      const maxWeight = relevantExercises.reduce((max, exercise) => {
        const maxWeightInExercise = Math.max(...exercise.sets.map((set) => set.weight));
        return Math.max(max, maxWeightInExercise);
      }, 0);
      setMaxWeight(maxWeight);

      // Calculate the cumulative number of sets from the relevant exercises
      const totalSets = relevantExercises.reduce(
        (total, exercise) => total + exercise.sets.length,
        0
      );
      setNumSets(totalSets);

      const sets = relevantExercises.reduce((allSets, exercise) => {
        // Map each set to a new object that includes the set and the exercise's timestamp
        const setsWithExerciseTimestamp = exercise.sets.map((set) => ({
          set: set,
          timestamp: exercise.timestamp,
        }));
        // Concatenate these new objects to the accumulator array
        return allSets.concat(setsWithExerciseTimestamp);
      }, []);

      setFilteredSets(sets);
    }
  }, [dateRange, selectedName, allExercises]);

  return (
    <>
      <div className="stats-container">
        <div className="stats-nonText-container">
          <div className="stats-query-container">
            <div className="stats-title-container">Stats</div>
            <div className="newExercise-searchSuggestion-container">
              <div
                className={`newExercise-search-container ${
                  selectedName === null ? "hover-effect" : ""
                }`}
              >
                <div className="newExercise-searchText-container">
                  {selectedName === null && (
                    <img src={Search} className="newExercise-search-image" />
                  )}
                  {selectedName === null ? (
                    <input
                      className="newExercise-exerciseInput"
                      placeholder="Enter an exercise..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  ) : (
                    <div className="newExercise-exerciseRecommendation">
                      {selectedName}
                      <img
                        className="newExercise-delete-icon"
                        src={xMarkSrc}
                        onMouseEnter={() => setXMarkSrc(XMarkHover)}
                        onMouseLeave={() => setXMarkSrc(XMark)}
                        onClick={(e) => {
                          setSelectedName(null);
                          setSearch("");
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="stats-suggestions-container">
                <div className="newExercise-suggestions-text">Select one: </div>
                {selectedName === null &&
                  exerciseList
                    .filter((exercise) => exercise.toLowerCase().includes(search.toLowerCase()))
                    .map((exercise, ix) => {
                      return (
                        <div
                          key={ix}
                          className="stats-exerciseRecommendation"
                          onClick={() => {
                            setSelectedName(exercise);
                          }}
                        >
                          {exercise}
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="stats-menu" ref={menuRef}>
              <div
                className={`stats-menu-item ${dateRange === "year" ? "active" : ""}`}
                onClick={() => setDateRange("year")}
              >
                Year
              </div>
              <div
                className={`stats-menu-item ${dateRange === "month" ? "active" : ""}`}
                onClick={() => setDateRange("month")}
              >
                Month
              </div>
              <div
                className={`stats-menu-item ${dateRange === "week" ? "active" : ""}`}
                onClick={() => setDateRange("week")}
              >
                Week
              </div>
              <div className="stats-menu-underline" style={underlineStyle}></div>
            </div>
          </div>
          <div className="stats-display-container">
            {selectedName !== null && (
              <>
                <div className="stats-display-text">Max weight: {maxWeight}</div>
                <div className="stats-display-text">Number of sets: {numSets}</div>
                <div className="stats-setsDisplay-container">
                  {filteredSets.map((set, ix) => {
                    const date = new Date(set.timestamp);
                    const formattedDate = (date.getMonth() + 1 + "/" + date.getDate()).padStart(
                      2,
                      "0"
                    );
                    return (
                      <SetSquare
                        key={ix}
                        setIndex={ix}
                        reps={set.set.reps}
                        weight={set.set.weight}
                        rpe={set.set.rpe}
                        viewStyle={"view"}
                        date={formattedDate}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/*
 */
export default Stats;
