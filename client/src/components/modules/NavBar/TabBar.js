import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./TabBar.css";

import Home from "../../../public/TabAssets/home.png";
import HomeFilled from "../../../public/TabAssets/home_filled.png";
import Friends from "../../../public/TabAssets/friends.png";
import FriendsFilled from "../../../public/TabAssets/friends_filled.png";
import Profile from "../../../public/TabAssets/user.png";
import ProfileFilled from "../../../public/TabAssets/user_filled.png";
import Plus from "../../../public/TabAssets/plus.png";
import PlusFilled from "../../../public/TabAssets/plus_filled.png";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */

const TabBar = ({ userId, handleLogin, handleLogout }) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  useEffect(() => {
    setSelectedTab(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {selectedTab === "/" ? (
        <div className="tab-container u-flex" />
      ) : (
        <div className="tab-container u-flex">
          <Link to="/feed" className="icon-square-container u-flexColumn no-underline">
            <div className="icon-container u-flexColumn u-flex-justifyCenter u-flex-alignCenter">
              <img
                src={selectedTab === "/feed" ? HomeFilled : Home}
                className="icon-imageContainer"
              />
              <div className="bottom-border" />
            </div>
            <div className="label-container ">Home</div>
          </Link>

          <Link to="/workout" className="icon-square-container u-flexColumn no-underline">
            <div className="icon-container u-flexColumn u-flex-justifyCenter u-flex-alignCenter">
              <img
                src={selectedTab === "/workout" ? PlusFilled : Plus}
                className="icon-imageContainer"
              />
              <div className="bottom-border" />
            </div>
            <div className="label-container ">Workout</div>
          </Link>

          <Link
            to={`/profile/${userId}`}
            className="icon-square-container u-flexColumn no-underline"
          >
            <div className="icon-container u-flexColumn u-flex-justifyCenter u-flex-alignCenter">
              <img
                src={selectedTab === `/profile/${userId}` ? ProfileFilled : Profile}
                className="icon-imageContainer"
              />
              <div className="bottom-border" />
            </div>
            <div className="label-container ">Profile</div>
          </Link>
        </div>
      )}
    </>
  );
};

export default TabBar;
