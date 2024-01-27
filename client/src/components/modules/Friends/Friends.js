import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import Menu from "./Menu";
import FriendSection from "./FriendSection";

import "./Friends.css";

/**
 * @param {string} userId
 */
const Friends = (props) => {
  const [selected, setSelected] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [explore, setExplore] = useState([]);
  const friendRequestsCount = 5; // Example count

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const profileResponse = await get("/api/user/profile");
        const user = profileResponse; // Adjust based on how your API returns the response
        console.log(user.friends.length);

        // Get friends profiles
        const friendsProfiles = await Promise.all(
          user.friends.map((friendId) =>
            get("/api/user/info", { creator_id: friendId }).then((res) => res.data)
          )
        );
        setFriends(friendsProfiles);

        // Get requests profiles
        const requestsProfiles = await Promise.all(
          user.requests.map((requestId) =>
            get("/api/user/info", { creator_id: requestId }).then((res) => res.data)
          )
        );
        setRequests(requestsProfiles);

        // Get explore profiles, excluding the user's friends
        console.log(`USERS FRIENDS ${typeof user.friends}`);
        const exploreResponse = await get("/api/users/explore", { ids: user.friends });
        setExplore(exploreResponse);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors as needed
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Assuming `get` is a function that correctly makes a GET request and handles the query parameters.

  const renderSection = () => {
    switch (selected) {
      case "friends":
        return friends.map((friend) => <FriendSection key={friend.id} name={friend.name} />);
      case "explore":
        return explore.map((user) => <FriendSection key={user.id} name={user.name} />);
      case "requests":
        return requests.map((request) => <FriendSection key={request.id} name={request.name} />);
      default:
        return null;
    }
  };

  return (
    <div className="friends-container">
      <div className="friends-title-container">
        <div className="friends-title">Friends</div>
      </div>
      <Menu
        selected={selected}
        setSelected={setSelected}
        friendRequestsCount={friendRequestsCount}
      />
      {renderSection()}
    </div>
  );
};

export default Friends;
