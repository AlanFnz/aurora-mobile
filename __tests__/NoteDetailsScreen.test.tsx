import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NoteDetailsScreen from '@screens/NoteDetailsScreen';
import { RootStackParamList } from '@navigation/types';
import foldersReducer from '@store/foldersSlice';
import authReducer from '@store/authSlice';
import {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
} from '@store/queries/notes';

jest.mock('@store/queries/notes', () => ({
  useFetchNoteDetailsQuery: jest.fn(),
  useUpdateNoteMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('@store/queries/notes', () => ({
  useFetchNoteDetailsQuery: jest.fn(),
  useUpdateNoteMutation: jest.fn(() => [jest.fn()]),
  useCreateNoteMutation: jest.fn(() => [jest.fn().mockResolvedValue({})]),
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setParams: jest.fn(),
};

const mockRoute: RouteProp<RootStackParamList, 'NoteDetails'> = {
  key: 'NoteDetailKey',
  name: 'NoteDetails',
  params: { noteId: 1, isNew: false },
};

describe('NoteDetailsScreen', () => {
  const mockedDate = new Date('2024-10-13T11:34:00').getTime();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(global.Date, 'now').mockImplementation(() => mockedDate);
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderWithProvider = (ui: React.ReactElement) => {
    const mockStore = configureStore({
      reducer: {
        folders: foldersReducer,
        auth: authReducer,
      },
      preloadedState: {
        folders: {
          folders: [
            {
              id: 1,
              folderName: 'Personal',
              notes: [],
            },
          ],
        },
        auth: { userToken: 'mockToken', isLoading: false, isSignout: false },
      },
    });

    return render(
      <Provider store={mockStore}>
        <NavigationContainer>{ui}</NavigationContainer>
      </Provider>,
    );
  };

  it('renders loading state initially', () => {
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { getByText } = renderWithProvider(
      <NoteDetailsScreen
        route={mockRoute}
        navigation={mockNavigation as any}
      />,
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders the note details when loaded', () => {
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    const { getByDisplayValue, getByText } = renderWithProvider(
      <NoteDetailsScreen
        route={mockRoute}
        navigation={mockNavigation as any}
      />,
    );

    expect(getByDisplayValue('Test Note')).toBeTruthy();
    expect(getByDisplayValue('This is the content of the note')).toBeTruthy();
  });

  it('updates note on save button press', async () => {
    const mockUpdateNote = jest.fn();
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    (useUpdateNoteMutation as jest.Mock).mockReturnValue([mockUpdateNote]);

    const { getByDisplayValue, getByText } = renderWithProvider(
      <NoteDetailsScreen
        route={mockRoute}
        navigation={mockNavigation as any}
      />,
    );

    fireEvent.changeText(getByDisplayValue('Test Note'), 'Updated Note Title');
    fireEvent.changeText(
      getByDisplayValue('This is the content of the note'),
      'Updated Note Content',
    );
    fireEvent.press(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(mockUpdateNote).toHaveBeenCalledWith({
        id: '1',
        title: 'Updated Note Title',
        content: 'Updated Note Content',
      });
    });
  });

  it('displays the date correctly', () => {
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: mockedDate,
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    const { getByText } = renderWithProvider(
      <NoteDetailsScreen
        route={mockRoute}
        navigation={mockNavigation as any}
      />,
    );

    expect(getByText('Oct 13, 2024 at 11:34 AM')).toBeTruthy();
  });
});
