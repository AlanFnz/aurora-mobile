import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { performSignUp } from '@store/slices/auth.slice'
import { SignUp } from './sign-up'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@store/slices/auth.slice', () => ({
  performSignUp: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

jest.mock('@hooks/use-toast', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}))

describe('SignUp', () => {
  const mockDispatch = jest.fn(() => Promise.resolve())
  const mockNavigate = jest.fn()

  beforeEach(() => {
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
    ;(useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate })
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />)

    expect(getByPlaceholderText('Username')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Sign Up')).toBeTruthy()
    expect(getByText('Already have an account?')).toBeTruthy()
    expect(getByText('Sign In')).toBeTruthy()
  })

  it('dispatches performSignUp on button press', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    fireEvent.changeText(usernameInput, 'newuser')
    fireEvent.changeText(passwordInput, 'newpassword')

    const signUpButton = getByText('Sign Up')
    fireEvent.press(signUpButton)

    await waitFor(() => {
      expect(performSignUp).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'newpassword',
      })

      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('navigates to the SignIn screen on prompt press', () => {
    const { getByText } = render(<SignUp />)

    const signInPromptLink = getByText('Sign In')
    fireEvent.press(signInPromptLink)

    expect(mockNavigate).toHaveBeenCalledWith('SignIn')
  })
})
