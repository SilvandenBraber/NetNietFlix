import React, { useContext } from "react";

import { ShowContext } from "../../context/ShowContext";

import Divider from "../divider/Divider";
import MovieCarousel from "../moviecarousel/MovieCarousel";

import styles from "./similarmovies.module.css";

function SimilarMovies() {
  const { state } = useContext(ShowContext);
  const id = state.selectedShow?.id;
  const type = state.selectedShow?.type;

  return (
    <div className={styles.mainContainer}>
      <h2>Similar {type === "movie" ? "Movies" : "TV Shows"}</h2>
      <Divider />
      <MovieCarousel type={type} category="similar" showId={id} />
    </div>
  );
}

export default SimilarMovies;
