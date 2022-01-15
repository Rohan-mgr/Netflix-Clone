import React, { useState, useEffect } from "react";
import axios from "./axios";
import request from "./request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(request.fetNetflixOriginals);
      setMovie(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `${
          movie?.backdrop_path
            ? `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
            : `url(
                "https://res.cloudinary.com/dxdboxbyb/image/upload/v1620052094/ayi6tvyiedrlmjiim6yn.png"
              )`
        }`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name || movie?.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
