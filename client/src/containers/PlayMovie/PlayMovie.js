import React, { useState, useEffect, createContext } from 'react';
import './PlayMovie.css';
import MovieTimer from '../../components/MovieTimer/MovieTimer';
import MovieMessages from '../../components/MovieMessages/MovieMessages';
import axios from 'axios';

export const PlayContext = createContext(null);

const PlayMovie = (props) => {

  const [ movie , setMovie ] = useState({});
  const [comments, setComments] = useState([]);
  const [display, setDisplay] = useState(true);
  const [current, setCurrent] = useState(59 * 60 * 1000);
  const [user] = useState('user1');
  const { id } = props.match.params;
  const baseUrl = 'http://localhost:3001';


  const fetchFromDb = (id) => {
    return axios.get(`${baseUrl}/movie/${id}`);
  };

  const addComment = (msg) => {
    const newComment = {
      'username': user,
      'message': msg,
      'time': current
    };
    axios
    .put(
        `${baseUrl}/comment/${movie._id}`,
        newComment,
        {headers: {'Content-Type': 'application/json'}}
      )
    .then(res => setMovie(res.data))
    .catch(e => console.log(e));
  };

  const checkComments = () => {
    movie.comments &&
      movie.comments.map(comment => comment.time === current && displayComments(comment));
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
    fetchFromDb(id)
      .then(res => {
        setMovie(res.data)
      });
  },[id]);

  return (
    <PlayContext.Provider value={{
      current,
      setCurrent,
      checkComments,
      user,
      comments,
      addComment,
      displayComments,
      resetComments,
      display
    }}>
      <div>
        {movie.title}
        <MovieTimer runtime={movie.runtime} movie={movie} />
        <MovieMessages />
      </div>
    </PlayContext.Provider>
    );
}

export default PlayMovie;