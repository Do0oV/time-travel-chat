import React, { useState , useContext } from 'react';
import './search.css';
import { SearchContext } from '../../containers/App';

const Search = (props) => {

  const [ query , setQuery ] = useState('');
  const { searchMovies } = useContext(SearchContext);

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (query.length >= 3) searchMovies(query);
  };

    return(
      <div>
        <input type="text" name="title" value={query} onChange={(e) => handleInput(e)} placeholder="search for a movie"/>
      </div>
      );
}

export default Search;
