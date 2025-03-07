import React from 'react'
import { render } from '@testing-library/react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { DialogProvider } from '@context/dialog'

import { foldersMockData } from '@store/mocks'
import { foldersApi } from '@store/queries/folder'
import { noteApi } from '@store/queries/note'
import authReducer from '@store/slices/auth'
import foldersReducer from '@store/slices/folder'

const rootReducer = {
  auth: authReducer,
  folders: foldersReducer,
  [foldersApi.reducerPath]: foldersApi.reducer,
  [noteApi.reducerPath]: noteApi.reducer,
}

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(foldersApi.middleware, noteApi.middleware),
    preloadedState,
  })

interface RenderWithProvidersOptions {
  initialState?: Record<string, unknown>
}

export const renderWithProviders = (
  children: React.ReactNode,
  {
    initialState = { folders: foldersMockData },
  }: RenderWithProvidersOptions = {},
) => {
  const store = createTestStore(initialState)

  return render(
    <ReduxProvider store={store}>
      <NavigationContainer>
        <DialogProvider>{children}</DialogProvider>
      </NavigationContainer>
    </ReduxProvider>,
  )
}
