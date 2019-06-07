import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const Search = (props) => {

  const [ movies , setMovies ] = useState([]);
  const [ query , setQuery ] = useState('');
  const baseUrl = 'http://localhost:3001';

  const searchMovies = async (query) => {
    if (query) {
      const res = await axios.get(`${baseUrl}/search/${query}`);
      setMovies(() => res.data)
    } else {
      setMovies(() => [])
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchMovies(value.trimStart());
  };

  return(
    <div>
      <input type="text" value={query} onChange={(e) => handleInput(e)} placeholder="search for a movie"/>
      <MovieList movies={movies} />
    </div>
    );
}

export default Search;
