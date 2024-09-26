import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

import styles from "./searchbar.module.css";

function Searchbar({ className, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
      clearInput();
      searchBarRef.current.blur();
    }
  };

  const handleClick = () => {
    onSearch(searchQuery);
  };

  const clearInput = () => {
    setSearchQuery("");
  };

  return (
    <div className={`${className} ${styles.searchbarContainer}`}>
      <input
        ref={searchBarRef}
        className={styles.searchbarInput}
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      ></input>
      <FaSearch
        className={styles.searchIcon}
        color="#757575"
        size={18}
        onClick={handleClick}
      />
    </div>
  );
}

export default Searchbar;
