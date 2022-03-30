import React from "react";
// import { Link } from "react-router-dom";

const MovieList = ({ movies, deleteMovie }) => {
  /* function deleteClick() {
    console.log("Button cliked!!!");
  } */

  const truncateOverwiev = (string, maxLenght) => {
    if (!string) return null;
    if (string.lenght < maxLenght) return string;
    return `${string.substring(0, maxLenght)} ...`;
  };

  return (
    <div className="row">
      {movies.map((movie, i) => (
        <div key={i} className="col-lg-4">
          <div className="card mb-4 shadow-sm">
            <img src={movie.imageURL} alt="movie" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">
                {truncateOverwiev(movie.overview, 100)}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={(e) => deleteMovie(movie)}
                  type="button"
                  className="btn btn-md btn-outline-danger"
                >
                  Delete
                </button>

                <h2>
                  <span className="badge bg-info">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
