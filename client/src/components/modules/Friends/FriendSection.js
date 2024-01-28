import React from "react";
import { useNavigate } from "react-router-dom";

import "./FriendSection.css"; // Ensure to create this CSS file

const FriendSection = ({ friend, followBack, followStatus, onFollowClick }) => {
  let buttonText = "";
  let buttonColor = "";
  let followBackText = "";
  const navigate = useNavigate();

  switch (followStatus) {
    case "follow":
      buttonText = "Follow";
      buttonColor = "var(--primary)";
      break;
    case "followBack":
      buttonText = "Follow Back";
      buttonColor = "var(--primary)";
      break;
    case "following":
      buttonText = "Unfollow";
      followBackText = followBack ? "" : "Not following back";
      buttonColor = "var(--medgrey)";
      break;
    default:
      buttonText = "Follow";
      buttonColor = "var(--primary)";
  }

  return (
    <div className="friend-section">
      <img
        src={friend.profile_picture}
        alt="Avatar"
        className="avatar"
        onClick={() => {
          navigate(`/profile/${friend._id}`);
        }}
      />{" "}
      <div className="friend-info">
        <span className="friend-name">{friend.name}</span>
      </div>
      <div className="friend-followBack">{followBackText}</div>
      <button
        onClick={onFollowClick}
        style={{ backgroundColor: buttonColor }}
        className="friend-followButton"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default FriendSection;
