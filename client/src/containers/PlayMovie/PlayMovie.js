import React, { useState, useEffect, createContext } from 'react';
import './PlayMovie.css';
import MovieTimer from '../../components/MovieTimer/MovieTimer';
import MovieMessages from '../../components/MovieMessages/MovieMessages';
import randomstring from 'randomstring';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
export const PlayContext = createContext(null);
const API_URL = process.env.REACT_APP_API_URL;

const PlayMovie = (props) => {

  const [ movie , setMovie ] = useState({});
  const [ comments, setComments]  = useState([]);
  const [ display, setDisplay ] = useState(true);
  const [ current, setCurrent ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  const [ showCopied, setShowCopied ] = useState(false);
  const [ delay, setDelay ] = useState(0);
  // mock user => WIP => implement multiple users
  const [ user ] = useState('fakeUser');
  const { id } = props.match.params;

  const copyLink = () => {
    navigator.clipboard.writeText(movie.share_link);
    clearTimeout(delay);
    setShowCopied(true);
    setDelay(setTimeout(()=> setShowCopied(false), 2000));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
    const msg = e.target.msg.value.trim();
    if (msg) {
      addComment(msg);
      e.target.msg.value = '';
    }
  };

  const fetchFromDb = (id) => {
    return axios.get(`${API_URL}/movie/${id}`);
  };

  const createLink = async (id) => {
    await axios.get(`${API_URL}/link/${id}`);
  };

  const addComment = (msg) => {
    // generate a random avatar
    const randomStr = randomstring.generate({
      length: 12,
      charset: 'alphabetic'
    });
    const randomUserAvatar = 'https://robohash.org/' + randomStr;
    const newComment = {
      'user': {
          username: randomStr,
          avatar: randomUserAvatar
        },
      'message': msg,
      'time': current
    };
    axios
    .put(
        `${API_URL}/comment/${movie._id}`,
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
      createLink(id);
      const controller = new AbortController();
      return () => {
        // aborting request when cleaning up effect
        controller.abort();
      };
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
    {movie.title &&
      <div className="play-movie">
        <button
          className="add-comment-btn btn-circle"
          onClick={openModal}
        >
        <i className="fas fa-plus fa-lg"></i>
        </button>
        <Modal
          show={showModal}
          onHide={closeModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          >
          <Modal.Body className="modal-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label><h4>Write your comment</h4></Form.Label>
                <Form.Control as="textarea" className="comment-input" rows="4" type="text" name="msg" />
              </Form.Group>
                <Button variant="secondary" type="submit">
                Send
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <button
        className="share-btn"
        onClick={copyLink}
        >
        <i className="fas fa-share-alt"></i>
        </button>
        <img src={logo} alt="Logo" className="logo-messages"/>
        <MovieTimer runtime={movie.runtime} movie={movie} />
        <MovieMessages />
        {showCopied &&
        <div className="succes-copy">Copied!</div>
        }
      </div>
    }
    </PlayContext.Provider>
    );
}

export default PlayMovie;