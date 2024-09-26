import React, { useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import ProgressBar from "../progressbar/ProgressBar";

import styles from "./showdescription.module.css";

function ShowDescription() {
  const { state } = useContext(ShowContext);
  const showId = state.selectedShow?.id;
  const showType = state.selectedShow?.type;
  const showData = useFetch(
    `https://api.themoviedb.org/3/${showType}/${showId}`
  );
  const credits = useFetch(
    `https://api.themoviedb.org/3/${showType}/${showId}/credits`
  );

  const creators =
    credits && credits.crew
      ? credits.crew.filter((creator) =>
          ["Directing", "Writing"].includes(creator.known_for_department)
        )
      : [];

  const genres = showData.genres || [];

  const yearOfRelease = showData.first_air_date
    ? showData.first_air_date
    : showData.release_date;

  const releaseYear = yearOfRelease
    ? yearOfRelease.split("-")[0]
    : "Unknown Release Year";
  return (
    <>
      <div className={styles.detailsContainerTwo}>
        <div className={styles.detailsTitleContainer}>
          <h1>
            {showData.name ? showData.name : showData.title}
            <span style={{ fontWeight: 300 }}> ({releaseYear})</span>
          </h1>
          <p>{genres.map((genre) => genre.name).join(", ") + "."}</p>
        </div>
        <ProgressBar voteAverage={showData.vote_average} />
        <p style={{ fontStyle: "italic" }}>{showData.tagline}</p>
        <h2>Overview</h2>
        <p>{showData.overview}</p>

        {creators.length > 0 && (
          <>
            <h2>Creators</h2>
            <p>{creators.map((creator) => creator.name).join(", ") + "."}</p>
          </>
        )}
      </div>
    </>
  );
}

export default ShowDescription;
