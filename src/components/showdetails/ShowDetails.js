import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ACTIONS, ShowContext } from "../../context/ShowContext";

import Divider from "../divider/Divider";
import ExtraVideos from "../extravideos/ExtraVideos";
import MovieCast from "../moviecast/MovieCast";
import ShowDescription from "../showdescription/ShowDescription";
import ShowEpisodes from "../showepisodes/ShowEpisodes";
import SimilarMovies from "../similarmovies/SimilarMovies";

import styles from "./showdetails.module.css";

import noImage from "../../img/noImageAvailable.jpg";
import backArrow from "../../img/arrow.png";

function ShowDetails() {
  const navigate = useNavigate();
  const detailsContainerRef = useRef(null);
  const { state, dispatch } = useContext(ShowContext);
  const showId = state.selectedShow?.id;
  const showType = state.selectedShow?.type;
  const showData = useFetch(
    `https://api.themoviedb.org/3/${showType}/${showId}`
  );

  const handleBackClick = () => {
    dispatch({ type: ACTIONS.CLEAR_SHOW });
    navigate("/");
  };

  useEffect(() => {
    detailsContainerRef.current?.scrollTo(0, 0);
  }, [showId]);

  if (showData !== undefined) {
    const poster =
      showData.poster_path === undefined || showData.poster_path === null
        ? noImage
        : "https://image.tmdb.org/t/p/w500" + showData.poster_path;

    return (
      <>
        <div className={styles.detailsContainer} ref={detailsContainerRef}>
          <div className={styles.header}>
            <img
              className={styles.backArrow}
              alt="return to homepage"
              src={backArrow}
              onClick={handleBackClick}
            />
            <h1 className={styles.showType}>
              {showData.name ? "TV Show" : "Movie"}
            </h1>
          </div>
          <Divider />
          <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
              <img
                className={
                  poster === noImage ? `${styles.noImage}` : `${styles.image}`
                }
                src={poster}
                alt={showData.name ? showData.name : showData.title}
              ></img>
            </div>
            <ShowDescription />
          </div>

          <Divider />
          {showType === "tv" ? (
            <ShowEpisodes />
          ) : (
            <>
              <MovieCast />
              <Divider />
              <SimilarMovies />
              <Divider />
              <ExtraVideos />
            </>
          )}
        </div>
      </>
    );
  }
}

export default ShowDetails;
