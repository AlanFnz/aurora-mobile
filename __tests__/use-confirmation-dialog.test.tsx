import { renderHook, act } from '@testing-library/react-hooks'

import { useConfirmationDialog } from '@components/dialog'

describe('useConfirmationDialog', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useConfirmationDialog())

    expect(result.current.isDialogVisible).toBe(false)
    expect(result.current.dialogProps).toEqual({
      visible: false,
      title: '',
      message: undefined,
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: expect.any(Function),
      onCancel: expect.any(Function),
    })
  })

  it('should show the dialog with provided options', () => {
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.showDialog(() => {}, {
        message: 'Test Message',
        confirmText: 'Yes',
        cancelText: 'No',
      })
    })

    expect(result.current.isDialogVisible).toBe(true)
    expect(result.current.dialogProps).toMatchObject({
      visible: true,
      title: 'Test Message',
      message: 'Test Message',
      confirmText: 'Yes',
      cancelText: 'No',
    })
  })

  it('should hide the dialog when hideDialog is called', () => {
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.showDialog(() => {}, { message: 'Test Message' })
      result.current.hideDialog()
    })

    expect(result.current.isDialogVisible).toBe(false)
    expect(result.current.dialogProps.visible).toBe(false)
  })

  it('should call onConfirm and hide the dialog', () => {
    const mockOnConfirm = jest.fn()
    const { result } = renderHook(() => useConfirmationDialog())

    act(() => {
      result.current.showDialog(mockOnConfirm, { message: 'Test Message' })
    })

    expect(result.current.isDialogVisible).toBe(true)

    act(() => {
      result.current.dialogProps.onConfirm()
    })

    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(result.current.isDialogVisible).toBe(false)
  })
})
