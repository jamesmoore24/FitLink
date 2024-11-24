import React from "react";

import "../../utilities.css";
import "./Info.css";

/**
 * Page component to display when at the "/chat" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Info = (props) => {
  if (!props.userId) {
    return <div>Please sign in before viewing your homepage.</div>;
  }
  return (
    <div className="info-background-container">
      <h1>How to use FitLink :)</h1>
      <h2>
        The future of working out is here. FitLink makes it easy to track your workouts, connect
        with friends, share your progress, and achieve your goals faster.
      </h2>
      <ol>
        <li>
          <h3>Starting a Workout</h3>
          <p>
            Click the "plus" icon to automatically start a workout. Your current progress is saved
            even if you switch tabs or log out!
          </p>
        </li>
        <li>
          <h3>Adding Exercises</h3>
          <p>
            Click "New exercise" to open the exercise editor. Search for your exercise or add a new
            one by typing its name. FitLink saves new exercises for future sessions.
          </p>
        </li>
        <li>
          <h3>Editing Exercises</h3>
          <p>
            Click on any existing exercise in the exercise editor to make changes. You can also
            delete the exercise entirely by clicking the trash icon.
          </p>
        </li>
        <li>
          <h3>Adding Sets</h3>
          <p>
            After entering set details, click "Save set" to save your progress and visualize it with
            a "Set Square" in both editors.
          </p>
        </li>
        <li>
          <h3>Editing Sets</h3>
          <p>
            To modify a set, click its "Set Square" in the exercise editor. You can change metrics
            or delete the set.
          </p>
        </li>
        <li>
          <h3>Tracking Personal Records (PR)</h3>
          <p>
            Upon selecting an exercise, view your current PR weight. Surpassing the PR updates it to
            "New PR" and highlights the exercise with a red "PR" tag in the set editor.
          </p>
          <p>
            In your profile, you can view your exercise stats, including personal bests, by
            selecting a workout and a date range in the "Stats" section.
          </p>
        </li>
        <li>
          <h3>Completing Your Workout</h3>
          <p>
            Finish by posting privately for your eyes only or posting it on FitLink for others to
            see. You can change the visibility of your post later by toggling its visibility either
            in the Feed or in your Profile.
          </p>
        </li>
        <li>
          <h3>Friends</h3>
          <p>
            Go to your Feed and select the friends icon. Here you can follow new people, follow
            people back, and filter for people you know by utilizing the search bar. You can also
            view their profile by clicking on their profile picture.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default Info;
