import "./entry.css";
import { useState } from "react";

function Entry({ eventList, addEvent, removeEvent, startTimer }) {
  const [eventName, setEventName] = useState("");
  const [eventDuration, setEventDuration] = useState(1);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDurationChange = (e) => {
    setEventDuration(e.target.value);
  };

  const handleAddEvent = () => {
    addEvent(eventName, eventDuration);
    setEventName("");
    setEventDuration(1);
  };

  return (
    <main>
      <div className="left-side">
        <h1 className="left-side-heading">Add an Event to the Agenda</h1>
        <div className="left-side-form">
          <input
            placeholder="Event Name"
            value={eventName}
            onChange={handleEventNameChange}
          />
          <input
            placeholder="Event Duration (in mins)"
            type="number"
            value={eventDuration}
            onChange={handleEventDurationChange}
          />
          <button className="main-button" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
      </div>
      {eventList.length > 0 ? (
        <RightSide
          eventList={eventList}
          removeEvent={removeEvent}
          startTimer={startTimer}
        />
      ) : (
        <EmptyRightSide />
      )}
    </main>
  );
}

const RightSide = ({ eventList, removeEvent, startTimer }) => {
  return (
    <div className="right-side">
      <h1 className="right-side-heading">Agenda</h1>
      <p>The default interval is 10 seconds </p>
      <ul className="programme-list">
        {eventList.map((event) => {
          return (
            <li className="programme" key={event.eventID}>
              <p className="programme-left-side">{event.eventName}</p>
              <div className="programme-right-side">
                <p>{event.eventDuration} minutes</p>
                <button
                  className="remove-button"
                  onClick={() => removeEvent(event.eventID)}
                >
                  remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="right-side-bottom">
        <p>
          Total time is{" "}
          {eventList.reduce((accumulator, currentEvent) => {
            return accumulator + parseInt(currentEvent.eventDuration);
          }, 0)}{" "}
          minutes
        </p>
        <button className="main-button" onClick={startTimer}>
          Start Timer
        </button>
      </div>
    </div>
  );
};

const EmptyRightSide = () => {
  return (
    <div className="right-side">
      <p>No event entered yet </p>
    </div>
  );
};

export default Entry;
