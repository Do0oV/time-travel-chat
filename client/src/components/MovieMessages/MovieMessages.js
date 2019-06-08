import React, { useState, useContext } from 'react';
import './MovieMessages.css';
import { PlayContext } from '../../containers/PlayMovie/PlayMovie';
import moment from 'moment';

const MovieMessages = (props) => {

  const [input, setInput] = useState(false);
  const { comments, addComment, display } = useContext(PlayContext);

  const handleInput = () => {
    setInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.msg.value.trim();
    if (msg) {
      addComment(msg);
      e.target.msg.value = '';
      setInput(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleInput()}>Add Comment</button>
      </div>
      {input &&
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="msg" />
          <input type="submit" value="add" />
        </form>
      }
      {display &&
        comments.map(comment => (
          <div key={comment._id}>
            <div>{comment.username}</div>
            <div>{moment.duration(comment.time).format('h:mm:ss')}</div>
            <div>{comment.message}</div>
          </div>
          ))
      }
    </div>
    );
}

export default MovieMessages;
