import React from 'react'
import { useDispatch } from 'react-redux'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import { performSignIn } from '@store/slices/auth.slice'
import { SignIn } from './sign-in'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@store/slices/auth.slice', () => ({
  performSignIn: jest.fn(),
}))

jest.mock('@hooks/use-toast', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}))

describe('SignIn', () => {
  const mockDispatch = jest.fn(() => Promise.resolve())

  beforeEach(() => {
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    expect(getByPlaceholderText('Username')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Sign In')).toBeTruthy()
  })

  it('dispatches performSignIn on button press', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const signInButton = getByText('Sign In')

    // Simulate user typing into the fields
    fireEvent.changeText(usernameInput, 'user')
    fireEvent.changeText(passwordInput, 'password')

    // Simulate button press
    fireEvent.press(signInButton)

    // Wait for async actions in Formik's onSubmit to complete
    await waitFor(() => {
      // Expect that performSignIn is called with the right arguments
      expect(performSignIn).toHaveBeenCalledWith('user', 'password')

      // Also, ensure dispatch was called (with our thunk)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })
})
