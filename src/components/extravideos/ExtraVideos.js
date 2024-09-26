import React, { useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import ReactPlayer from "react-player";
import Divider from "../divider/Divider";

import styles from "./extravideos.module.css";

function ExtraVideos() {
  const { state } = useContext(ShowContext);
  const showId = state.selectedShow?.id;
  const showType = state.selectedShow?.type;

  const videoData = useFetch(
    `https://api.themoviedb.org/3/${showType}/${showId}/videos`
  );

  const videos = videoData.results ? [...videoData.results].reverse() : [];

  const videoResolutions = () => {
    if (window.innerWidth < 430) {
      return { width: "100%", height: "300px" };
    } else {
      return { width: "100%", height: "440px" };
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h2>Extra Videos</h2>
      <Divider />
      <div className={styles.allVideosContainer}>
        {videos.map((video) => (
          <div className={styles.videoContainer} key={video.id}>
            <h3 className={styles.title}>{video.name}</h3>
            <ReactPlayer
              width={videoResolutions().width}
              height={videoResolutions().height}
              url={`https://www.youtube.com/watch?v=${video.key}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExtraVideos;
