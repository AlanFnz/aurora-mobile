import React from 'react'
import { useDispatch } from 'react-redux'
import { render, fireEvent } from '@testing-library/react-native'

import { performSignIn } from '../../store/slices/auth.slice'
import { SignIn } from './sign-in'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@store/auth.slice', () => ({
  performSignIn: jest.fn(),
}))

describe('Login', () => {
  const mockDispatch = jest.fn()
  beforeEach(() => {
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    expect(getByPlaceholderText('Username')).toBeTruthy()
    expect(getByPlaceholderText('Password')).toBeTruthy()
    expect(getByText('Sign In')).toBeTruthy()
  })

  it('dispatches performSignIn on button press', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const signInButton = getByText('Sign In')

    fireEvent.changeText(usernameInput, 'user')
    fireEvent.changeText(passwordInput, 'password')
    fireEvent.press(signInButton)

    expect(mockDispatch).toHaveBeenCalledWith(performSignIn('user', 'password'))
  })
})
