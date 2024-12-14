import React from 'react'
import { useSelector } from 'react-redux'
import { render } from '@testing-library/react-native'

import FolderList from '@screens/home/components/folder-list'

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}))

describe('FolderList', () => {
  const mockFolders = [
    { id: 1, folderName: 'Folder 1', notes: [] },
    { id: 2, folderName: 'Folder 2', notes: [] },
  ]

  beforeEach(() => {
    ;(useSelector as unknown as jest.Mock).mockImplementation(callback =>
      callback({ folders: { folders: mockFolders } }),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the correct number of folders', () => {
    const { getAllByTestId } = render(<FolderList folders={mockFolders} />)

    expect(getAllByTestId('folder-component')).toHaveLength(mockFolders.length)
  })

  it('renders no folders when the list is empty', () => {
    ;(useSelector as unknown as jest.Mock).mockImplementation(callback =>
      callback({ folders: { folders: [] } }),
    )

    const { queryByTestId } = render(<FolderList folders={[]} />)

    expect(queryByTestId('folder-component')).toBeNull()
  })
})
