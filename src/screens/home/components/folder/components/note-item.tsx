import { useNavigation } from '@react-navigation/native'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import styled from 'styled-components/native'

import { Divider } from '@components/divider'
import { NoteDetailScreenNavigationProp } from '@navigation/types'
import { formatTimestampToDate } from '@root/src/utils'
import colors from '@theme/colors'

import { NoteListItem } from '../folder.types'
import { NoteSwipeActions } from './note-swipe-actions'

interface NoteProps {
  index: number
  notesLength: number
  item: NoteListItem
  testID?: string
}

const NoteItem: React.FC<NoteProps> = ({
  index,
  item,
  notesLength,
  testID = 'note-item-container',
}) => {
  const navigation = useNavigation<NoteDetailScreenNavigationProp>()

  const navigateToNoteDetail = () => {
    navigation.navigate('NoteDetails', { noteId: item.id })
  }

  const onDelete = (noteId: number) => {
    // handle delete action here
    console.log(`Delete note with ID: ${noteId}`)
  }

  return (
    <Swipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={(progress, dragX) => (
        <NoteSwipeActions dragX={dragX} onDelete={() => onDelete(item.id)} />
      )}>
      <NoteItemContainer
        onPress={navigateToNoteDetail}
        testID={testID}
        marginTop={notesLength > 1}>
        <NoteText>{`${item.title}${item.snippet && `: ${item.snippet}`}`}</NoteText>
        <DateText>{formatTimestampToDate(item.modifiedDate)}</DateText>
      </NoteItemContainer>
      {index < notesLength - 1 && (
        <Divider
          testID="divider"
          color={colors.common.offWhite}
          opacity={0.2}
          height={1}
          marginHorizontal={9}
        />
      )}
    </Swipeable>
  )
}

const NoteItemContainer = styled.TouchableOpacity<{ marginTop: boolean }>`
  margin-top: ${({ marginTop }: { marginTop: boolean }) =>
    marginTop ? '5px' : '0'};
  padding: 8px;
  border-radius: 3px;
`

const NoteText = styled.Text`
  font-size: 16px;
  color: ${colors.common.offWhite};
`

const DateText = styled.Text`
  font-size: 14px;
  color: ${colors.common.primaryGray};
  paddingtop: 8px;
`

export default NoteItem
