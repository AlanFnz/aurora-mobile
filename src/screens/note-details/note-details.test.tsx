import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native'

import foldersReducer from '@store/slices/folders.slice'
import {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
} from '@store/queries/notes.queries'
import NoteDetails from '@screens/note-details'
import { RootStackParamList } from '@navigation/types'
import { DialogProvider } from '@context/dialog'

jest.mock('@store/queries/notes.queries', () => ({
  useFetchNoteDetailsQuery: jest.fn(),
  useUpdateNoteMutation: jest.fn(() => [jest.fn()]),
  useCreateNoteMutation: jest.fn(() => [jest.fn().mockResolvedValue({})]),
  useDeleteNoteMutation: jest.fn(() => [jest.fn()]),
}))

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}))

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useNavigation: jest.fn(),
  }
})

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      folders: foldersReducer,
    },
    preloadedState,
  })
}

const mockNavigate = jest.fn()
const mockNavigation = { navigate: mockNavigate }
const mockRoute: RouteProp<RootStackParamList, 'NoteDetails'> = {
  key: 'NoteDetailKey',
  name: 'NoteDetails',
  params: { noteId: 1, isNew: false },
}

describe('NoteDetails', () => {
  const mockedDate = new Date('2024-10-13T11:34:00').getTime()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(global.Date, 'now').mockImplementation(() => mockedDate)
    ;(useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
    })
  })
  ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const renderWithProviders = (component: React.ReactNode) => {
    const store = createTestStore({
      folders: [
        {
          id: 1,
          folderName: 'Test Folder',
          notes: [],
        },
      ],
    })

    return render(
      <Provider store={store}>
        <DialogProvider>
          <NavigationContainer>{component}</NavigationContainer>
        </DialogProvider>
      </Provider>,
    )
  }

  it('renders loading state initially', () => {
    ;(useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    })

    const { getByText } = renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    expect(getByText('Loading...')).toBeTruthy()
  })

  it('renders the note details when loaded', () => {
    ;(useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    })

    const { getByDisplayValue } = renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    expect(getByDisplayValue('Test Note')).toBeTruthy()
    expect(getByDisplayValue('This is the content of the note')).toBeTruthy()
  })

  it('updates note on save button press', async () => {
    const mockUpdateNote = jest.fn()
    ;(useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    })
    ;(useUpdateNoteMutation as jest.Mock).mockReturnValue([mockUpdateNote])

    const { getByDisplayValue, UNSAFE_getByProps } = renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    fireEvent.changeText(getByDisplayValue('Test Note'), 'Updated Note Title')
    fireEvent.changeText(
      getByDisplayValue('This is the content of the note'),
      'Updated Note Content',
    )
    fireEvent.press(UNSAFE_getByProps({ iconName: 'save-sharp' }))

    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalledWith({
        id: '1',
        title: 'Updated Note Title',
        content: 'Updated Note Content',
      })
    })
  })

  it('displays the date correctly', () => {
    ;(useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    })

    const { getByText } = renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    expect(getByText('Oct 13, 2024 at 11:34 AM')).toBeTruthy()
  })
})
