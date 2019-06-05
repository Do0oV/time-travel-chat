import React, { useState, Fragment } from 'react';
import './App.css';
import MovieList from '../components/movieList/movieList';
import Search from '../components/search/search';
import MovieDetails from '../components/movieDetails/movieDetails';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const SearchContext = React.createContext(null);

const App = (props) => {

  const controller = new AbortController();
  const signal = controller.signal;

  const [ movies , setMovies ] = useState([]);
  const baseUrl = 'http://localhost:3001';

  const searchMovies = async (query) => {
    if (query) {
      const res = await axios.get(`${baseUrl}/search/${query}`);
      setMovies(() => res.data)
/*      fetch(`${baseUrl}/search/${query}`, {signal})
      .then(res => res.json())
      .then(movies => setMovies(() =>movies))
      .catch(() => {});*/
    } else {
      setMovies(() => [])
    }
  };

  return(
    <Router>
    <SearchContext.Provider value={{
        searchMovies,
        setMovies,
        controller
      }}>
    <Switch>
        <Route path='/movie/:id' render={props => (
          <Fragment>
            <MovieDetails id={props.match.params.id}/>
          </Fragment>
        )} />
        <Route path='/' render={props => (
          <Fragment>
            <Search />
            <MovieList movies={movies} />
          </Fragment>
        )} />
      </Switch>
      </SearchContext.Provider>
      </Router>
    );
}

export default App;
