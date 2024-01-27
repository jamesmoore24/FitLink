import React, { useEffect, useRef, useState } from "react";
import "./Menu.css"; // Ensure this CSS file is created and linked

const FriendsMenu = ({ selected, setSelected, friendRequestsCount }) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const activeItem = menuRef.current.querySelector(".friends-menu-item.active");
    setUnderlineStyle({
      width: activeItem.offsetWidth,
      left: activeItem.offsetLeft,
    });
  }, [selected]);

  return (
    <div className="friends-menu" ref={menuRef}>
      <div
        className={`friends-menu-item ${selected === "friends" ? "active" : ""}`}
        onClick={() => setSelected("friends")}
      >
        Friends
      </div>
      <div
        className={`friends-menu-item ${selected === "requests" ? "active" : ""}`}
        onClick={() => setSelected("requests")}
      >
        Requests
        {friendRequestsCount > 0 && (
          <span className="friends-menu-notification">{friendRequestsCount}</span>
        )}
      </div>
      <div
        className={`friends-menu-item ${selected === "explore" ? "active" : ""}`}
        onClick={() => setSelected("explore")}
      >
        Explore
      </div>
      <div className="friends-menu-underline" style={underlineStyle}></div>
    </div>
  );
};

export default FriendsMenu;
