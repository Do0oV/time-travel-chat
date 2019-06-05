import React from 'react';
import './movieListItem.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import MovieDetails from '../movieDetails/movieDetails';

const MovieListItem = ({movie}) => {

  const img_path = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

    return (
      <div key={movie.id} movie={movie}>


      <div>
      <img
      src={img_path + movie.poster_path}
      alt="poster"
      />
      <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      {/*<div>{movie.title}</div>*/}
      </div>
      </div>
      );
}

export default MovieListItem;
