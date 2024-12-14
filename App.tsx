import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import Navigation from '@navigation/index'
import AppInitializer from '@root/app-initializer'
import toastConfig from '@config/toast.config'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@store/index'

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
    <ReduxProvider store={store}>
      <AppInitializer />
      <Navigation />
      <Toast config={toastConfig} />
    </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
