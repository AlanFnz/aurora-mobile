import 'react-native-gesture-handler/jestSetup'

import { Action, Middleware } from '@reduxjs/toolkit'

/**
 *
 * TODO: use network interceptors and deprecate this
 */
jest.mock('@store/queries/notes.queries', () => ({
  noteApi: {
    reducerPath: 'noteApi',
    reducer: (state = {}) => state,
    middleware: (() => (next: (action: Action) => void) => (action: Action) =>
      next(action)) as Middleware,
  },
  useCreateNoteMutation: () => [
    jest.fn().mockResolvedValue({ id: 1, title: 'Test Note' }),
  ],
  useUpdateNoteMutation: () => [
    jest.fn().mockResolvedValue({ id: 1, title: 'Updated Note' }),
  ],
  useDeleteNoteMutation: () => [jest.fn().mockResolvedValue({})],
}))

jest.mock('@store/queries/folders.queries', () => ({
  foldersApi: {
    reducerPath: 'foldersApi',
    reducer: (state = {}) => state,
    middleware: (() => (next: (action: Action) => void) => (action: Action) =>
      next(action)) as Middleware,
  },
  useCreateFolderMutation: () => [
    jest.fn().mockResolvedValue({ id: 1, folderName: 'Test Folder' }),
  ],
}))
/**
 * ////////////////////
 * ////////////////////
 */

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}))

jest.mock('react-native-gesture-handler', () => {
  const gestureHandler = jest.requireActual('react-native-gesture-handler')

  return {
    ...gestureHandler,
    GestureHandlerRootView: jest.fn(({ children }) => children),
    Swipeable: jest.fn(() => null),
    DrawerLayout: jest.fn(() => null),
  }
})

