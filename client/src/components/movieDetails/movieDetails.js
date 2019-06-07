import React, { useContext , useEffect , useState } from 'react';
import './movieDetails.css';
import axios from 'axios';

import { SearchContext } from '../../containers/App';

const MovieDetails = (props) => {

  const { fetchMovieDetails } = useContext(SearchContext);
  const [ movie , setMovie ] = useState({});
  const baseUrl = 'http://localhost:3001';

  const checkDocument = async (id) => {
    await axios.get(`${baseUrl}/check/${id}`)
      .then(res => {
        if (res.status === 200) {
          props.history.push(`/play/${res.data._id}`)
        } else {
          createDocument(id);
        }
      })
  };

  const createDocument = async (id) => {
    await axios.get(`${baseUrl}/create/${id}`)
      .then(newMovie => {
        props.history.push(`/play/${newMovie._id}`)
      });
  };

  useEffect(() => {
    fetchMovieDetails(props.match.params.id)
      .then(res => setMovie(res.data));
  }, []);


  return (
    <div>
      <div>{movie.title}</div>
      <div onClick={() => checkDocument(movie.id)}>
        PLAY
      </div>
    </div>
    );
};

export default MovieDetails;
