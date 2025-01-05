import React from 'react'
import { useDispatch } from 'react-redux'
import { render, fireEvent } from '@testing-library/react-native'
import SettingsScreen from '.'
import { performSignOut } from '@store/auth.slice'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('@store/auth.slice', () => ({
  performSignOut: jest.fn(),
}))

describe('SettingsScreen', () => {
  const mockDispatch = jest.fn()
  beforeEach(() => {
    ;(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('renders correctly', () => {
    const { getByText } = render(<SettingsScreen />)

    expect(getByText('Settings')).toBeTruthy()
    expect(getByText('Sign Out')).toBeTruthy()
  })

  it('dispatches performSignOut on button press', () => {
    const { getByText } = render(<SettingsScreen />)
    const signOutButton = getByText('Sign Out')

    fireEvent.press(signOutButton)

    expect(mockDispatch).toHaveBeenCalledWith(performSignOut())
  })
})
