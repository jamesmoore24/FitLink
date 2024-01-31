import React, { useState, useEffect, useRef } from "react";
import Post from "../modules/Posts/Post";
import Friends from "../modules/Friends/Friends";
import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Feed.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 * @param {() => {}} setNotificationOn
 * @param {() => {}} setNotificationText
 */
const Feed = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const menuRef = useRef(null);
  const [workoutView, setWorkoutView] = useState("explore");

  useEffect(() => {
    get("/api/workouts/feed").then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      setWorkouts(reversedWorkoutObjs);
    });
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      const activeItem = menuRef.current.querySelector(".profile-menu-item.active");
      if (activeItem) {
        setUnderlineStyle({
          width: activeItem.offsetWidth,
          left: activeItem.offsetLeft,
        });
      }
    }

    if (workoutView === "explore") {
      get(`/api/workouts/feed/`).then((workoutObjs) => {
        let reversedWorkoutObjs = workoutObjs.reverse();
        setWorkouts(reversedWorkoutObjs);
      });
    } else {
      get(`/api/workouts/feed/friends`).then((workoutObjs) => {
        let reversedWorkoutObjs = workoutObjs.reverse();
        setWorkouts(reversedWorkoutObjs);
      });
    }
  }, [workoutView]);

  const deleteWorkout = (workout_id) => {
    post("/api/workout/delete", { workout_id: workout_id }).then((workout) => {
      setWorkouts(workouts.filter((wkt) => wkt._id !== workout_id));
    });
  };

  let workoutsList = null;
  const hasWorkouts = workouts.length !== 0;
  if (hasWorkouts) {
    workoutsList = workouts.map((workoutObj) => (
      <Post
        key={`Card_${workoutObj._id}`}
        workout_id={workoutObj._id}
        creator_name={workoutObj.creator_name}
        creator_id={workoutObj.creator_id}
        posted={workoutObj.posted}
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
        deleteWorkout={deleteWorkout}
      />
    ));
  }

  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return (
    <div className="feed-background-container">
      <div className="feed-postTitle-container">
        <div className="profile-menu-container">
          <div className="profile-menu" ref={menuRef}>
            <div
              className={`profile-menu-item ${workoutView === "explore" ? "active" : ""}`}
              onClick={() => setWorkoutView("explore")}
            >
              Explore
            </div>
            <div
              className={`profile-menu-item ${workoutView === "friends" ? "active" : ""}`}
              onClick={() => setWorkoutView("friends")}
            >
              Friends
            </div>
            <div className="profile-menu-underline" style={underlineStyle}></div>
          </div>
        </div>
        {workoutsList}
      </div>

      <div className="feed-activityFriends-container">
        <Friends
          setNotificationOn={props.setNotificationOn}
          setNotificationText={props.setNotificationText}
        />
      </div>
    </div>
  );
};

export default Feed;
