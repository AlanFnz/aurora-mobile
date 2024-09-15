import React from 'react';
import SettingsScreen from '../src/screens/SettingsScreen';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { performSignOut } from '../src/store/authSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../src/store/authSlice', () => ({
  performSignOut: jest.fn(),
}));

describe('SettingsScreen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Sign Out')).toBeTruthy();
  });

  it('dispatches performSignOut on button press', () => {
    const { getByText } = render(<SettingsScreen />);
    const signOutButton = getByText('Sign Out');

    fireEvent.press(signOutButton);

    expect(mockDispatch).toHaveBeenCalledWith(performSignOut());
  });
});
