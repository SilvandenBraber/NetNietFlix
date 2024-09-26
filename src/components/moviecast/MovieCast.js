import React, { useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import Carousel from "nuka-carousel";
import CastProfile from "../castprofile/CastProfile";
import Divider from "../divider/Divider";

import styles from "./moviecast.module.css";

function MovieCast() {
  const { state } = useContext(ShowContext);
  const showId = state.selectedShow?.id;

  const { cast } = useFetch(
    `https://api.themoviedb.org/3/movie/${showId}/credits`
  );

  if (!cast) return <></>;

  return (
    <div className={styles.mainContainer}>
      <h2>Cast</h2>
      <Divider />
      <Carousel
        className={styles.carousel}
        slidesToShow={state.carouselSlides}
        wrapAround={true}
      >
        {cast.map((person, index) => (
          <CastProfile
            key={index}
            person={person}
            image={person.profile_path}
          />
        ))}
      </Carousel>
    </div>
  );
}

export default MovieCast;
