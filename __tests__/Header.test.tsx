import React from 'react'
import Header from '@components/header'
import { render, fireEvent } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}))

const mockNavigation = {
  goBack: jest.fn(),
}

describe('Header', () => {
  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(mockNavigation)
    ;(useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 0,
      left: 0,
      right: 0,
    })
    jest.clearAllMocks()
  })

  it('renders the back button correctly', () => {
    const { getByTestId } = render(<Header />)
    const backButton = getByTestId('back-button')
    expect(backButton).toBeTruthy()
  })

  it('triggers navigation.goBack when the back button is pressed', () => {
    const { getByTestId } = render(<Header />)
    const backButton = getByTestId('back-button')

    fireEvent.press(backButton)
    expect(mockNavigation.goBack).toHaveBeenCalled()
  })

  it('renders the title when provided', () => {
    const { getByText } = render(<Header title="Test Title" />)
    expect(getByText('Test Title')).toBeTruthy()
  })

  it('does not render the title when not provided', () => {
    const { queryByText } = render(<Header />)
    expect(queryByText('Test Title')).toBeNull()
  })
})
