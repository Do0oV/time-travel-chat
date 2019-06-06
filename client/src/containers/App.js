import React, { useState, Fragment } from 'react';
import './App.css';
import MovieList from '../components/movieList/movieList';
import Search from '../components/search/search';
import MovieDetails from '../components/movieDetails/movieDetails';
import PlayMovie from '../components/playMovie/playMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const SearchContext = React.createContext(null);

const App = (props) => {

  const [ movies , setMovies ] = useState([]);
  const baseUrl = 'http://localhost:3001';

  const searchMovies = async (query) => {
    if (query) {
      const res = await axios.get(`${baseUrl}/search/${query}`);
      setMovies(() => res.data)
    } else {
      setMovies(() => [])
    }
  };
  const fetchMovieDetails = async (id) => {
    return axios.get(`${baseUrl}/details/${id}`);
  };

  return(
    <Router>
    <SearchContext.Provider value={{
      searchMovies,
      setMovies,
      fetchMovieDetails
    }}>
    <Switch>
    <Route path='/movie/:id' render={props => (
      <Fragment>
      <MovieDetails {...props} />
      </Fragment>
      )} />
    <Route path='/play/:id' render={props => (
      <Fragment>
      <PlayMovie {...props} />
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
