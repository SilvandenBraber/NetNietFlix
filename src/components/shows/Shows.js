import React, { useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { ACTIONS, ShowContext } from "../../context/ShowContext";

import WatchListButton from "../watchlistbutton/WatchListButton";

import styles from "./shows.module.css";

import noImage from "../../img/noImageAvailable.jpg";

export default function Shows({ showId, showType }) {
  const { dispatch } = useContext(ShowContext);

  const data = useFetch(`https://api.themoviedb.org/3/${showType}/${showId}`);

  if (data !== undefined) {
    const poster =
      data.poster_path === undefined || data.poster_path === null
        ? noImage
        : "https://image.tmdb.org/t/p/w500" + data.poster_path;

    return (
      <div className={styles.showContainer}>
        <div className={styles.imageContainer}>
          <WatchListButton
            className={styles.watchListButton}
            show={data}
            showType={showType}
          />

          <img
            className={styles.showImage}
            src={poster}
            alt={data.name ? data.name : data.title}
            onClick={() =>
              dispatch({
                type: ACTIONS.SELECT_SHOW,
                payload: { id: showId, type: showType },
              })
            }
          />
        </div>

        <h3 className={styles.title}>{data.name ? data.name : data.title}</h3>
        {/* <p>{data.first_air_date ? data.first_air_date : data.release_date}</p> */}
      </div>
    );
  } else {
    return <></>;
  }
}
