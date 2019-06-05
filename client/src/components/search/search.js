import React, { useState , useContext } from 'react';
import './search.css';
import { SearchContext } from '../../containers/App';

const Search = (props) => {

  const [ query , setQuery ] = useState('');
  const { searchMovies , setMovies, controller } = useContext(SearchContext);

  const handleInput = (e) => {
    /*console.log(controller)
    controller.abort()
    console.log(controller.signal)*/
    const value = e.target.value;
    setQuery(value);
    if(value.length) {
      searchMovies(value)
    } else {
      setMovies(() => [])
    }
  };

    return(
      <div>
        <input type="text" value={query} onChange={(e) => handleInput(e)} placeholder="search for a movie"/>
      </div>
      );
}

export default Search;
