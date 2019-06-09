import React, { useState, useContext } from 'react';
/*import randomstring from 'randomstring';*/
import './MovieMessages.css';
import { PlayContext } from '../../containers/PlayMovie/PlayMovie';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';


const MovieMessages = (props) => {

  const [input, setInput] = useState(false);
  const { comments, addComment, display } = useContext(PlayContext);
/*  const randomUserUrl = 'https://robohash.org/cuutqsyt';*/
  const [showModal, setShowModal] = useState(false);

  const close = () => {
    setShowModal(false);
  };

  const open = () => {
    setShowModal(true);
  };

  const handleInput = () => {
    setInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
    const msg = e.target.msg.value.trim();
    if (msg) {
      addComment(msg);
      e.target.msg.value = '';
      setInput(false);
    }
  };


  return (
    <div className="movie-messages-container">
      <button
        className="add-comment-btn btn-circle"
        onClick={open}
      >
        <i className="fas fa-plus fa-lg"></i>
      </button>
      <Modal
        show={showModal}
        onHide={close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body>
        <h4>Write your comment below</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="msg" />
          <input type="submit" value="add" />
        </form>
        </Modal.Body>
      </Modal>
      <div className="margin">
      {display &&
        comments.map(comment => (
        <div key={comment._id} className="my-3 p-3 bg-white rounded box-shadow">
          <div className="media text-muted pt-3">
            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" className="mr-2 rounded" width="60" height="60" />
            <p className="media-body pl-3 pb-3 mb-0 small lh-125">
              <strong className="d-block text-gray-dark">
                @_ {moment(moment.duration(comment.time)._data).format("HH:mm:ss")}
              </strong>
              {comment.message}
            </p>
          </div>
        </div>
          ))
      }
      </div>
    </div>
    );
}

export default MovieMessages;
