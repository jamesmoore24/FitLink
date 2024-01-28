import React, { useState, useEffect } from "react";
import { get, post } from "../../../utilities";

import Menu from "./Menu";
import FriendSection from "./FriendSection";

import "./Friends.css";

/**
 * @param {string} userId
 * @param {() => {}} setNotificationOn
 * @param {() => {}} setNotificationText
 */
const Friends = (props) => {
  const [selected, setSelected] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [explore, setExplore] = useState([]);

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const profileResponse = await get("/api/whoami");
        const user = profileResponse; // Adjust based on how your API returns the response
        console.log(user.friends);

        // Get friends profiles
        const friendsProfiles = await Promise.all(
          user.friends.map((friendId) =>
            get("/api/user/info", { creator_id: friendId }).then((res) => {
              // Assuming 'res' is the user object returned from the API
              // Also, ensure that 'res.friends' is an array before calling 'includes'
              return {
                friend: res,
                followBack:
                  res.friends && Array.isArray(res.friends)
                    ? res.friends.includes(user._id)
                    : false,
              };
            })
          )
        );
        console.log("HEREEE");
        console.log(requests);
        setFriends(friendsProfiles);

        // Get requests profiles
        const requestsProfiles = await Promise.all(
          user.requests.map((requestId) =>
            get("/api/user/info", { creator_id: requestId }).then((res) => res)
          )
        );
        setRequests(requestsProfiles);

        // Get explore profiles, excluding the user's friends
        const exploreResponse = await get("/api/users/explore", {
          ids: [...user.friends, ...user.requests],
        });
        setExplore(exploreResponse);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors as needed
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Assuming `get` is a function that correctly makes a GET request and handles the query parameters.

  const handleFollowClick = (userId, actionType) => {
    // Perform the API call to follow/unfollow the user based on actionType
    // For example, using a hypothetical 'followUser' API method
    console.log(actionType);
    if (actionType === "follow") {
      post("/api/user/follow", { follow_id: userId }).then((userFollow) => {
        setExplore(explore.filter((user) => user._id !== userId));
        setRequests(requests.filter((user) => user._id !== userId));
        get("/api/whoami").then((user) => {
          setFriends([
            ...friends,
            {
              friend: userFollow,
              followBack:
                userFollow.friends && Array.isArray(userFollow.friends)
                  ? userFollow.friends.includes(user._id)
                  : false,
            },
          ]);
        });
        props.setNotificationOn(true);
        props.setNotificationText(`Followed ${userFollow.name}`);
      });
    } else if (actionType === "unfollow") {
      post("/api/user/unfollow", { follow_id: userId }).then((userUnfollow) => {
        if (userUnfollow.stillFollows) {
          setRequests([...requests, userUnfollow.user]);
        } else {
          setExplore([...explore, userUnfollow.user]);
        }
        setFriends(friends.filter((user) => user.friend._id !== userUnfollow.user._id));
        props.setNotificationOn(true);
        props.setNotificationText(`Unfollowed ${userUnfollow.user.name}`);
      });
    }
  };

  const renderSection = () => {
    switch (selected) {
      case "friends":
        return friends.map((friend) => (
          <FriendSection
            key={friend._id}
            friend={friend.friend}
            followBack={friend.followBack}
            followStatus={"following"}
            onFollowClick={() => handleFollowClick(friend.friend._id, "unfollow")}
          />
        ));
      case "explore":
        return explore.map((user) => (
          <FriendSection
            key={user._id}
            friend={user}
            followStatus={"follow"}
            onFollowClick={() => handleFollowClick(user._id, "follow")}
          />
        ));
      case "requests":
        return requests.map((request) => (
          <FriendSection
            key={request._id}
            friend={request}
            followStatus={"followBack"}
            onFollowClick={() => handleFollowClick(request._id, "follow")}
          />
        ));
      default:
        return null;
    }
  };

  return (
    <div className="friends-container">
      <Menu
        selected={selected}
        setSelected={setSelected}
        friendRequestsCount={requests.length}
        friendsCount={friends.length}
      />
      {renderSection()}
    </div>
  );
};

export default Friends;
