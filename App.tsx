import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Navigation } from '@navigation/index'
import { DialogProvider } from '@context/dialog'
import { store } from '@store/.'
import toastConfig from '@config/toast.config'
import AppInitializer from '@root/app-initializer'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <DialogProvider>
            <AppInitializer />
            <Navigation />
            <Toast config={toastConfig} />
          </DialogProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

export default App
