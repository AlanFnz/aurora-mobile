import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import Folder from '@screens/home/components/folder'
import { FolderProps } from '@screens/home/components/folder/types'

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon')
jest.mock(
  '@screens/home/components/folder/components/gradient-background',
  () => 'GradientBackground',
)
jest.mock(
  '@screens/home/components/folder/components/note-item',
  () => 'NoteItem',
)
jest.mock('@components/divider', () => 'Divider')

const folderData: FolderProps = {
  folder: {
    id: 1,
    folderName: 'Test Folder',
    notes: [
      {
        id: 1,
        title: 'Note 1',
        snippet: 'Snippet 1',
        modifiedDate: 1696896000000,
      },
      {
        id: 2,
        title: 'Note 2',
        snippet: 'Snippet 2',
        modifiedDate: 1696896000000,
      },
    ],
  },
}

describe('Folder', () => {
  it('renders the folder title correctly', () => {
    const { getByText } = render(<Folder folder={folderData.folder} />)

    expect(getByText('Test Folder')).toBeTruthy()
  })

  it('toggles the folder expansion when header is pressed', () => {
    const { getByText, queryByTestId } = render(
      <Folder folder={folderData.folder} />,
    )

    expect(queryByTestId('divider')).toBeTruthy()
    expect(queryByTestId('flat-list')).toBeNull()

    fireEvent.press(getByText('Test Folder'))

    expect(queryByTestId('divider')).toBeNull()
    expect(queryByTestId('flat-list')).toBeTruthy()
  })

  it('displays notes when the folder is expanded', () => {
    const { getByText, getByTestId } = render(
      <Folder folder={folderData.folder} />,
    )

    fireEvent.press(getByText('Test Folder'))

    const flatList = getByTestId('flat-list')
    expect(flatList).toBeTruthy()
    expect(flatList.props.data).toHaveLength(2)

    expect(getByTestId('note-item-1')).toBeTruthy()
    expect(getByTestId('note-item-2')).toBeTruthy()
  })

  it('renders a divider when the folder is not expanded', () => {
    const { queryByTestId } = render(<Folder folder={folderData.folder} />)

    expect(queryByTestId('divider')).toBeTruthy()
  })
})
