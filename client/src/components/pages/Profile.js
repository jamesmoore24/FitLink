import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { get, post } from "../../utilities";

import Post from "../modules/Posts/Post";
import ActivityTracker from "../modules/Profile/ActivityTracker";
import Stats from "../modules/Profile/Stats";

import "../../utilities.css";
import "./Profile.css";

/**
 * Page component to display when at the "/profile" route
 *
 * Proptypes
 * @param {() => {boolean}} setNotificationOn
 * @param {() => {string}} setNotificationText
 */
const Profile = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [changedSelectedFile, setChangedSelectedFile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState("");
  const [changedProfilePicture, setChangedProfilePicture] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [workoutView, setWorkoutView] = useState("all");

  const [underlineStyle, setUnderlineStyle] = useState({});
  const menuRef = useRef(null);
  const { userId } = useParams(); // This extracts userId from the URL

  useEffect(() => {
    get(`/api/workouts/profile/${userId}`).then((workoutObjs) => {
      let reversedWorkoutObjs = workoutObjs.reverse();
      setWorkouts(reversedWorkoutObjs);
    });

    get(`/api/user/profile/${userId}`).then((user) => {
      setName(user.name);
      setBio(user.bio);
      setProfilePicture(user.profile_picture);
    });
  }, [userId]);

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

    if (workoutView === "all") {
      get(`/api/workouts/profile/${userId}`).then((workoutObjs) => {
        let reversedWorkoutObjs = workoutObjs.reverse();
        setWorkouts(reversedWorkoutObjs);
      });
    } else if (workoutView === "drafts") {
      get(`/api/workouts/profile/drafts/${userId}`).then((workoutObjs) => {
        let reversedWorkoutObjs = workoutObjs.reverse();
        setWorkouts(reversedWorkoutObjs);
      });
    } else {
      get(`/api/workouts/profile/starred/${userId}`).then((workoutObjs) => {
        let reversedWorkoutObjs = workoutObjs.reverse();
        setWorkouts(reversedWorkoutObjs);
      });
    }
  }, [workoutView]);

  const updateUser = () => {
    post("/api/user/update", { name: name, bio: bio }).then((user) => {});
  };

  const deleteWorkout = (workout_id) => {
    post("/api/workout/delete", { workout_id: workout_id }).then((workout) => {
      setWorkouts(workouts.filter((wkt) => wkt._id !== workout_id));
      props.setNotificationOn(true);
      props.setNotificationText("Workout deleted!");
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
        changedProfilePicture={changedProfilePicture}
      />
    ));
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setProfilePictureError("");
      setChangedSelectedFile(true);
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
    try {
      setIsLoading(true);
      const base64String = await convertToBase64(selectedFile);
      const imageData = base64String.split(",")[1];

      // Send this string to your API endpoint and await its response
      const user = await post("/api/image/upload", { file: imageData });
      setProfilePicture(user.profile_picture);
      setProfilePictureError("");
      setChangedProfilePicture(!changedProfilePicture);
      setIsLoading(false);

      // Return a resolved promise
      return Promise.resolve();
    } catch (error) {
      console.error("Here Error uploading image:", error);
      setProfilePictureError("Error uploading image. Try a different image.");
      setIsLoading(false);

      // Return a rejected promise
      return Promise.reject(error);
    }
  }

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="profile-background-container">
      <div className="profile-left-container">
        <div className="profile-personalInfo-container">
          {userId === props.userId ? (
            isLoading ? (
              <div className="profile-editSpinner-container" />
            ) : (
              <div
                className="profile-edit-container"
                onClick={() => {
                  if (isEditing) {
                    if (selectedFile && changedSelectedFile) {
                      setChangedSelectedFile(false);
                      uploadImage()
                        .then(() => {
                          // Code to run if uploadImage succeeds
                          updateUser();
                          setIsEditing(!isEditing);
                          props.setNotificationOn(true);
                          props.setNotificationText("Profile saved!");
                        })
                        .catch((error) => {});
                    } else {
                      updateUser();
                      props.setNotificationOn(true);
                      props.setNotificationText("Profile saved!");
                      setIsEditing(!isEditing);
                    }
                  } else {
                    setIsEditing(!isEditing);
                  }
                }}
              >
                {isEditing ? "Save" : "Edit"}
              </div>
            )
          ) : (
            <></>
          )}
          <div className="profile-pfp-container">
            <div
              className="profile-pfp"
              src={profilePicture}
              style={{ backgroundImage: `url(${profilePicture})` }}
            />
            {isEditing && (
              <>
                <label htmlFor="file-upload" className="profile-pfpUpload-container">
                  Select Profile Photo
                </label>
                <div className="profile-pfpFileSelected-container">
                  {profilePictureError.length > 0 ? (
                    <span style={{ color: "red" }}>{profilePictureError}</span>
                  ) : (
                    <span style={{ color: "black" }}>{selectedFile.name}</span>
                  )}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  name="sampleFile"
                  onChange={handleImageChange}
                  className="profile-pfpUpload-container"
                />
              </>
            )}
          </div>
          <div className="profile-allTextInput-container">
            <div className="profile-textInputTitle-container">
              <div className="profile-personalInfo-text">Name</div>
              <div
                className={`profile-textInput-container ${isEditing ? "editable" : "non-editable"}`}
              >
                <input
                  className="profile-textInput"
                  placeholder="Add your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="profile-textInputTitle-container">
              <div className="profile-personalInfo-text">Bio</div>
              <div
                className={`profile-textInput-container-post ${
                  isEditing ? "editable" : "non-editable"
                }`}
              >
                {isEditing ? (
                  <input
                    className="profile-textInput"
                    placeholder={isEditing ? "Add your bio..." : ""}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    readOnly={!isEditing}
                  />
                ) : (
                  <div className="bio-display">{bio.length > 0 ? bio : "None"}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Stats />
      </div>

      <div className="profile-right-container">
        <ActivityTracker userId={props.userId} />
        {userId === props.userId ? (
          <div className="profile-menu-container">
            <div className="profile-menu" ref={menuRef}>
              <div
                className={`profile-menu-item ${workoutView === "all" ? "active" : ""}`}
                onClick={() => setWorkoutView("all")}
              >
                All
              </div>
              <div
                className={`profile-menu-item ${workoutView === "drafts" ? "active" : ""}`}
                onClick={() => setWorkoutView("drafts")}
              >
                Private
              </div>
              <div
                className={`profile-menu-item ${workoutView === "starred" ? "active" : ""}`}
                onClick={() => setWorkoutView("starred")}
              >
                Starred
              </div>
              <div className="profile-menu-underline" style={underlineStyle}></div>
            </div>
          </div>
        ) : (
          <div className="profile-menu-container">All Public Posts</div>
        )}

        {workoutsList}
      </div>
    </div>
  );
};

export default Profile;
