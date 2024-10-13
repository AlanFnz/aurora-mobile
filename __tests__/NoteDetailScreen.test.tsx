import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
} from '@store/queries/notes';
import NoteDetailScreen from '@screens/NoteDetailScreen';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { RootStackParamList } from '@navigation/types';

jest.mock('@store/queries/notes', () => ({
  useFetchNoteDetailsQuery: jest.fn(),
  useUpdateNoteMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };
const mockRoute: RouteProp<RootStackParamList, 'NoteDetail'> = {
  key: 'NoteDetailKey',
  name: 'NoteDetail',
  params: { noteId: 1 },
};

describe('NoteDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSafeAreaInsets as jest.Mock).mockReturnValue({
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
    });

    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
  });

  it('renders loading state initially', () => {
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    const { getByText } = render(
      <NavigationContainer>
        <NoteDetailScreen
          route={mockRoute}
          navigation={mockNavigation as any}
        />
      </NavigationContainer>,
    );

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders the note details when loaded', () => {
    (useFetchNoteDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        id: '1',
        title: 'Test Note',
        modifiedDate: Date.now(),
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    const { getByDisplayValue, getByText } = render(
      <NoteDetailScreen route={mockRoute} navigation={mockNavigation as any} />,
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
        modifiedDate: Date.now(),
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    (useUpdateNoteMutation as jest.Mock).mockReturnValue([mockUpdateNote]);

    const { getByDisplayValue, getByText } = render(
      <NoteDetailScreen route={mockRoute} navigation={mockNavigation as any} />,
    );

    fireEvent.changeText(getByDisplayValue('Test Note'), 'Updated Note Title');
    fireEvent.changeText(
      getByDisplayValue('This is the content of the note'),
      'Updated Note Content',
    );
    fireEvent.press(getByText('Save Changes'));

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
        modifiedDate: Date.now(),
        content: 'This is the content of the note',
      },
      isLoading: false,
    });

    const { getByText } = render(
      <NoteDetailScreen route={mockRoute} navigation={mockNavigation as any} />,
    );

    expect(getByText(/Oct 13, 2024 at \d{1,2}:\d{2} (AM|PM)/)).toBeTruthy();
  });
});
