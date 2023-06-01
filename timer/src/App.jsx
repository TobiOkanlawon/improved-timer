import { useState } from "react";
import Entry from "./Entry.jsx";
import Timer from "./Timer.jsx";

const App = () => {
  const [showEntryPage, setShowEntryPage] = useState(true);
  const [eventList, setEventList] = useState([]);
  const [ID, setIDCounter] = useState(0);

  const addEvent = (name, duration) => {
    const newEventList = [
      ...eventList,
      {
        eventName: name,
        eventDuration: duration,
        eventID: ID,
      },
    ];
    setEventList(newEventList);
    setIDCounter(ID + 1);
  };

  const startTimer = () => {
    setShowEntryPage(false);
  };

  const removeEvent = (eventID) => {
    const newEventList = eventList.filter((entry) => {
      return entry.eventID !== eventID;
    });
    setEventList(newEventList);
  };

  if (showEntryPage == true) {
    return (
      <Entry
        eventList={eventList}
        addEvent={addEvent}
        removeEvent={removeEvent}
        startTimer={startTimer}
      />
    );
  } else {
    return <Timer eventList={eventList} />;
  }
};

export default App;
