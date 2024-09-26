import React, { useContext } from "react";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import Carousel from "nuka-carousel";
import Shows from "../shows/Shows";

import styles from "./moviecarousel.module.css";

function MovieCarousel({
  trending = false,
  type,
  category,
  title,
  showId = null,
}) {
  const { state } = useContext(ShowContext);

  const data = useFetch(
    `https://api.themoviedb.org/3/${trending ? "trending/" : ""}${type}${
      showId !== null ? `/${showId}` : ""
    }/${category}`
  );

  return (
    <div className={styles.carousel}>
      <h1 className={styles.firstTitle}>{title}</h1>
      <Carousel slidesToShow={state.carouselSlides} wrapAround>
        {(data.results || []).map((show, index) => (
          <Shows key={index} showId={show.id} showType={type} />
        ))}
      </Carousel>
      <br />
    </div>
  );
}

export default MovieCarousel;
