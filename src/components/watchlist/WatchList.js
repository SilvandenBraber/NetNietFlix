import React, { useContext } from "react";

import { ShowContext } from "../../context/ShowContext";

import Carousel from "nuka-carousel";
import Shows from "../shows/Shows";

import PlaceholderWatchList from "./placeholder/PlaceholderWatchList";

function WatchList() {
  const { state } = useContext(ShowContext);
  const { carouselSlides, watchList } = state;

  if (watchList.length === 0) {
    return <PlaceholderWatchList />;
  } else
    return (
      <>
        <h1>My Watch List</h1>
        <Carousel
          slidesToShow={carouselSlides}
          withoutControls={watchList.length <= carouselSlides}
        >
          {watchList.map((showObject, index) => (
            <Shows
              showId={showObject.show.id}
              showType={showObject.type}
              key={index}
            />
          ))}
        </Carousel>
      </>
    );
}

export default WatchList;
