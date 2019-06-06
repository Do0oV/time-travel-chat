import React, { useState, useEffect } from 'react';
import './playMovie.css';
import MovieTimer from '../movieTimer/movieTimer';
import axios from 'axios';

const PlayMovie = (props) => {

  const [ movie , setMovie ] = useState({});
  const baseUrl = 'http://localhost:3001';

  const fetchFromDb = (id) => {
    return axios.get(`${baseUrl}/movie/${id}`);
  };

  useEffect(() => {
    fetchFromDb(props.match.params.id)
      .then(res => {
        console.log('res', res)
        setMovie(res.data)
      });
  },[]);

  return (
    <div>
    <MovieTimer runtime={movie.runtime} movie={movie}/>
    {console.log(movie)}
    {movie.title}
    </div>
    );
}

export default PlayMovie;
