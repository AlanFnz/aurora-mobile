import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import Navigation from '@navigation/index'
import { ModalProvider } from '@context/modal'
import { store } from '@store/index'
import toastConfig from '@config/toast.config'
import AppInitializer from '@root/app-initializer'

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <ModalProvider>
          <AppInitializer />
          <Navigation />
          <Toast config={toastConfig} />
        </ModalProvider>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
