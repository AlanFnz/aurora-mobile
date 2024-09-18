import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import Folder from '../Folder';
import styled from 'styled-components/native';

const FolderList: React.FC = () => {
  const folders = useSelector((state: RootState) => state.folders.folders);

  return (
    <FolderListContainer>
      <FlatList
        data={folders}
        keyExtractor={folder => folder.id.toString()}
        renderItem={({ item }) => <Folder folder={item} />}
      />
    </FolderListContainer>
  );
};

const FolderListContainer = styled.View`
  width: 100%;
`;

export default FolderList;
