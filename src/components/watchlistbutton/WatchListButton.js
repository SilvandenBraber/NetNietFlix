import React, { useContext, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import styles from "./watchlistbutton.module.css";
import { ACTIONS, ShowContext } from "../../context/ShowContext";

function WatchListButton({ className, show, showType }) {
  const { dispatch, state } = useContext(ShowContext);

  const isInWatchList = state.watchList.some(
    (item) => item.show.id === show.id
  );

  const handleToggle = () => {
    if (isInWatchList) {
      dispatch({
        type: ACTIONS.REMOVE_FROM_WATCH_LIST,
        payload: { id: show.id },
      });
    } else {
      dispatch({
        type: ACTIONS.ADD_TO_WATCH_LIST,
        payload: { show, type: showType },
      });
    }
  };

  return (
    <div className={`${styles.mainContainer} ${className}`}>
      {isInWatchList ? (
        <FaMinus size={15} className={styles.icon} onClick={handleToggle} />
      ) : (
        <FaPlus size={15} className={styles.icon} onClick={handleToggle} />
      )}
    </div>
  );
}

export default WatchListButton;
