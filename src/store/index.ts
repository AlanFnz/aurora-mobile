import { foldersApi } from './queries/folders'
import { noteApi } from './queries/notes'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@store/auth.slice'
import foldersReducer from '@store/folders.slice'

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
