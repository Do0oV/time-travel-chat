import React, { useState, useContext } from 'react';
import './MovieTimer.css';
import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { PlayContext } from '../../containers/PlayMovie/PlayMovie';
momentDurationFormatSetup(moment);

const MovieTimer = ({ runtime , movie }) => {

  const { setCurrent, checkComments, resetComments } = useContext(PlayContext);
  const [started , setStarted] = useState(false);
  const [paused , setPaused] = useState(false);
  const [timeStart] = useState(0);
  const [timeEnd] = useState(moment.duration(runtime).asMilliseconds());

  const startPlayer = () => {
    setStarted(!started);
  };

  const pausePlayer = () => {
    setPaused(!paused);
  };

  return (
    <div className="movie-timer-container">
      <div className="movie-infos">
      {movie.title}
      </div>
      <TimerMachine
        className="movie-timer-clock"
        timeStart={timeStart}
        timeEnd={timeEnd}
        started={started}
        paused={paused}
        countdown={false} // use as stopwatch
        interval={1000} // tick every 1 second
        formatTimer={(time, ms) =>
          moment(moment.duration(ms)._data).format("HH:mm:ss")
        }
        onStart={time =>
          resetComments()
        }
        onStop={time =>
          console.info(`Timer stopped: ${JSON.stringify(time)}`)
        }
        onTick={time => {
            setCurrent(() => moment.duration(time).asMilliseconds());
            checkComments();
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
      <div className="movie-timer-controls">
        <button className="start-btn" onClick={() => startPlayer()}>{started ? 'reset' : 'start'}</button>
        <button className="pause-btn" onClick={() => pausePlayer()}>{paused ? 'resume' : 'pause'}</button>
      </div>
      <div className="progress-container" onClick={(e) => console.log(e)}>
        <div className="my-progress"></div>
      </div>
    </div>
    );
}

export default MovieTimer;
