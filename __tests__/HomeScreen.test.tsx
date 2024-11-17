import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';

import { Folder } from '@store/foldersSlice';
import { RootState } from '@store/index';
import foldersMockData from '@store/mockData/folders.mockData';
import { Note } from '@store/queries/notes';

import HomeScreen from '@screens/HomeScreen';

jest.mock('@screens/HomeScreen/components/FolderList', () => {
  const { View } = require('react-native');
  return (props: { folders: Folder[] }) => (
    <View testID="folder-list">
      {props.folders.map((folder: Folder) => (
        <View key={folder.id} />
      ))}
    </View>
  );
});
jest.mock('@screens/HomeScreen/components/SearchBox', () => {
  const React = require('react');
  const { TextInput, View } = require('react-native');
  return ({
    searchQuery,
    setSearchQuery,
  }: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }) => (
    <View>
      <TextInput
        testID="search-input"
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
});
jest.mock('@screens/HomeScreen/components/NotesResultsList', () => {
  const { View } = require('react-native');
  return (props: { notes: Note[] }) => (
    <View testID="notes-results">
      {props.notes.map((note: Note) => (
        <View key={note.id} />
      ))}
    </View>
  );
});
jest.mock(
  '@screens/HomeScreen/components/FloatingButton',
  () => 'FloatingButton',
);
jest.mock('@components/BackgroundLayers', () => 'BackgroundLayers');

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

describe('HomeScreen', () => {
  const mockStore = configureStore<Partial<RootState>>([]);
  const initialState = {
    folders: {
      folders: foldersMockData,
    },
  };

  let store: MockStoreEnhanced<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore(initialState);
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

  const renderWithProviders = (component: React.ReactNode) =>
    render(
      <Provider store={store}>
        <NavigationContainer>{component}</NavigationContainer>
      </Provider>,
    );

  it('renders the background layers', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);
    expect(getByTestId('background-layers')).toBeTruthy();
  });

  it('renders the container with correct insets', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);
    const container = getByTestId('container');
    expect(container.props.style.paddingTop).toBe(20);
    expect(container.props.style.paddingLeft).toBe(0);
    expect(container.props.style.paddingRight).toBe(-2);
  });

  it('renders the folder list when there is no search query', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);
    expect(getByTestId('folder-list')).toBeTruthy();
  });

  it('renders the notes results list when there is a search query', () => {
    const { getByTestId } = renderWithProviders(<HomeScreen />);

    const searchInput = getByTestId('search-input');
    fireEvent.changeText(searchInput, 'Sample Note');

    expect(getByTestId('notes-results')).toBeTruthy();
  });
});
