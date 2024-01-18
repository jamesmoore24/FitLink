import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";

import "../../utilities.css";
import "./Landing.css";

import VideoPlayer from "../modules/SignUp/Video";

/**
 * Page component to display when at the "/" route
 *
 * @param {String} userId
 *
 */
const Landing = (props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    "working-out",
    "bench-pressing",
    "biking",
    "squatting",
    "connecting",
    "deadlifting",
    "running",
    "tracking exercises",
    "lunging",
    "powerlifting",
    "rowing",
    "cardio",
  ];
  const duration = 3000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex === words.length - 1 ? 0 : prevIndex + 1));
    }, duration);

    return () => clearInterval(intervalId);
  }, [words, duration]);
  return (
    <>
      <VideoPlayer />
      <div className="overlay-container">
        <div className="text-container">
          <h2 className="text-container">The future of </h2>
          <div className="word-rotator">
            {words.map((word, index) => (
              <span
                key={index}
                className={`rotating-word ${index === currentWordIndex ? "visible" : "hidden"}`}
              >
                {word}
              </span>
            ))}
          </div>
          <h1 className="text-container">is finally here.</h1>
        </div>
        <div className="text-container">Placeholder for laptop image demo</div>
      </div>
    </>
  );
};

export default Landing;
