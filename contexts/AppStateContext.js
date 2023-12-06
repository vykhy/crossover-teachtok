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
    const handleAppStateChange = nextAppState => {
      const now = Date.now();
      const elapsedTime = now - startTime;

      if (appStateRef.current === 'active') {
        // Update total time if app is active
        setTotalTimeSpent(prevTotalTime => prevTotalTime + elapsedTime / 1000);
      }

      if (nextAppState === 'active') {
        // Update start time when becomes active
        setStartTime(now);
      }

      appStateRef.current = nextAppState;
    };

    const interval = setInterval(() => {
      if (appStateRef.current === 'active') {
        const elapsedTime = Date.now() - startTime;
        setTotalTimeSpent(prevTotalTime => prevTotalTime + elapsedTime / 1000);
        setStartTime(Date.now());
      } else setStartTime(Date.now());
    }, 1000);

    const listener = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      clearInterval(interval);
      listener.remove();
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
