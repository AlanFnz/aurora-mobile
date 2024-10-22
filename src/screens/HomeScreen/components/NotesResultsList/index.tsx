import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { NoteListItem } from '../Folder/types';

interface NotesResultsListProps {
  notes: NoteListItem[];
  testID: string;
}

const NotesResultsList: React.FC<NotesResultsListProps> = ({
  notes,
  testID,
}) => {
  return (
    <ResultsListContainer testID={testID}>
      <FlatList
        data={notes}
        keyExtractor={note => note.id.toString()}
        renderItem={({ item }) => (
          <NoteItem>
            <NoteText>{item.title}</NoteText>
          </NoteItem>
        )}
      />
    </ResultsListContainer>
  );
};

const ResultsListContainer = styled.View`
  flex: 1;
  padding: 10px;
  width: 100%;
`;

const NoteItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`;

export default NotesResultsList;
