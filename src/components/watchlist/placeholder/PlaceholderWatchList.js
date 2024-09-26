import React, { useContext, useState } from "react";

import { ShowContext } from "../../../context/ShowContext";

import Carousel from "nuka-carousel";

import styles from "../watchlist.module.css";
import { FaPlus } from "react-icons/fa6";

function PlaceholderWatchList() {
  const { state } = useContext(ShowContext);
  const { carouselSlides } = state;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <h1>My Watch List</h1>
      <Carousel slidesToShow={carouselSlides} withoutControls>
        <div
          className={styles.placeholder}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <div className={styles.description}>Add Your Favorite Shows</div>
          ) : (
            <FaPlus size={30} />
          )}
        </div>
      </Carousel>
    </>
  );
}

export default PlaceholderWatchList;
