import React from 'react';
import Divider from '@root/src/components/Divider';
import styled from 'styled-components/native';
import { NoteListItem } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NoteDetailScreenNavigationProp } from '@navigation/types';
import { formatTimestampToDate } from '@root/src/utils';

interface NoteProps {
  index: number;
  notesLength: number;
  item: NoteListItem;
}

const NoteItem: React.FC<NoteProps> = ({ index, item, notesLength }) => {
  const navigation = useNavigation<NoteDetailScreenNavigationProp>();

  const navigateToNoteDetail = () => {
    navigation.navigate('NoteDetail', { noteId: item.id });
  };

  return (
    <>
      <NoteItemContainer onPress={navigateToNoteDetail}>
        <NoteText>{`${item.title}${item.snippet && `: ${item.snippet}`}`}</NoteText>
        <DateText>{formatTimestampToDate(item.modifiedDate)}</DateText>
      </NoteItemContainer>
      {index < notesLength - 1 && (
        <Divider
          color="#e0e0e0"
          opacity={0.2}
          height={1}
          marginHorizontal={9}
        />
      )}
    </>
  );
};

const NoteItemContainer = styled.TouchableOpacity`
  margin-top: 5px;
  padding: 8px;
  border-radius: 3px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: #b9b9b9;
  paddingTop: 8px;
`;

export default NoteItem;
