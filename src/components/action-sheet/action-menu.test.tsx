import React from 'react'
import { Text } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'

import { Dialog } from '@components/dialog'

describe('Dialog Component', () => {
  const onRequestCloseMock = jest.fn()
  const onConfirmMock = jest.fn()
  const onCancelMock = jest.fn()

  const buttons = [
    { text: 'Cancel', onPress: onCancelMock },
    { text: 'Confirm', onPress: onConfirmMock },
  ]

  const renderDialog = (props = {}) =>
    render(
      <Dialog
        visible={true}
        title="Test Dialog"
        buttons={buttons}
        onRequestClose={onRequestCloseMock}
        {...props}
      />,
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly when visible', () => {
    const { getByText } = renderDialog()
    expect(getByText('Test Dialog')).toBeTruthy()
    expect(getByText('Cancel')).toBeTruthy()
    expect(getByText('Confirm')).toBeTruthy()
  })

  it('renders children when provided', () => {
    const { getByText } = renderDialog({
      children: <>{<Text>Test Content</Text>}</>,
    })
    expect(getByText('Test Content')).toBeTruthy()
  })

  it('calls the correct button handlers', () => {
    const { getByText } = renderDialog()

    fireEvent.press(getByText('Cancel'))
    expect(onCancelMock).toHaveBeenCalledTimes(1)

    fireEvent.press(getByText('Confirm'))
    expect(onConfirmMock).toHaveBeenCalledTimes(1)
  })

  it('calls onRequestClose when modal is closed', () => {
    const { getByTestId } = renderDialog()
    fireEvent(getByTestId('Modal'), 'requestClose')
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1)
  })

  it('does not render when visible is false', () => {
    const { queryByText } = renderDialog({ visible: false })
    expect(queryByText('Test Dialog')).toBeNull()
  })
})
