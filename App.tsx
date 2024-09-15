import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Navigation from '@navigation/index';
import { store } from '@store/index';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
