import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "../../context/ShowContext";

import { Outlet, Link } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";

import styles from "./layout.module.css";

import Logo from "../../img/netnietflix.png";
import {
  FaBars,
  FaHome,
  FaCompass,
  FaSearch,
  FaWrench,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";

function Layout() {
  const [isNavVisible, setIsNavVisible] = useState(window.innerWidth > 768);

  const { state } = useContext(ShowContext);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate("/search", { state: { query } });

    toggleNav();
  };

  useEffect(() => {
    if (state.selectedShow !== null) {
      navigate("/show-details", { state: { ...state.selectedShow } });
    }
  }, [state.selectedShow, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <Link to="/">
          <img className="logo" alt="netnietflix" src={Logo} />
        </Link>
        <Searchbar className={styles.headerSearch} onSearch={handleSearch} />
        <button onClick={toggleNav} className={styles.navToggle}>
          <FaBars size={30} color="#d3d3d3" />
        </button>
      </div>
      <div className={styles.layoutContainer}>
        {(isNavVisible || window.innerWidth > 768) && (
          <nav className={styles.navBar}>
            <ul className={styles.navBarList}>
              <li className={styles.searchItem}>
                <Searchbar
                  className={styles.searchBar}
                  onSearch={handleSearch}
                />
              </li>
              <li>
                <FaHome size={30} color="#d3d3d3" />
                <Link className={styles.navBarLink} to="/" onClick={toggleNav}>
                  Home
                </Link>
              </li>
              <li>
                <FaSearch size={30} color="#d3d3d3" />
                <Link
                  className={styles.navBarLink}
                  to="/search"
                  onClick={toggleNav}
                >
                  Search
                </Link>
              </li>
              <li>
                <FaCompass size={30} color="#d3d3d3" />
                <Link className={styles.navBarLink} to="/" onClick={toggleNav}>
                  Discover
                </Link>
              </li>
              <li>
                <FaUserFriends size={30} color="#d3d3d3" />
                <Link
                  className={styles.navBarLink}
                  to="/accounts"
                  onClick={toggleNav}
                >
                  Accounts
                </Link>
              </li>
              <li>
                <FaWrench size={30} color="#d3d3d3" />
                <Link
                  className={styles.navBarLink}
                  to="/settings"
                  onClick={toggleNav}
                >
                  Settings
                </Link>
              </li>
              <li>
                <FaSignOutAlt size={30} color="#d3d3d3" />
                <Link className={styles.navBarLink} to="*" onClick={toggleNav}>
                  Log out
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
