import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

jest.mock('react-native-gesture-handler', () => {
  const gestureHandler = jest.requireActual('react-native-gesture-handler');

  return {
    ...gestureHandler,
    GestureHandlerRootView: jest.fn(({ children }) => children),
    Swipeable: jest.fn(() => null),
    DrawerLayout: jest.fn(() => null),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
