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
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    get("/api/workouts/profile").then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      console.log(workoutObjs);
      setWorkouts(reversedWorkoutObjs);
    });

    //get("/api/nukedb").then((data) => console.log("Database objects deleted"));
    get("/api/user/info").then((user) => {
      console.log("HERE");
      setName(user.name);
      setBio(user.bio);
      setProfilePicture(user.profile_picture);
    });
  }, []);

  const updateUser = () => {
    post("/api/user/update", { name: name, bio: bio }).then((user) => {
      console.log("User information updated in database");
    });
  };

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
        timestamp={workoutObj.timestamp}
        userId={props.userId}
        starred={workoutObj.starred}
        likes={workoutObj.likes}
        deleteWorkout={deleteWorkout}
      />
    ));
  } else {
    workoutsList = <div className="feed-text-top">No personal saved or posted workouts yet!</div>;
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(selectedFile);
      console.log(file);
      setSelectedFile(file);
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async function uploadImage() {
    console.log("BELOW IS SELECTED");
    console.log(selectedFile);
    const base64String = await convertToBase64(selectedFile);
    const imageData = base64String.split(",")[1];

    // Now, send this string to your API endpoint
    post("/api/image/upload", { file: imageData }).then((user) => {
      console.log("IMAGE SAVED");
      setProfilePicture(user.profile_picture);
    });
  }

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="profile-background-container">
      <div className="profile-left-container">
        <div className="profile-personalInfo-container">
          <div className="profile-pfp-container">
            <img className="profile-pfp" src={profilePicture} />
            <label htmlFor="file-upload" className="profile-pfpUpload-container">
              Select Profile Photo
            </label>
            <input
              id="file-upload"
              type="file"
              name="sampleFile"
              onChange={handleImageChange}
              className="profile-pfpUpload-container"
            />
            <div className="profile-pfpUpload-container" onClick={uploadImage}>
              Upload Photo
            </div>
          </div>
          <div className="profile-personalInfo-text">Name</div>
          <div className="profile-textInput-container">
            <input
              className="profile-textInput"
              placeholder="Add your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="newExercise-exerciseRecommendation" onClick={updateUser}>
              Save
            </div>
          </div>
          <div className="profile-personalInfo-text">Bio</div>
          <div className="profile-textInput-container">
            <input
              className="profile-textInput"
              placeholder="Add a bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="newExercise-exerciseRecommendation" onClick={updateUser}>
              Save
            </div>
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
