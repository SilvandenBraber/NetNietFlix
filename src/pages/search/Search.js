import React from "react";
import { useLocation } from "react-router-dom";

import SearchResults from "../../components/searchResults.js/SearchResults";

import styles from "./search.module.css";

function Search() {
  const location = useLocation();
  const { query } = location.state || {};

  // const { results } = useFetch(
  //   `https://api.themoviedb.org/3/search/multi`,
  //   query
  // );

  return (
    <div>
      <h1 className={styles.title}>
        {query ? `Search results for ${query}` : "Search results"}
      </h1>
      <div className={styles.mainContainer}>
        <SearchResults />
      </div>
      <div>5</div>
    </div>
  );
}

export default Search;
