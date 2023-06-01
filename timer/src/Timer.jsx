import { useEffect, useState } from "react";
import "./timer.css";

const Timer = ({ eventList }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentEventName, setCurrentEventName] = useState(
    eventList[0].eventName
  );
  const [currentTotalTime, setCurrentTotalTime] = useState(
    eventList[0].eventDuration * 60
  );
  // this is the time in seconds;

  const [showTransitionScreen, setShowTransitionScreen] = useState(false);
  const [showFinishedScreen, setShowFinishedScreen] = useState(false);

  const calculateMinutes = (seconds) => {
    return Math.floor(seconds / 60);
  };

  const calculateSeconds = (seconds) => {
    return seconds % 60;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // this is where the true timer logic goes.
      if (currentTotalTime < 10 && currentTotalTime > 1) {
        // show the transition screen but continue deducting time
        setShowTransitionScreen(true);
        setCurrentTotalTime((c) => c - 1);
      } else if (currentTotalTime == 1) {
        // change to the next event

        // that means

        // change the totalTime
        // change the currentEventIndex
        // change the eventName
        if (currentEventIndex !== eventList.length - 1) {
          // if it is not the last event
          setCurrentTotalTime(
            eventList[currentEventIndex + 1].eventDuration * 60
          );
          setCurrentEventName(eventList[currentEventIndex + 1].eventName);
          setCurrentEventIndex(currentEventIndex + 1);
        } else {
          setShowFinishedScreen(true);
        }
      } else {
        // just change the current time.
        setCurrentTotalTime((c) => c - 1);
        // guarantee that you're in the normal timer screen
        if (showTransitionScreen) {
          setShowTransitionScreen(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTotalTime]);

  if (showFinishedScreen) {
    return <FinishedScreen />;
  }

  if (showTransitionScreen) {
    let nextEventName;
    if (currentEventIndex !== eventList.length - 1) {
      nextEventName = `${eventList[currentEventIndex + 1].eventName} starts in`;
    } else {
      nextEventName = "This session ends soon";
    }
    return (
      <TransitionScreen
        nextEventName={nextEventName}
        minutes={calculateMinutes(currentTotalTime)}
        seconds={calculateSeconds(currentTotalTime)}
      />
    );
  } else {
    return (
      <TimerScreen
        name={currentEventName}
        minutes={calculateMinutes(currentTotalTime)}
        seconds={calculateSeconds(currentTotalTime)}
      />
    );
  }
};

const TransitionScreen = ({ nextEventName, minutes, seconds }) => {
  return (
    <main className="timer-main">
      <p className="transition-name">{nextEventName}</p>
      <div className="timer-time">
        {minutes} : {seconds}
      </div>
    </main>
  );
};

const TimerScreen = ({ name, minutes, seconds }) => {
  return (
    <main className="timer-main">
      <p className="timer-name">{name}</p>
      <div className="timer-time">
        {minutes} : {seconds}
      </div>
    </main>
  );
};

const FinishedScreen = () => {
  return (
    <main className="timer-main">
      <h1>This programme has now finished</h1>
    </main>
  );
};

export default Timer;
