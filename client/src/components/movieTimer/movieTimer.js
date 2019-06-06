import React, {useState} from 'react';
import './movieTimer.css';
import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);


const MovieTimer = ({runtime}) => {

  const [started , setStarted] = useState(false);
  const [paused , setPaused] = useState(false);
  const [timeStart , setTimeStart] = useState(59 * 60 * 1000);
  const [timeEnd , setTimeEnd] = useState(runtime * 60 * 1000);
  const [ current, setCurrent ] = useState(59 * 60 * 1000)

  const startPlayer = () => {
    setStarted(true);
  };

  const pausePlayer = () => {
    setPaused(!paused)
  };

  const stopPlayer = () => {
    setStarted(false);
  };

  return (
    <div>
    <TimerMachine
      timeStart={timeStart} // start at 10 seconds
      timeEnd={timeEnd} // end at 20 seconds
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
          console.log('time',time)
          setCurrent(() => time)
          console.log('current',current)
        }

        //setCurrent(time) && console.log(current)
        //console.info(`Timer ticked: ${JSON.stringify(time)}`)
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
      <div onClick={() => startPlayer()}>start</div>
      <div onClick={() => pausePlayer()}>pause</div>
      <div onClick={() => stopPlayer()}>stop</div>
    </div>
    </div>
    );

}

export default MovieTimer;
