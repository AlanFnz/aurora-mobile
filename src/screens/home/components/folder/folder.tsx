import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Divider } from '@components/divider'
import colors from '@theme/colors'

import GradientBackground from './components/gradient-background'
import NoteItem from './components/note-item'
import {
  FolderContainer,
  FolderHeader,
  FolderTitle,
  MainContainer,
} from './folder.styled'
import { FolderProps } from './folder.types'

export const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <>
      <FolderHeader onPress={() => setExpanded(!isExpanded)}>
        <FolderTitle>{folder.folderName}</FolderTitle>
        <Icon
          name={isExpanded ? 'angle-down' : 'angle-left'}
          style={!isExpanded ? { marginRight: 4 } : {}}
          size={20}
          color={colors.common.offWhite}
        />
      </FolderHeader>
      <MainContainer testID="folder-component">
        {isExpanded && folder.notes.length ? (
          <>
            <GradientBackground key={`${isExpanded}-${folder.notes.length}`} />
            <FolderContainer>
              <FlatList
                data={folder.notes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                  <NoteItem
                    index={index}
                    item={item}
                    notesLength={folder.notes.length}
                    testID={`note-item-${item.id}`}
                  />
                )}
                testID="flat-list"
              />
            </FolderContainer>
          </>
        ) : (
          <Divider
            color={colors.common.offWhite}
            opacity={0.2}
            height={0.5}
            marginHorizontal={2}
            marginVertical={2}
            testID="divider"
          />
        )}
      </MainContainer>
    </>
  )
}
