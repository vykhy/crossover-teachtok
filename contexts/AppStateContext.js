import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from 'react';
import {AppState} from 'react-native';

const AppStateContext = createContext({
  totalTimeSpent: 0,
});

function AppStateContextProvider({children}) {
  const appState = AppState.currentState;
  const [startTime, setStartTime] = useState(Date.now());
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const appStateRef = useRef(appState);

  const formatTime = timeInSeconds => {
    if (timeInSeconds < 60) {
      return `${Math.floor(timeInSeconds)}s`;
    } else if (timeInSeconds < 3600) {
      const minutes = Math.floor(timeInSeconds / 60);
      return `${minutes}m`;
    } else {
      const hours = Math.floor(timeInSeconds / 3600);
      return `${hours}h`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (appStateRef.current === 'active') {
        const elapsedTime = Date.now() - startTime;
        setTotalTimeSpent(prevTotalTime => prevTotalTime + elapsedTime / 1000);
        setStartTime(Date.now());
      } else setStartTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  const contextValue = {
    totalTimeSpent: formatTime(totalTimeSpent),
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppStateContext = () => useContext(AppStateContext);
export default AppStateContextProvider;
