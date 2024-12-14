import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { NoteDetailScreenNavigationProp } from '@navigation/types'

import { NoteListItem } from '../folder/types'

interface NotesResultsListProps {
  notes: NoteListItem[]
  testID: string
}

const NotesResultsList: React.FC<NotesResultsListProps> = ({
  notes,
  testID,
}) => {
  const navigation = useNavigation<NoteDetailScreenNavigationProp>()
  const navigateToNoteDetail = (noteId: number) => {
    navigation.navigate('NoteDetails', { noteId })
  }

  return (
    <ResultsListContainer testID={testID}>
      <FlatList
        data={notes}
        keyExtractor={note => note.id.toString()}
        renderItem={({ item }) => (
          <NoteItem onPress={() => navigateToNoteDetail(item.id)}>
            <NoteText>{item.title}</NoteText>
          </NoteItem>
        )}
      />
    </ResultsListContainer>
  )
}

const ResultsListContainer = styled.View`
  flex: 1;
  padding: 10px;
  width: 100%;
`

const NoteItem = styled.TouchableOpacity`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`

export default NotesResultsList
