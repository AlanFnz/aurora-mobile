import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'

import { formatTimestampToDate } from '@root/src/utils'
import { NoteDetailScreenNavigationProp } from '@navigation/types'
import Divider from '@components/divider'
import colors from '@theme/colors'

import { NoteListItem } from '../types'

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

  return (
    <>
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
    </>
  )
}

const NoteItemContainer = styled.TouchableOpacity<{ marginTop: boolean }>`
  margin-top: ${({ marginTop }) => (marginTop ? '5px' : '0')};
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
