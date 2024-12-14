import React from 'react'
import NoteItem from '@screens/home/components/folder/components/note-item'
import { render, fireEvent } from '@testing-library/react-native'
import { formatTimestampToDate } from '@root/src/utils'
import { useNavigation } from '@react-navigation/native'
import { NoteListItem } from '@screens/home/components/folder/types'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

const mockNavigation = {
  navigate: jest.fn(),
}

describe('NoteItem', () => {
  const mockedDate = new Date('2024-10-13T11:34:00').getTime()

  beforeAll(() => {
    process.env.TZ = 'UTC'
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

  const item: NoteListItem = {
    id: 1,
    title: 'Test Note',
    snippet: 'This is a snippet',
    modifiedDate: mockedDate,
  }

  it('renders the note item with correct title, snippet, and date', () => {
    const { getByText } = render(
      <NoteItem index={0} item={item} notesLength={2} />,
    )

    expect(getByText('Test Note: This is a snippet')).toBeTruthy()

    const formattedDate = formatTimestampToDate(mockedDate)

    expect(getByText(formattedDate)).toBeTruthy()
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

  it('renders the divider for all but the last item', () => {
    const { getByTestId } = render(
      <NoteItem index={0} item={item} notesLength={2} />,
    )

    expect(getByTestId('divider')).toBeTruthy()

    const { queryByTestId: queryByTestIdLast } = render(
      <NoteItem index={1} item={item} notesLength={2} />,
    )

    expect(queryByTestIdLast('divider')).toBeNull()
  })
})
