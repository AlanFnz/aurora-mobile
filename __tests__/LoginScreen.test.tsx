import React from 'react';
import LoginScreen from '../src/screens/LoginScreen';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { performSignIn } from '../src/store/authSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../src/store/authSlice', () => ({
  performSignIn: jest.fn(),
}));

describe('LoginScreen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('dispatches performSignIn on button press', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(usernameInput, 'user');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(signInButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      performSignIn('user', 'password'),
    );
  });
});
