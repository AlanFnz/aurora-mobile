import React from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { fireEvent, waitFor, screen } from '@testing-library/react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { RootStackParamList } from '@navigation/types'
import { renderWithProviders } from '@root/src/test-utils'

import { NoteDetails } from './note-details'

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}))

const mockNavigate = jest.fn()
const mockNavigation = { navigate: mockNavigate }
const mockRoute: RouteProp<RootStackParamList, 'NoteDetails'> = {
  key: 'NoteDetailKey',
  name: 'NoteDetails',
  params: { noteId: 1, isNew: false },
}

describe('NoteDetails', () => {
  const mockedDate = new Date('2024-10-13T11:34:00').getTime()

  beforeAll(() => {
    jest
      .spyOn(Intl.DateTimeFormat.prototype, 'resolvedOptions')
      .mockReturnValue({
        timeZone: 'Europe/Madrid',
        locale: 'en-US',
        calendar: 'gregory',
        numberingSystem: 'latn',
      })
  })

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

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('renders loading state initially', async () => {
    renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    expect(screen.getByText('Loading...')).toBeTruthy()

    await waitFor(() =>
      expect(screen.getByDisplayValue('Meeting Notes')).toBeTruthy(),
    )
  })

  it('renders the note details when loaded', async () => {
    renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    await waitFor(() => {
      expect(screen.getByDisplayValue('Meeting Notes')).toBeTruthy()
      expect(screen.getByDisplayValue('Discuss project updates')).toBeTruthy()
    })
  })

  it('updates note on save button press', async () => {
    renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    await waitFor(() =>
      expect(screen.getByDisplayValue('Meeting Notes')).toBeTruthy(),
    )

    fireEvent.changeText(
      screen.getByDisplayValue('Meeting Notes'),
      'Updated Note Title',
    )
    fireEvent.changeText(
      screen.getByDisplayValue('Discuss project updates'),
      'Updated Note Content',
    )
    fireEvent.press(screen.getByTestId('save-button'))

    await waitFor(() => {
      expect(screen.getByDisplayValue('Updated Note Title')).toBeTruthy()
      expect(screen.getByDisplayValue('Updated Note Content')).toBeTruthy()
    })
  })

  it('displays the date correctly', async () => {
    renderWithProviders(
      <NoteDetails route={mockRoute} navigation={mockNavigation as any} />,
    )

    await waitFor(() => {
      expect(screen.getByText('Oct 13, 2024 at 11:34 AM')).toBeTruthy()
    })
  })
})
