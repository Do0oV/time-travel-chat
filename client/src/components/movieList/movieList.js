import React from 'react';
import './movieList.css';

const MovieList = (props) => {

    return props.movies.map(movie => (
      <div key={movie.id} movie={movie}>{movie.title}</div>
      ));
}

export default MovieList;
