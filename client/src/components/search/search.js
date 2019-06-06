import React, { useState , useContext } from 'react';
import './search.css';
import { SearchContext } from '../../containers/App';

const Search = (props) => {

  const [ query , setQuery ] = useState('');
  const { searchMovies } = useContext(SearchContext);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    searchMovies(value.trimStart());

  };

    return(
      <div>
        <input type="text" value={query} onChange={(e) => handleInput(e)} placeholder="search for a movie"/>
      </div>
      );
}

export default Search;
