import { configureStore } from '@reduxjs/toolkit'

import authReducer from '@store/slices/auth'
import foldersReducer from '@store/slices/folder'

import { noteApi } from './queries/note'
import { foldersApi } from './queries/folder'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    folders: foldersReducer,
    [foldersApi.reducerPath]: foldersApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(foldersApi.middleware, noteApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
