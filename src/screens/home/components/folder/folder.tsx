import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
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

import { FolderSwipeActions } from './components/folder-swipe-actions'

export const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [isExpanded, setExpanded] = useState(false)

  const onEdit = () => {
    // handle edit action here
    console.log(`Edit folder`)
  }
  const onDelete = () => {
    // handle delete action here
    console.log(`Delete folder`)
  }

  return (
    <>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={(progress, dragX) => (
          <FolderSwipeActions
            dragX={dragX}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}>
        <FolderHeader onPress={() => setExpanded(!isExpanded)}>
          <FolderTitle>{folder.folderName}</FolderTitle>
          <Icon
            name={isExpanded ? 'angle-down' : 'angle-left'}
            style={!isExpanded ? { marginRight: 4 } : {}}
            size={20}
            color={colors.common.offWhite}
          />
        </FolderHeader>
      </Swipeable>
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
