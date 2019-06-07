import React, { useState, useEffect } from 'react';
import './playMovie.css';
import MovieTimer from '../movieTimer/movieTimer';
import axios from 'axios';
import moment from 'moment';

const PlayMovie = (props) => {

  const [ movie , setMovie ] = useState({});
  const baseUrl = 'http://localhost:3001';
  const [comments, setComments] = useState([]);
  const [display, setDisplay] = useState(true);

  const fetchFromDb = (id) => {
    return axios.get(`${baseUrl}/movie/${id}`);
  };

  const addComment = (comment) => {
    axios
    .put(
        `${baseUrl}/comment/${movie._id}`,
        comment,
        {headers: {'Content-Type': 'application/json'}}
      )
    .then(res => setMovie(res.data))
    .catch(e => console.log(e));
  };

  const displayComments = (comment) => {
    if (!display) setDisplay(true);
    setComments(prevComments => [...prevComments, comment]);
  };

  const resetComments = () => {
    setDisplay(false);
    resetStateComments();
  };

  const resetStateComments = () => {
    setComments([]);
  };

  useEffect(() => {
    fetchFromDb(props.match.params.id)
      .then(res => {
        setMovie(res.data)
      });
  },[]);

  return (
    <div>
    {movie.title}
    <MovieTimer runtime={movie.runtime} movie={movie} addComment={addComment} displayComments={displayComments} resetComments={resetComments}/>

      {display &&
        comments.map(comment => (
        <div key={comment._id}>
          <div>{comment.username}</div>
          <div>{moment.duration(comment.time).format('h:mm:ss')}</div>
          <div>{comment.message}</div>
        </div>
      ))}

    </div>
    );
}

export default PlayMovie;
