import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Landing.css";
import LaptopImage from "../../public/laptop-example.png";

import VideoPlayer from "../modules/SignUp/Video";

/**
 * Page component to display when at the "/" route
 *
 * @param {String} userId
 *
 */
const Landing = (props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const navigate = useNavigate();

  const words = [
    "working-out",
    "benching",
    "running",
    "connecting",
    "deadlifting",
    "biking",
    "squatting",
    "exercising",
    "lunging",
    "powerlifting",
    "rowing",
    "cardio",
  ];
  const duration = 3000;

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user && user._id) {
        navigate("/feed");
      }
    });
  }, []);

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
          <div className="text-fly-container-1">The future of</div>
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
          <div className="text-fly-container-2">is finally here.</div>
        </div>
        <div className="text-container-glass">
          <img src={LaptopImage} className="laptop-example-container" />
          <h3>
            FitLink makes it easy to track workouts, connect with other gymgoers and achieve your
            personal fitness goals in a fun and intuitive way.{" "}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Landing;
