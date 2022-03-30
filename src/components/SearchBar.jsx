import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  handleFormSubbmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubbmit}>
        <div className="form-row row mb-5 mt-2">
          <div className="col-10">
            <input
              onChange={this.props.searchMovie}
              type="text"
              className="form-control"
              placeholder="Search a movie..."
            />
          </div>
          <div className="col-2">
            <Link
              to={"/add"}
              type="button"
              className="btn btn-md btn-danger"
              style={{ float: "right" }}
            >
              Add Movie
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
