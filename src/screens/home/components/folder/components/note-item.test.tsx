import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

import NoteItem from '@screens/home/components/folder/components/note-item'
import { NoteListItem } from '@screens/home/components/folder/folder.types'
import { formatTimestampToDate } from '@root/src/utils'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

jest.mock('react-native-gesture-handler/ReanimatedSwipeable', () => {
  const ReanimatedSwipeableMock = ({
    children,
  }: {
    children: React.ReactNode
  }) => <>{children}</>
  ReanimatedSwipeableMock.displayName = 'ReanimatedSwipeableMock'
  return ReanimatedSwipeableMock
})

jest.mock('@screens/note-details/hooks/use-note-details-screen', () => ({
  useNoteDetailsScreen: () => ({
    handleDelete: jest.fn(),
  }),
}))

jest.mock(
  '@screens/home/components/folder/components/note-swipe-actions',
  () => ({
    NoteSwipeActions: () => null,
  }),
)

const mockNavigation = {
  navigate: jest.fn(),
}

describe('NoteItem', () => {
  const mockedDate = new Date('2024-10-13T11:34:00').getTime()

  const item: NoteListItem = {
    id: 1,
    title: 'Test Note',
    snippet: 'This is a snippet',
    modifiedDate: mockedDate,
  }

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-10-13T11:34:00'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    jest.clearAllMocks()
  })

  it('renders the note title, snippet, and formatted date', () => {
    const { getByText } = render(
      <NoteItem index={0} item={item} notesLength={2} />,
    )

    expect(getByText('Test Note: This is a snippet')).toBeTruthy()
    expect(getByText(formatTimestampToDate(mockedDate))).toBeTruthy()
  })

  it('navigates to the note details screen when pressed', () => {
    const { getByTestId } = render(
      <NoteItem index={0} item={item} notesLength={2} />,
    )

    fireEvent.press(getByTestId('note-item-container'))

    expect(mockNavigation.navigate).toHaveBeenCalledWith('NoteDetails', {
      noteId: item.id,
    })
  })

  it('renders the divider when not the last item', () => {
    const { getByTestId } = render(
      <NoteItem index={0} item={item} notesLength={2} />,
    )
    expect(getByTestId('divider')).toBeTruthy()
  })

  it('does not render the divider when it is the last item', () => {
    const { queryByTestId } = render(
      <NoteItem index={1} item={item} notesLength={2} />,
    )
    expect(queryByTestId('divider')).toBeNull()
  })
})
