import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { DialogProvider } from '@context/dialog'
import authReducer from '@store/slices/auth'

const rootReducer = {
  auth: authReducer,
}

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  })

interface RenderWithProvidersOptions {
  initialState?: Record<string, unknown>
}

export const renderWithProviders = (
  children: React.ReactNode,
  { initialState }: RenderWithProvidersOptions = {},
) => {
  const store = createTestStore(initialState)
  const queryClient = createTestQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <DialogProvider>{children}</DialogProvider>
        </NavigationContainer>
      </ReduxProvider>
    </QueryClientProvider>,
  )
}
