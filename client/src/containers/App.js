import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from '../components/movieList/movieList';
import Search from '../components/search/search';

export const SearchContext = React.createContext(null);

const App = (props) => {


  const [ movies , setMovies ] = useState([]);
  const baseUrl = 'http://localhost:3001';

  const searchMovies = (query) => {
    fetch(`${baseUrl}/search/${query}`)
    .then(res => res.json())
    .then(movies => setMovies(movies));
  };

/*  useEffect(() => {
    searchMovies('westworld')
  }, []);*/

  return(
    <SearchContext.Provider value={{
      searchMovies
    }}>
    <Search />
    <MovieList movies={movies} />
    </SearchContext.Provider>
    );
}

export default App;
