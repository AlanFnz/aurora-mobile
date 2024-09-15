import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Navigation from './src/navigation';
import { store } from './src/store';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

export default App;
