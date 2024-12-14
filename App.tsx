import React from 'react'
import Toast from 'react-native-toast-message'
import Navigation from '@navigation/index'
import AppInitializer from '@root/app-initializer'
import toastConfig from '@config/toast.config'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@store/index'

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <AppInitializer />
      <Navigation />
      <Toast config={toastConfig} />
    </ReduxProvider>
  )
}

export default App
