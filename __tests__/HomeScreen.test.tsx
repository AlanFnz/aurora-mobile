import React from 'react';
import HomeScreen from '@screens/HomeScreen';
import { render } from '@testing-library/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

jest.mock('@screens/HomeScreen/components/FolderList', () => 'FolderList');
jest.mock('@components/BackgroundLayers', () => 'BackgroundLayers');

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 20,
      bottom: 0,
      left: 0,
      right: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the background layers', () => {
    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('background-layers')).toBeTruthy();
  });

  it('renders the container with correct insets', () => {
    const { getByTestId } = render(<HomeScreen />);

    const container = getByTestId('container');

    expect(container.props.style.paddingTop).toBe(20);
    expect(container.props.style.paddingLeft).toBe(0);
    expect(container.props.style.paddingRight).toBe(0);
  });

  it('renders the folder list', () => {
    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('folder-list')).toBeTruthy();
  });
});
