import React from "react";
import video from "../../../public/workout-video.mp4";

import "./Video.css";

const VideoPlayer = () => {
  return (
    <div className="video-section">
      <video src={video} autoPlay loop muted />
    </div>
  );
};

export default VideoPlayer;
