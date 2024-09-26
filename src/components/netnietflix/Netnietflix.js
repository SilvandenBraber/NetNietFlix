import React from "react";

import MovieCarousel from "../moviecarousel/MovieCarousel";
import WatchList from "../watchlist/WatchList";

import styles from "./netnietflix.module.css";

export default function Netnietflix() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <WatchList />
        <MovieCarousel type="movie" category="popular" title="Popular Movies" />
        <MovieCarousel type="tv" category="popular" title="Popular TV Shows" />
        <MovieCarousel
          type="movie"
          category="week"
          title="Trending This Week"
          trending={true}
        />
        <MovieCarousel
          type="tv"
          category="airing_today"
          title="TV Shows Airing Today"
        />
        <MovieCarousel
          type="movie"
          category="top_rated"
          title="Top Rated Movies"
        />
      </div>
    </div>
  );
}
