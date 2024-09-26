import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

import useFetch from "../../hooks/useFetch";
import { ShowContext } from "../../context/ShowContext";

import Shows from "../../components/shows/Shows";
import CastProfile from "../castprofile/CastProfile";

import styles from "./searchresults.module.css";

function SearchResults() {
  const [page, setPage] = useState(0);
  const { state } = useContext(ShowContext);
  const { carouselSlides } = state;
  const location = useLocation();
  const { query } = location.state || {};

  const data = useFetch(
    `https://api.themoviedb.org/3/search/multi`,
    query,
    page
  );

  useEffect(() => {
    setPage(0);
  }, [query]);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const pageCount = data?.total_pages || 0;

  const gridStyle = {
    width: "85%",
    display: "grid",
    gridTemplateColumns: `repeat(${carouselSlides}, 1fr)`,
    gap: "5px",
  };

  return (
    <>
      <div style={gridStyle}>
        {(data.results || []).map((item) =>
          item.media_type !== "person" ? (
            <Shows key={item.id} showId={item.id} showType={item.media_type} />
          ) : (
            <CastProfile
              key={item.id}
              person={item}
              image={item.profile_path}
            />
          )
        )}
      </div>
      {query && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextlabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={styles.navigationButtons}
          pageClassName={styles.pageNum}
          previousLinkClassName={styles.previousButton}
          nextLinkClassName={styles.nextButton}
          disabledClassName={styles.navigationDisabled}
          activeClassName={styles.navigationActive}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          breakLabel="..."
        />
      )}
    </>
  );
}

export default SearchResults;
