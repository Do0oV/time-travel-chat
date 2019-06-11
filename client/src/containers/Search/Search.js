import React, { useState, useEffect } from 'react';
import './Search.css';
import { API_URL } from '../../config';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import { Row } from 'react-bootstrap';
import logo from '../../assets/logo.svg';

const Search = (props) => {
  const [ movies , setMovies ] = useState([]);
  const [ query , setQuery ] = useState('');
  const [ delay, setDelay ] = useState(0);
  const controller = new AbortController();

  const searchMovies = async (query) => {
    if (query) {
      const res = await axios.get(`${API_URL}/search/${query}`);
      setMovies(() => res.data);
    } else {
      setMovies(() => []);
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value)
    clearTimeout(delay);
    setDelay(setTimeout((e)=> searchMovies(value.trimStart()), 200));
  };
  useEffect(
    () => {
      return () => {
        // aborting request when cleaning up effect
        controller.abort();
      };
    }
  );

  return(
    <div className="main">
      <Row className="justify-content-center align-items-center search-container">
        <div className="searchbar">
          <input className="search_input" type="text" value={query} onChange={handleInput} placeholder="Search a movie..." />
          <span className="search_icon"><i className="fas fa-search fa-lg"></i></span>
        </div>
      </Row>
      <Row className="search-results" >
        <MovieList movies={movies} />
        {!query.length &&
        <img src={logo} alt="Logo" className="logo"/>
        }
      </Row>
    </div>
    );
}

export default Search;
