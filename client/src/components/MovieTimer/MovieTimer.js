import React, { useState, useContext, useEffect } from 'react';
import './MovieTimer.css';
import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { PlayContext } from '../../containers/PlayMovie/PlayMovie';
momentDurationFormatSetup(moment);

const MovieTimer = ({ runtime , movie }) => {

  const { current, setCurrent, checkComments, resetComments } = useContext(PlayContext);
  const [started , setStarted] = useState(false);
  const [paused , setPaused] = useState(false);
  const [timeStart, setTimeStart] = useState(0);
  const timeEnd = 60000 * runtime;

  const startPlayer = () => {
    setStarted(!started);
  };

  const pausePlayer = () => {
    setPaused(!paused);
  };

  const handlePosition = (now, end) => {
    const position = now / end;
    const fullWidth = document.querySelector('.progress-container');
    const progress = document.querySelector('.my-progress');
    progress.style.width = Math.floor(position * fullWidth.offsetWidth) + 'px';
  };

  const handlePositionComplete = () => {
    document.querySelector('.my-progress').style.width = '100%';
  };
  const handlePositionReset = () => {
    document.querySelector('.my-progress').style.width = '0%';
  };

  const handleControl = (e) => {
/*    const fullWidth = document.querySelector('.progress-container');
    const progress = document.querySelector('.my-progress');
    console.log(Math.floor(60000 * runtime * e.clientX / fullWidth.offsetWidth))
    progress.style.width = e.clientX + 'px';
    setCurrent(() => {
      setTimeStart(Math.floor(60000 * runtime * e.clientX / fullWidth.offsetWidth))
      return Math.floor(60000 * runtime * e.clientX / fullWidth.offsetWidth);
    });*/
  };

  return (
    <div className="movie-timer-container">
      <div className="movie-infos">
      {movie.title}
      </div>
      <TimerMachine
        className="movie-timer-clock"
        timeStart={timeStart}
        timeEnd={60000 * runtime}
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
          handlePositionReset()
        }
        onTick={time => {
            setCurrent(() => moment.duration(time).asMilliseconds());
            checkComments();
            handlePosition(moment.duration(time).asMilliseconds(), timeEnd);
          }
        }
        onPause={time =>
          console.info(`Timer paused: ${JSON.stringify(time)}`)
        }
        onResume={time =>
          console.info(`Timer resumed: ${JSON.stringify(time)}`)
        }
        onComplete={time =>
          handlePositionComplete()
        }
      />
      <div className="movie-timer-controls">
        <button className="start-btn" onClick={() => startPlayer()}>{started ? 'reset' : 'start'}</button>
        <button className="pause-btn" onClick={() => pausePlayer()}>{paused ? 'resume' : 'pause'}</button>
      </div>
      <div className="progress-wrapper">
        <div className="progress-container" onClick={(e) => handleControl(e)}>
          <div className="my-progress"></div>
        </div>
      </div>
    </div>
    );
}

export default MovieTimer;
