import React, { useState, useContext } from 'react';
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
  const [clickPosition , setClickPosition] = useState(0);
  const [timeStart, setTimeStart] = useState(0);
  const timeEnd = 60000 * runtime;

  const startPlayer = () => {
    setStarted(!started);
    if (!started) setPaused(false);
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

  const handlePositionStartEnd = (num) => {
    document.querySelector('.my-progress').style.width = `${num}%`;
  };

  // WIP => transform progress bar to control bar
  const handleControl = (e) => {
    const fullWidth = document.querySelector('.progress-container');
    const progress = document.querySelector('.my-progress');
    const click = e.clientX;
    setClickPosition(() => {
      return click;
    });
    progress.style.width = click + 'px';
    setCurrent(() => {
      setTimeStart(Math.floor(60000 * runtime * clickPosition / fullWidth.offsetWidth))
      return Math.floor(60000 * runtime * clickPosition / fullWidth.offsetWidth);
    });
  };

  return (
    <div className="movie-timer-container">
      <div className="movie-infos">
        {movie.title}
        <span className="minutes">{runtime} min</span>
      </div>
      <div className="movie-timer-clock">
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
            handlePositionStartEnd(0)
          }
          onTick={time => {
              setCurrent(() => moment.duration(time).asMilliseconds());
              checkComments();
              handlePosition(moment.duration(time).asMilliseconds(), timeEnd);
            }
          }
          onPause={time => {}}
          onResume={time => {}}
          onComplete={time =>
            handlePositionStartEnd(100)
          }
        />
      </div>
      <div className="movie-timer-controls">
        <button className="start-btn" onClick={startPlayer}>{started ? (<i className="fas fa-redo-alt"></i>) : 'GO'}</button>
        <button className="pause-btn" onClick={pausePlayer}>{paused ? (<i className="fas fa-play"></i>) : (<i className="fas fa-pause"></i>)}</button>
      </div>
      <div className="progress-wrapper">
        <div className="progress-container" onClick={handleControl}>
          <div className="my-progress"></div>
        </div>
      </div>
    </div>
    );
}

export default MovieTimer;
