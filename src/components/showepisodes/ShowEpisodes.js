import React, { useContext, useState } from "react";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import Divider from "../divider/Divider";
import Episode from "../episode/Episode";

import styles from "./showepisodes.module.css";

function ShowEpisodes() {
  const { state } = useContext(ShowContext);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const showId = state.selectedShow?.id;

  const { seasons } = useFetch(`https://api.themoviedb.org/3/tv/${showId}`);

  const seasonData = useFetch(
    `https://api.themoviedb.org/3/tv/${showId}/season/${selectedSeason}`
  );

  return (
    <>
      <div className={styles.mainContainer}>
        <p className={styles.season}>Season: </p>
        <select
          className={styles.dropList}
          onChange={(event) => setSelectedSeason(event.target.value)}
          value={selectedSeason}
        >
          {(seasons || []).map((season, index) => (
            <option key={index} value={season.season_number}>
              {season.name}
            </option>
          ))}
        </select>
      </div>
      <h2>Episodes</h2>
      <Divider />

      <div className={styles.showEpisodesList}>
        {(seasonData.episodes || []).map((episode) => (
          <Episode key={episode.id} episode={episode} />
        ))}
      </div>
    </>
  );
}

export default ShowEpisodes;
