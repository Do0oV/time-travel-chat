import React from 'react';
import './App.css';
import Search from '../Search/Search';
import MovieDetails from '../MovieDetails/MovieDetails';
import PlayMovie from '../PlayMovie/PlayMovie';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = (props) => {

  return(
      <Router>
        <Switch>
          <Route path='/movie/:id' component={MovieDetails} />
          <Route path='/play/:id' component={PlayMovie} />
          <Route path='/' component={Search} />
        </Switch>
      </Router>
    );
}

export default App;
