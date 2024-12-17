import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

import Folder from '../folder'
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
  padding: 10px 10px 0 10px;
  flex: 1;
  width: 100%;
`

export default FolderList
