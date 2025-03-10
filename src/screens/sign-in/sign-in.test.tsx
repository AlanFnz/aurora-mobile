import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { performSignIn } from '@store/slices'
import { SignIn } from './sign-in'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@store/slices', () => ({
  performSignIn: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

jest.mock('@hooks/use-toast', () => ({
  useToast: () => ({
    showToast: jest.fn(),
  }),
}))

describe('SignIn', () => {
  const mockDispatch = jest.fn(() => Promise.resolve())
  const mockNavigate = jest.fn()

  beforeEach(() => {
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
    ;(useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate })
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    expect(getByPlaceholderText('Username')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Sign In')).toBeTruthy()
    expect(getByText("Don't have an account?")).toBeTruthy()
    expect(getByText('Sign Up')).toBeTruthy()
  })

  it('dispatches performSignIn on button press', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')

    fireEvent.changeText(usernameInput, 'testuser')
    fireEvent.changeText(passwordInput, 'testpassword')

    const signInButton = getByText('Sign In')
    fireEvent.press(signInButton)

    await waitFor(() => {
      expect(performSignIn).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpassword',
      })

      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  it('navigates to SignUp on prompt press', () => {
    const { getByText } = render(<SignIn />)

    const signUpPromptLink = getByText('Sign Up')
    fireEvent.press(signUpPromptLink)

    expect(mockNavigate).toHaveBeenCalledWith('SignUp')
  })
})
