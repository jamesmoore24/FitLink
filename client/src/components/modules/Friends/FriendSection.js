import React from "react";
import "./FriendSection.css"; // Ensure to create this CSS file

const FriendSection = ({ name }) => {
  return (
    <div className="friend-section">
      <img src="avatar.jpg" alt="Avatar" className="avatar" />{" "}
      {/* Replace 'avatar.jpg' with the actual image path */}
      <div className="friend-info">
        <span className="friend-name">{name}</span>
      </div>
      <div className="friend-socials">
        {/* Replace these with actual icons */}
        <span className="social-icon">👻</span>
        <span className="social-icon">📷</span>
      </div>
    </div>
  );
};

export default FriendSection;
