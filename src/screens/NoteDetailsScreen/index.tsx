import React, { useState, useEffect } from 'react';
import { RootStackParamList } from '@navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
} from '@store/queries/notes';
import {
  Button,
  ButtonText,
  Container,
  StyledText,
  NoteTitleInput,
  TextArea,
  DateText,
  TitleContainer,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatTimestampToDateTime } from '@root/src/utils';
import BackgroundLayers from '@root/src/components/BackgroundLayers';
import Header from '@root/src/components/Header';

type NoteDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'NoteDetails'
>;

const NoteDetailsScreen: React.FC<NoteDetailsScreenProps> = ({ route }) => {
  const { noteId } = route.params;
  const insets = useSafeAreaInsets();

  const { data: note, isLoading } = useFetchNoteDetailsQuery(noteId);
  const [updateNote] = useUpdateNoteMutation();

  const [title, setTitle] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setModifiedDate(formatTimestampToDateTime(note.modifiedDate));
      setContent(note.content || '');
    }
  }, [note]);

  const handleSave = async () => {
    if (note) {
      await updateNote({ id: note.id, title, content });
    }
  };

  if (isLoading) {
    return <StyledText>Loading...</StyledText>;
  }

  return (
    <>
      <BackgroundLayers />
      <Container insets={insets}>
        <Header />
        <TitleContainer>
          <NoteTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
          />
          <DateText>{modifiedDate}</DateText>
        </TitleContainer>

        <TextArea
          value={content}
          onChangeText={setContent}
          placeholder="Note Content"
          multiline={true}
        />

        <Button onPress={handleSave}>
          <ButtonText>Save Changes</ButtonText>
        </Button>
      </Container>
    </>
  );
};

export default NoteDetailsScreen;
