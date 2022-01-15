import axios from "./axios";
import React, { useState, useEffect } from "react";
import "./Row.css";
// import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const img__baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLarge, isNetflixOriginal }) {
  const [movies, setMovies] = useState([]);
  // const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    async function fetchData() {
      let request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setSelectedMovie(request.data.results[0]);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  async function fetchMovie(id) {
    const { data } = await axios.get(
      `${isNetflixOriginal ? "tv" : "movie"}/${id}?api_key=${
        process.env.REACT_APP_TMDB_API
      }&append_to_response=videos`
    );
    return data;
  }

  const handleClick = async (movie) => {
    const movieData = await fetchMovie(movie.id);
    setSelectedMovie(movieData);
    console.log(selectedMovie);
    // if (trailerUrl) {
    //   setTrailerUrl("");
    // } else {
    //   movieTrailer(
    //     movie?.name ||
    //       movie?.title ||
    //       movie?.original_title ||
    //       movie?.original_name ||
    //       ""
    //   )
    //     .then((url) => {
    //       const urlParam = new URLSearchParams(new URL(url).search);
    //       console.log(urlParam.get("v"));
    //       setTrailerUrl(urlParam.get("v"));
    //     })
    //     .catch((err) => err);
    // }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      host: "https://www.youtube.com",
      origin: window.location.href,
    },
  };

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    return <YouTube videoId={trailer.key} opts={opts} />;
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLarge && "row__largePoster"}`}
            src={`${img__baseUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {selectedMovie.videos ? renderTrailer() : null};
    </div>
  );
}

export default Row;
