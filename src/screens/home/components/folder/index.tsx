import React, { useState } from 'react'
import { FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Divider from '@components/divider'
import colors from '@theme/colors'

import {
  FolderContainer,
  FolderHeader,
  FolderTitle,
  MainContainer,
} from './styles'
import GradientBackground from './components/gradient-background'
import NoteItem from './components/note-item'
import { FolderProps } from './types'

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <FolderHeader onPress={() => setExpanded(!expanded)}>
        <FolderTitle>{folder.folderName}</FolderTitle>
        <Icon
          name={expanded ? 'angle-down' : 'angle-left'}
          style={!expanded ? { marginRight: 4 } : {}}
          size={20}
          color={colors.common.offWhite}
        />
      </FolderHeader>
      <MainContainer testID="folder-component">
        {expanded && folder.notes.length ? (
          <>
            <GradientBackground key={`${expanded}-${folder.notes.length}`} />
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

export default Folder
