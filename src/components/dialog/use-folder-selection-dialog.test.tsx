import { renderHook, act } from '@testing-library/react-hooks'

import { useFolderSelectionDialog } from '@components/dialog'

describe('useFolderSelectionDialog', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFolderSelectionDialog())

    expect(result.current.isDialogVisible).toBe(false)
    expect(result.current.dialogProps.visible).toBe(false)
    expect(result.current.dialogProps.selectedFolderId).toBeNull()
    expect(result.current.dialogProps.noteTitle).toBeUndefined()
    expect(result.current.dialogProps.newFolderName).toBeUndefined()
    expect(result.current.dialogProps.allowTitleEdit).toBe(false)
  })

  it('should show the dialog with the correct options', () => {
    const mockOnConfirm = jest.fn()
    const { result } = renderHook(() => useFolderSelectionDialog())

    act(() => {
      result.current.showDialog(mockOnConfirm, { allowTitleEdit: true })
    })

    expect(result.current.isDialogVisible).toBe(true)
    expect(result.current.dialogProps.visible).toBe(true)
    expect(result.current.dialogProps.allowTitleEdit).toBe(true)
  })

  it('should hide the dialog and reset state', () => {
    const { result } = renderHook(() => useFolderSelectionDialog())

    act(() => {
      result.current.hideDialog()
    })

    expect(result.current.isDialogVisible).toBe(false)
    expect(result.current.dialogProps.visible).toBe(false)
    expect(result.current.dialogProps.selectedFolderId).toBeNull()
    expect(result.current.dialogProps.noteTitle).toBeUndefined()
    expect(result.current.dialogProps.newFolderName).toBeUndefined()
  })

  it('should update selected folder and new folder name when folder is selected', () => {
    const { result } = renderHook(() => useFolderSelectionDialog())

    act(() => {
      result.current.dialogProps.onFolderSelect(1, 'New Folder Name')
    })

    expect(result.current.dialogProps.selectedFolderId).toBe(1)
    expect(result.current.dialogProps.newFolderName).toBe('New Folder Name')
  })

  it('should call onConfirm and hide the dialog on confirmation', () => {
    const mockOnConfirm = jest.fn()
    const { result } = renderHook(() => useFolderSelectionDialog())

    act(() => {
      result.current.showDialog(mockOnConfirm)
      result.current.dialogProps.onFolderSelect(2, 'Another Folder')
      result.current.dialogProps.setNoteTitle?.('Test Note Title')
    })

    act(() => {
      result.current.dialogProps.onConfirm()
    })

    expect(mockOnConfirm).toHaveBeenCalledWith({
      folderId: 2,
      noteTitle: 'Test Note Title',
      newFolderName: 'Another Folder',
    })
    expect(result.current.isDialogVisible).toBe(false)
  })

  it('should reset newFolderName and selectedFolderId on hideDialog', () => {
    const { result } = renderHook(() => useFolderSelectionDialog())

    act(() => {
      result.current.dialogProps.onFolderSelect(1, 'Temporary Folder Name')
      result.current.hideDialog()
    })

    expect(result.current.dialogProps.selectedFolderId).toBeNull()
    expect(result.current.dialogProps.newFolderName).toBeUndefined()
  })
})
