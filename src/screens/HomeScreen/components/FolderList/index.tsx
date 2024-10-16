import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import Folder from '../Folder';
import styled from 'styled-components/native';

interface FolderListProps {
  testID?: string;
}

const FolderList: React.FC<FolderListProps> = ({ testID }) => {
  const folders = useSelector((state: RootState) => state.folders.folders);

  return (
    <FolderListContainer testID={testID}>
      <FlatList
        data={folders}
        keyExtractor={folder => folder.id.toString()}
        renderItem={({ item }) => <Folder folder={item} />}
      />
    </FolderListContainer>
  );
};

const FolderListContainer = styled.View`
  flex: 1;
  padding: 10px;
  width: 100%;
`;

export default FolderList;
