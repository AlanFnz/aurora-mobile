import React from 'react'
import styled from 'styled-components/native'
import Folder from '../folder'
import { FlatList } from 'react-native'
import { Folder as FolderTypes } from '../folder/types'

interface FolderListProps {
  folders: FolderTypes[]
  testID?: string
}

const FolderList: React.FC<FolderListProps> = ({ folders, testID }) => {
  return (
    <FolderListContainer testID={testID}>
      <FlatList
        data={folders}
        keyExtractor={folder => folder.id.toString()}
        renderItem={({ item }) => <Folder folder={item} />}
      />
    </FolderListContainer>
  )
}

const FolderListContainer = styled.View`
  flex: 1;
  padding: 10px;
  width: 100%;
`

export default FolderList
