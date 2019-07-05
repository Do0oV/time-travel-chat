import React, { useContext, useRef, useEffect } from 'react';
import './MovieMessages.css';
import { PlayContext } from '../../containers/PlayMovie/PlayMovie';
import moment from 'moment';

const MovieMessages = (props) => {

  const messagesEndRef = useRef(null);
  const { comments, display } = useContext(PlayContext);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    scrollToBottom();
  }, [comments]);

  return (
    <div className="movie-messages-container">
      <div className="margin">
        {display &&
        comments.map(comment => (
        <div key={comment._id} className="my-3 p-3 bg-white rounded box-shadow">
          <div className="media text-muted pt-3">
            <img src={comment.user.avatar} alt="avatar" className="mr-2 rounded" width="60" height="60" />
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
        <div ref={messagesEndRef} />
      </div>
    </div>
    );
}

export default MovieMessages;
