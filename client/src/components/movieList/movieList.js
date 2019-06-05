import React from 'react';
import './movieList.css';
import MovieListItem from '../movieListItem/movieListItem';

const MovieList = ({movies}) => {

    return movies.map(movie => (
      <MovieListItem key={movie.id} movie={movie}/>
      ));
}

export default MovieList;
