import React from "react";

import styles from "./episode.module.css";

import noImage from "../../img/noImageAvailable.jpg";

function Episode({ episode }) {
  const still =
    episode.still_path === undefined || episode.still_path === null
      ? noImage
      : "https://image.tmdb.org/t/p/w500" + episode.still_path;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}>
        <img
          src={still}
          className={
            still === noImage ? `${styles.noImage}` : `${styles.image}`
          }
          alt="episode preview"
        />
      </div>
      <div className={styles.description}>
        <h2>
          {episode.episode_number}: {episode.name}
        </h2>
        <p>{episode.overview}</p>
      </div>
      <div className={styles.details}>
        {episode.air_date}
        <br />
        {episode.runtime && `${episode.runtime}m`}
      </div>
    </div>
  );
}

export default Episode;
