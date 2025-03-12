import 'react-native-gesture-handler/jestSetup'
import { jest, beforeAll, afterEach, afterAll } from '@jest/globals'

import { server } from '@root/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

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
  const gestureHandler = jest.requireActual<
    typeof import('react-native-gesture-handler')
  >('react-native-gesture-handler')

  return {
    ...gestureHandler,
    GestureHandlerRootView: jest.fn(({ children }) => children),
    Swipeable: jest.fn(() => null),
    DrawerLayout: jest.fn(() => null),
  }
})
