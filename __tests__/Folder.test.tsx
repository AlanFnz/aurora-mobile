import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FlatList } from 'react-native';
import { FolderProps } from '@screens/HomeScreen/components/Folder/types';
import Folder from '@screens/HomeScreen/components/Folder';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock(
  '@screens/HomeScreen/components/Folder/components/GradientBackground',
  () => 'GradientBackground',
);
jest.mock(
  '@screens/HomeScreen/components/Folder/components/NoteItem',
  () => 'NoteItem',
);
jest.mock('@root/src/components/Divider', () => 'Divider');

const folderData: FolderProps = {
  folder: {
    id: 1,
    folderName: 'Test Folder',
    notes: [
      {
        id: 1,
        title: 'Note 1',
        snippet: 'Snippet 1',
        modifiedDate: 1696896000000,
      },
      {
        id: 2,
        title: 'Note 2',
        snippet: 'Snippet 2',
        modifiedDate: 1696896000000,
      },
    ],
  },
};

describe('Folder', () => {
  it('renders the folder title correctly', () => {
    const { getByText } = render(<Folder folder={folderData.folder} />);

    expect(getByText('Test Folder')).toBeTruthy();
  });

  it('toggles the folder expansion when header is pressed', () => {
    const { getByText, queryByTestId } = render(
      <Folder folder={folderData.folder} />,
    );

    expect(queryByTestId('divider')).toBeTruthy();
    expect(queryByTestId('flat-list')).toBeNull();

    fireEvent.press(getByText('Test Folder'));

    expect(queryByTestId('divider')).toBeNull();
    expect(queryByTestId('flat-list')).toBeTruthy();
  });

  it('displays notes when the folder is expanded', () => {
    const { getByText, getByTestId } = render(
      <Folder folder={folderData.folder} />,
    );

    fireEvent.press(getByText('Test Folder'));

    const flatList = getByTestId('flat-list');
    expect(flatList).toBeTruthy();
    expect(flatList.props.data.length).toBe(2);

    expect(getByTestId('note-item-1')).toBeTruthy();
    expect(getByTestId('note-item-2')).toBeTruthy();
  });

  it('renders a divider when the folder is not expanded', () => {
    const { queryByTestId } = render(<Folder folder={folderData.folder} />);

    expect(queryByTestId('divider')).toBeTruthy();
  });
});
