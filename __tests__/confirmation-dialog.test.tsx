import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'

import { ConfirmationDialog } from '@components/dialog/confirmation-dialog/confirmation-dialog'

describe('ConfirmationDialog', () => {
  const mockOnConfirm = jest.fn()
  const mockOnCancel = jest.fn()

  const renderComponent = (props = {}) =>
    render(
      <ConfirmationDialog
        visible={true}
        title="Confirm Action"
        message="Are you sure you want to proceed?"
        confirmText="Yes"
        cancelText="No"
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        {...props}
      />,
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the dialog with title and message', () => {
    const { getByText } = renderComponent()

    expect(getByText('Confirm Action')).toBeTruthy()
    expect(getByText('Are you sure you want to proceed?')).toBeTruthy()
    expect(getByText('Yes')).toBeTruthy()
    expect(getByText('No')).toBeTruthy()
  })

  it('calls onConfirm when the confirm button is pressed', () => {
    const { getByText } = renderComponent()

    fireEvent.press(getByText('Yes'))
    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
  })

  it('calls onCancel when the cancel button is pressed', () => {
    const { getByText } = renderComponent()

    fireEvent.press(getByText('No'))
    expect(mockOnCancel).toHaveBeenCalledTimes(1)
  })

  it('renders only the title when no message is provided', () => {
    const { getByText, queryByText } = renderComponent({ message: undefined })

    expect(getByText('Confirm Action')).toBeTruthy()
    expect(queryByText('Are you sure you want to proceed?')).toBeNull()
  })

  it('renders default button texts when none are provided', () => {
    const { getByText } = renderComponent({
      confirmText: undefined,
      cancelText: undefined,
    })

    expect(getByText('Confirm')).toBeTruthy()
    expect(getByText('Cancel')).toBeTruthy()
  })

  it('does not render the dialog when visible is false', () => {
    const { queryByText } = renderComponent({ visible: false })

    expect(queryByText('Confirm Action')).toBeNull()
    expect(queryByText('Are you sure you want to proceed?')).toBeNull()
  })
})
