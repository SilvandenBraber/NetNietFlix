import React from "react";
import styles from "./castprofile.module.css";
import noImage from "../../img/noImageAvailable.jpg";

function CastProfile({ person, image }) {
  if (person !== undefined) {
    const profileImage =
      image === undefined || image === null
        ? noImage
        : "https://image.tmdb.org/t/p/w500" + image;

    return (
      <div className={styles.mainContainer}>
        <div className={styles.imageContainer}>
          <img
            src={profileImage}
            alt={"Casting profile"}
            className={styles.image}
          />
        </div>
        <h3>{person.name}</h3>
        <p>{person.character}</p>
      </div>
    );
  } else return <></>;
}

export default CastProfile;
