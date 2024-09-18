import React from 'react';
import Navigation from '@navigation/index';
import AppInitializer from '@root/AppInitializer';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { store } from '@store/index';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <AppInitializer />
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
