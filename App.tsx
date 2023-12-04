import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './Routes';
import AppStateContextProvider from './contexts/AppStateContext';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        translucent
        backgroundColor={'transparent'}
      />
      <AppStateContextProvider>
        <Routes />
      </AppStateContextProvider>
    </NavigationContainer>
  );
};

export default App;
