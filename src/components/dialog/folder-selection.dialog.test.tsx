import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'

import { FolderSelectionDialog } from '@components/dialog/folder-selection-dialog'
import { renderWithProviders } from '@root/src/test-utils'

describe('FolderSelectionDialog', () => {
  const mockOnFolderSelect = jest.fn()
  const mockOnConfirm = jest.fn()
  const mockOnCancel = jest.fn()

  const renderComponent = (props = {}) =>
    renderWithProviders(
      <FolderSelectionDialog
        visible={true}
        selectedFolderId={null}
        allowTitleEdit={false}
        onFolderSelect={mockOnFolderSelect}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        {...props}
      />,
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the dialog with folders', async () => {
    const { getByText } = renderComponent()

    await waitFor(() => expect(getByText('Folder 1')).toBeTruthy())
    expect(getByText('Folder 2')).toBeTruthy()
    expect(getByText('+ Create New Folder')).toBeTruthy()
  })

  it('calls onFolderSelect when a folder is clicked', async () => {
    const { getByText } = renderComponent()

    await waitFor(() => expect(getByText('Folder 1')).toBeTruthy())
    fireEvent.press(getByText('Folder 1'))
    expect(mockOnFolderSelect).toHaveBeenCalledWith(1)
  })

  it('shows a validation error when confirm is clicked without selecting a folder', () => {
    const { getByText, queryByText } = renderComponent()

    fireEvent.press(getByText('Confirm'))
    expect(queryByText('Please select a folder.')).toBeTruthy()
  })

  it('calls onConfirm when confirm is clicked with a folder selected', () => {
    const { getByText } = renderComponent({ selectedFolderId: 1 })

    fireEvent.press(getByText('Confirm'))
    expect(mockOnConfirm).toHaveBeenCalled()
  })

  it('calls onCancel when cancel is clicked', () => {
    const { getByText } = renderComponent()

    fireEvent.press(getByText('Cancel'))
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('renders the title input when allowTitleEdit is true', () => {
    const mockSetNoteTitle = jest.fn()
    const { getByPlaceholderText } = renderComponent({
      allowTitleEdit: true,
      noteTitle: 'Test Note',
      setNoteTitle: mockSetNoteTitle,
    })

    const input = getByPlaceholderText('Enter note title')
    expect(input).toBeTruthy()

    fireEvent.changeText(input, 'Updated Note Title')
    expect(mockSetNoteTitle).toHaveBeenCalledWith('Updated Note Title')
  })
})
