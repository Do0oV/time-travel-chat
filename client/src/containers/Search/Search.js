import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { Row } from 'react-bootstrap';

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
    <div className="main">
      <Row className="justify-content-center align-items-center search-container">
        <div className="searchbar">
          <input className="search_input" type="text" value={query} onChange={(e) => handleInput(e)} placeholder="Search a movie..." />
          <span className="search_icon"><i className="fas fa-search fa-lg"></i></span>
        </div>
      </Row>
      <Row className="search-results">
        <MovieList movies={movies} />
      </Row>
    </div>
    );
}

export default Search;
