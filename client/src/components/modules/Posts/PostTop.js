import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PostTop.css";
import { get, post } from "../../../utilities";

import Visible from "../../../public/visibile.png";
import NotVisible from "../../../public/not_visible.png";
import Star from "../../../public/star.png";
import StarFilled from "../../../public/star_filled.png";
import TrashCan from "../../../public/trashcan.png";
import TrashCanHalfFilled from "../../../public/trashcan_half_filled.png";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} workout_id
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} creator_pfp
 * @param {boolean} posted
 * @param {string} userId
 * @param {[ExerciseObjs]} exercises
 * @param {Date} timestamp
 * @param {Boolean} isStarred
 * @param {(PostObject) => {}} setIsStarred
 * @param {() => {}} deleteWorkout
 * @param {boolean} visibility
 * @param {() => {}} setVisibility
 */
const PostTop = (props) => {
  const [trashCanSrc, setTrashCanSrc] = useState(TrashCan);
  const [pbCount, setPBCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/exercises", { parent: props.workout_id }).then((exercises) => {
      let exercisesWithPR = exercises.filter((exercise) => exercise.pr === true);
      setPBCount(exercisesWithPR.length);
    });
  }, []);

  const date = new Date(props.timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Format the time into a string with AM/PM
  const formattedTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}${period}`;

  const toggleStar = () => {
    props.setIsStarred(!props.isStarred);
    post("/api/star/", { workoutId: props.workout_id, isStarred: !props.isStarred }).then(
      (star) => {}
    );
  };

  const toggleVisibility = () => {
    post("/api/workout/change-visibility", { id: props.workout_id }).then((post) => {
      props.setVisibility(!props.visibility);
    });
  };

  return (
    <div className="postTop-container">
      <div className="postTop-profilePictureAndDescription">
        <div className="postTop-profilePicture-container">
          <div
            className="postTop-profilePicture"
            src={props.creator_pfp}
            style={{ backgroundImage: `url(${props.creator_pfp})` }}
            onClick={() => {
              navigate(`/profile/${props.creator_id}`);
            }}
          />
        </div>

        <div className="postTop-profileNameFollowTime-container">
          <div className="postTop-profileName">{props.creator_name}</div>
          <div className="postTop-profileDescription">
            Workout at {formattedTime} @ the Z center
          </div>
        </div>
      </div>
      <div className="postTop-personalBest-container">
        <div className="postTop-starTrash-container">
          <img
            className="postTop-star"
            src={props.isStarred ? StarFilled : Star}
            onClick={() => {
              toggleStar();
            }}
          />
          {props.creator_id == props.userId && (
            <>
              <div
                style={{
                  backgroundImage: `url(${trashCanSrc})`,
                  backgroundSize: "cover", // Ensures the background image covers the whole div
                  backgroundPosition: "center", // Centers the background image
                }}
                className="postTop-star"
                onMouseEnter={() => {
                  setTrashCanSrc(TrashCanHalfFilled);
                }}
                onMouseLeave={() => setTrashCanSrc(TrashCan)}
                onClick={() => {
                  props.deleteWorkout(props.workout_id);
                }}
              >
                <div className="postTop-star-label">Delete workout</div>
              </div>
              <div
                style={{
                  backgroundImage: `url(${props.visibility ? Visible : NotVisible})`,
                  backgroundSize: "cover", // Ensures the background image covers the whole div
                  backgroundPosition: "center", // Centers the background image
                }}
                className="postTop-star"
                onClick={toggleVisibility}
              >
                <div className="postTop-star-label">Toggle visiblity</div>
              </div>
            </>
          )}
        </div>

        {pbCount > 0 && (
          <div className="postTop-personalBestText">
            {pbCount} Personal Record{pbCount === 1 ? "" : "s"}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostTop;
