import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (param, searchQuery, page) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // declare the data fetching function
    const apiKey = process.env.REACT_APP_API_KEY;
    let url = `${param}?api_key=${apiKey}&language=en-US`;
    if (searchQuery) {
      url += `${page && `&page=${page}`}&query=${encodeURIComponent(
        searchQuery
      )}`;
    }

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, [param, searchQuery, page]);

  return data;
};

export default useFetch;
