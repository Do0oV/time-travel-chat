import React, {useState} from 'react';
import './MovieTimer.css';
import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

const MovieTimer = ({runtime , movie, addComment, displayComments, resetComments }) => {

  const [started , setStarted] = useState(false);
  const [paused , setPaused] = useState(false);
  const [timeStart] = useState(59 * 60 * 1000); // change to 0 !
  const [timeEnd] = useState(moment.duration(runtime).asMilliseconds());
  const [current, setCurrent] = useState(59 * 60 * 1000);
  const [input, setInput] = useState(false);
  const [setCommentTime] = useState(0);
  const [user] = useState('user1');

  const startPlayer = () => {
    setStarted(!started);
  };

  const pausePlayer = () => {
    setPaused(!paused)
  };

  const handleComment = (current) => {
    setInput(true);
    setCommentTime(current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.msg.value.trim();
    if (msg) {
      const newComment = {
        'username': user,
        'message': msg,
        'time': current
      };
      addComment(newComment);
      e.target.msg.value = '';
      setInput(false)
    }
  };

  return (
    <div>
    <TimerMachine
      timeStart={timeStart}
      timeEnd={timeEnd}
      started={started}
      paused={paused}
      countdown={false} // use as stopwatch
      interval={1000} // tick every 1 second
      formatTimer={(time, ms) =>
        moment.duration(ms, "milliseconds").format("h:mm:ss")
      }
      onStart={time =>
        resetComments()
      }
      onStop={time =>
        console.info(`Timer stopped: ${JSON.stringify(time)}`)
      }
      onTick={time => {
          setCurrent(() => moment.duration(time).asMilliseconds())
          movie.comments &&
          movie.comments.map(comment => comment.time === current && displayComments(comment));
        }
      }
      onPause={time =>
        console.info(`Timer paused: ${JSON.stringify(time)}`)
      }
      onResume={time =>
        console.info(`Timer resumed: ${JSON.stringify(time)}`)
      }
      onComplete={time =>
        console.info(`Timer completed: ${JSON.stringify(time)}`)
      }
    />
    <div>
      PLAYER
      <button onClick={() => startPlayer()}>{started ? 'reset' : 'start'}</button>
      <button onClick={() => pausePlayer()}>{paused ? 'resume' : 'pause'}</button>
      <button onClick={() => handleComment({current})}>Add Comment</button>
    </div>
      {input &&
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="msg" />
          <input type="submit" value="add" />
        </form>
      }
    </div>
    );
}

export default MovieTimer;
