import React, { useContext , useEffect , useState } from 'react';
import './movieDetails.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { SearchContext } from '../../containers/App';

const MovieDetails = (props) => {

  const { fetchMovieDetails } = useContext(SearchContext);
  const [ movie , setMovie ] = useState({});
  const baseUrl = 'http://localhost:3001';

  const createDocument = async (id) => {
    await axios.get(`${baseUrl}/create/${props.match.params.id}`);
    props.history.push(`/play/${id}`)
  };

  useEffect(() => {
    fetchMovieDetails(props.match.params.id)
      .then(res => setMovie(res.data));
  }, []);


  return (
    <div>
      <div>{movie.title}</div>
      <div onClick={() => createDocument(movie.id)}>
        PLAY
      </div>
    </div>
    );
};

export default MovieDetails;
