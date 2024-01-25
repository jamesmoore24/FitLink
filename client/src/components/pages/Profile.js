import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";

import Post from "../modules/Posts/Post";
import ActivityTracker from "../modules/Profile/ActivityTracker";

import ExampleProfile from "../../public/example_profile.jpg";

import "../../utilities.css";
import "./Profile.css";

/**
 * Page component to display when at the "/profile" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Profile = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    get("/api/workouts/profile").then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      setWorkouts(reversedWorkoutObjs);
    });

    get("/api/user/info", { id: props.userId }).then((user) => {
      setName(user.name);
      setBio(user.bio);
    });
  }, []);

  const updateUser = () => {
    post("/api/user/update", { id: props.userId, name: name, bio: bio }).then((user) => {});
  };

  let workoutsList = null;
  const hasWorkouts = workouts.length !== 0;
  if (hasWorkouts) {
    workoutsList = workouts.map((workoutObj) => (
      <Post
        key={`Card_${workoutObj._id}`}
        workoutId={workoutObj._id}
        creator_name={workoutObj.creator_name}
        creator_id={workoutObj.creator_id}
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
      />
    ));
  } else {
    workoutsList = <div className="feed-text-top">No personal saved or posted workouts yet!</div>;
  }

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="profile-background-container">
      <div className="profile-left-container">
        <div className="profile-personalInfo-container">
          <div className="profile-pfp-container">
            <img className="profile-pfp" src={ExampleProfile} />
          </div>
          <div className="profile-personalInfo-text">Name</div>
          <div className="profile-textInput-container">
            <input
              className="profile-textInput"
              placeholder="Add your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="newExercise-exerciseRecommendation">Save</div>
          </div>
          <div className="profile-personalInfo-text">Bio</div>
          <div className="profile-textInput-container">
            <input
              className="profile-textInput"
              placeholder="Add a bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="newExercise-exerciseRecommendation">Save</div>
          </div>
        </div>
      </div>

      <div className="profile-right-container">
        <ActivityTracker userId={props.userId} />
        {workoutsList}
      </div>
    </div>
  );
};

export default Profile;
