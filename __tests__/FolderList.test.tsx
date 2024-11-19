import React from 'react';
import FolderList from '@screens/HomeScreen/components/FolderList';
import { render } from '@testing-library/react-native';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('FolderList', () => {
  const mockFolders = [
    { id: 1, folderName: 'Folder 1', notes: [] },
    { id: 2, folderName: 'Folder 2', notes: [] },
  ];

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockImplementation(callback =>
      callback({ folders: { folders: mockFolders } }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of folders', () => {
    const { getAllByTestId } = render(<FolderList folders={mockFolders} />);

    expect(getAllByTestId('folder-component').length).toBe(mockFolders.length);
  });

  it('renders no folders when the list is empty', () => {
    (useSelector as unknown as jest.Mock).mockImplementation(callback =>
      callback({ folders: { folders: [] } }),
    );

    const { queryByTestId } = render(<FolderList folders={[]} />);

    expect(queryByTestId('folder-component')).toBeNull();
  });
});
