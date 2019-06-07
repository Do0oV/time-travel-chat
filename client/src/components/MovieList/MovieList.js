import React from 'react';
import './MovieList.css';
import MovieListItem from '../MovieListItem/MovieListItem';

const MovieList = ({movies}) => {

    return movies.map(movie => (
      <MovieListItem key={movie.id} movie={movie}/>
      ));
}

export default MovieList;
