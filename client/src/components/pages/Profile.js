import React, { useState, useEffect, useRef } from "react";
import { redirect } from "react-router-dom";

import ActivityTracker from "../modules/Profile/ActivityTracker";
import TextChoose from "../modules/Profile/TextChoose";

import SleepyCat from "../../public/sleepy_cat.png";
import SmilingCat from "../../public/close_up_cat.jpg";

import "../../utilities.css";
import "./Profile.css";

/**
 * Page component to display when at the "/profile" route
 *
 * Proptypes
 * @param {string} userId id of current logged in user
 */
const Profile = (props) => {
  const [textChooseChoice, setTextChooseChoice] = useState("posts");
  const [pictureChoice, setPictureChoice] = useState(SleepyCat);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    console.log("HERE");
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log("CLOSE");
      setIsOpen(false);
    }
  };

  // Add a click event listener to the entire document to close the dropdown
  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  if (!props.userId) {
    return <div>Please sign in before creating a new workout.</div>;
  }
  return (
    <div className="profile-container">
      <div className="profile-left-subcontainer">
        <img className="profile-picture" src={pictureChoice} />

        <div className="dropdown" onBlur={closeDropdown}>
          <button className="dropdown-button" onClick={toggleDropdown}>
            Dropdown
          </button>
          {isOpen && (
            <div className="dropdown-content">
              <a className="dropdown-option" href="#">
                Option 1
              </a>
              <a className="dropdown-option" href="#">
                Option 2
              </a>
              <a className="dropdown-option" href="#">
                Option 3
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="profile-right-subcontainer">
        <ActivityTracker />
        <TextChoose />
      </div>
    </div>
  );
};

export default Profile;
