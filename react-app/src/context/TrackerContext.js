import { createContext, useContext, useState, useEffect } from 'react';
// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%

export const TrackerContext = createContext();

export const useTracker = () => useContext(TrackerContext);

export default function TrackerProvider({ children }) {
  const [trackerDistance, setTrackerDistance] = useState(0);
  const [trackerDuration, setTrackerDuration] = useState(0)
  const [trackerCoordinates, setTrackerCoordinates] = useState("");
  const [trackerElevation, setTrackerElevation] = useState(0)


  return (
    <TrackerContext.Provider
      value={{
        trackerDistance,
        setTrackerDistance,
        trackerDuration,
        setTrackerDuration,
        trackerCoordinates,
        setTrackerCoordinates,
        trackerElevation,
        setTrackerElevation
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
