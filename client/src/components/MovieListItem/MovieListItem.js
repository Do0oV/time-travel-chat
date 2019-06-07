import React from 'react';
import './MovieListItem.css';
import { Link } from 'react-router-dom';

const MovieListItem = ({movie}) => {

  const img_path = 'https://image.tmdb.org/t/p/w185';

    return (
      <div key={movie.id} movie={movie}>
        <div>
          <img
          src={img_path + movie.poster_path}
          alt="poster"
          />
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </div>
      </div>
      );
}

export default MovieListItem;
