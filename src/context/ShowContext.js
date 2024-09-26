import React, { createContext, useReducer, useEffect } from "react";

// Create Context
export const ShowContext = createContext();

// Actions for the context to use in the reducer
export const ACTIONS = {
  SELECT_SHOW: "select-show",
  CLEAR_SHOW: "clear-selected-show",
  SET_CAROUSEL_SLIDES: "set-carousel-slides",
  ADD_TO_WATCH_LIST: "add-to-watch-list",
  REMOVE_FROM_WATCH_LIST: "remove-from-watch-list",
};

// Initial state
const initialState = {
  selectedShow: null,
  carouselSlides: getCarouselSlides(),
  watchList: [],
};

// Reducer function to handle actions
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SELECT_SHOW:
      return {
        ...state,
        selectedShow: action.payload,
      };
    case ACTIONS.CLEAR_SHOW:
      return {
        ...state,
        selectedShow: null,
      };
    case ACTIONS.SET_CAROUSEL_SLIDES:
      return {
        ...state,
        carouselSlides: getCarouselSlides(),
      };
    case ACTIONS.ADD_TO_WATCH_LIST:
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
    case ACTIONS.REMOVE_FROM_WATCH_LIST:
      return {
        ...state,
        watchList: state.watchList.filter(
          (show) => show.show.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}

// Determines amount of Carousel slides
function getCarouselSlides() {
  if (window.innerWidth >= 2100) {
    return 10;
  } else if (window.innerWidth >= 1920) {
    return 8;
  } else if (window.innerWidth >= 1600) {
    return 7;
  } else if (window.innerWidth >= 1366) {
    return 6;
  } else if (window.innerWidth >= 1200) {
    return 5;
  } else if (window.innerWidth >= 640) {
    return 4;
  } else if (window.innerWidth >= 430) {
    return 3;
  } else if (window.innerWidth > 320) {
    return 2;
  } else return 1;
}

// Context Provider component
export const ShowProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("watchList");
    return localData
      ? { ...initialState, watchList: JSON.parse(localData) }
      : initialState;
  });

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: ACTIONS.SET_CAROUSEL_SLIDES,
        payload: getCarouselSlides(),
      });
    };

    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
  }, [state.watchList]);

  return (
    <ShowContext.Provider value={{ state, dispatch }}>
      {children}
    </ShowContext.Provider>
  );
};
