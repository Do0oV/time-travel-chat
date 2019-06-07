import React, {useState} from 'react';
import './movieTimer.css';
import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);


const MovieTimer = ({runtime , movie, addComment, displayComments }) => {

  const [started , setStarted] = useState(false);
  const [paused , setPaused] = useState(false);
  const [timeStart , setTimeStart] = useState(59 * 60 * 1000); // change to 0 !
  const [timeEnd , setTimeEnd] = useState(moment.duration(runtime).asMilliseconds());
  const [current, setCurrent] = useState(59 * 60 * 1000);
  const [input, setInput] = useState(false);
  const [commentTime, setCommentTime] = useState(0);
  const [user, setUser] = useState('user1');

  const startPlayer = () => {
    setStarted(true);
  };

  const pausePlayer = () => {
    setPaused(!paused)
  };

  const stopPlayer = () => {
    setStarted(false);
  };

  const handleComment = (current) => {
    setInput(true);
    setCommentTime(current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    const newComment = {
      'username': user,
      'message': msg,
      'time': current
    };
    addComment(newComment);
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
        console.info(`Timer started: ${JSON.stringify(time)}`)
      }
      onStop={time =>
        console.info(`Timer stopped: ${JSON.stringify(time)}`)
      }
      onTick={time => {
          setCurrent(() => moment.duration(time).asMilliseconds())
          movie.comments.map(comment => {
            if (comment.time === current) {
              // write fonction display message
              return displayComments(comment)
            }
          });
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
      <button onClick={() => startPlayer()}>start</button>
      <button onClick={() => pausePlayer()}>pause</button>
      <button onClick={() => stopPlayer()}>stop</button>
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
