import React from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import AddMovie from "./components/AddMovie";
// import EditMovie from "./components/EditMovie";
import axios from "axios";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({ window });

class App extends React.Component {
  state = {
    movies: [],

    searchQuery: "",
  };

  componentDidMount() {
    this.getMovies();
  }

  async getMovies() {
    const baseURL = "http://localhost:3002/movies";
    const response = await axios.get(baseURL);
    this.setState({ movies: response.data });
  }

  // DELETE MOVIE
  deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    await axios.delete(baseURL);
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  // SEARCH MOVIE
  searchMovie = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  // ADD MOVIE
  addMovie = async (movie) => {
    await axios.post(`http://localhost:3002/movies`, movie);
    this.setState((state) => ({
      movies: state.movies.concat(movie),
    }));
    history.push("/");
    this.getMovies();
  };

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return movie.name
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <HistoryRouter history={history}>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovie={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMovie={this.deleteMovie}
                  />
                </React.Fragment>
              }
            ></Route>

            <Route
              path="add"
              element={
                <div>
                  <AddMovie onAddMovie={(movie) => this.addMovie(movie)} />
                </div>
              }
            />
          </Routes>
        </div>
      </HistoryRouter>
    );
  }
}

export default App;
