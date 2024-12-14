import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { fireEvent, render } from '@testing-library/react-native'

import foldersReducer from '@store/folders.slice'
import foldersMockData from '@store/mocks/folders.mocks'
import HomeScreen from '@screens/home'

jest.mock('@screens/HomeScreen/components/FolderList', () => 'FolderList')
jest.mock(
  '@screens/HomeScreen/components/NotesResultsList',
  () => 'NotesResultsList',
)
jest.mock(
  '@screens/HomeScreen/components/FloatingButton',
  () => 'FloatingButton',
)
jest.mock('@components/BackgroundLayers', () => 'BackgroundLayers')

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}))

describe('HomeScreen', () => {
  const initialState = {
    folders: foldersMockData,
  }

  beforeEach(() => {
    ;(useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const createTestStore = (preloadedState = initialState) =>
    configureStore({
      reducer: {
        folders: foldersReducer,
      },
      preloadedState,
    })

  const renderWithProviders = (component: React.ReactNode) => {
    const store = createTestStore(initialState)

    return render(
      <Provider store={store}>
        <NavigationContainer>{component}</NavigationContainer>
      </Provider>,
    )
  }

  it('renders the background layers', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />)
    expect(getByTestId('background-layers')).toBeTruthy()
  })

  it('renders the container with correct insets', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />)
    const container = getByTestId('container')
    expect(container.props.style.paddingTop).toBe(20)
    expect(container.props.style.paddingLeft).toBe(0)
    expect(container.props.style.paddingRight).toBe(-2)
  })

  it('renders the folder list', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />)
    expect(getByTestId('folder-list')).toBeTruthy()
  })

  it('renders the notes results list when there is a search query', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />)

    const searchInput = getByTestId('search-input')
    fireEvent.changeText(searchInput, 'Sample Note')

    expect(getByTestId('notes-results')).toBeTruthy()
  })
})
