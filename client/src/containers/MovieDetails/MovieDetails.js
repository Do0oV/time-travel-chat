import React, { useEffect , useState } from 'react';
import './MovieDetails.css';
import axios from 'axios';

const MovieDetails = (props) => {

  const [ movie , setMovie ] = useState({});
  const baseUrl = 'http://localhost:3001';
  const { id } = props.match.params;

  const checkDocument = async (id) => {
    await axios.get(`${baseUrl}/check/${id}`)
      .then(res => {
        if (res.status === 200) {
          res.data._id &&
          props.history.push(`/play/${res.data._id}`);
        } else {
          createDocument(id);
        }
      });
  };

  const fetchMovieDetails = async (id) => {
    return axios.get(`${baseUrl}/details/${id}`);
  };

  const createDocument = async (id) => {
    await axios.get(`${baseUrl}/create/${id}`)
      .then(res => {
        res &&
        props.history.push(`/play/${res.data._id}`);
      });
  };

  useEffect(() => {
    fetchMovieDetails(id)
      .then(res => setMovie(res.data));
  }, [id]);

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
