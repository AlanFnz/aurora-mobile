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
  HeaderContainer,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackgroundLayers from '@root/src/components/BackgroundLayers';
import { useNavigation } from '@react-navigation/native';
import { formatTimestampToDateTime } from '@root/src/utils';
import { View } from 'react-native';

type NoteDetailScreenProps = StackScreenProps<RootStackParamList, 'NoteDetail'>;

const NoteDetailScreen: React.FC<NoteDetailScreenProps> = ({ route }) => {
  const { noteId } = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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

  const handleReturn = async () => {
    navigation.goBack();
  };

  if (isLoading) {
    return <StyledText>Loading...</StyledText>;
  }

  return (
    <>
      <BackgroundLayers />
      <Container insets={insets}>
        <HeaderContainer>
          <NoteTitleInput
            value={title}
            onChangeText={setTitle}
            placeholder="Note Title"
          />
          <DateText>{modifiedDate}</DateText>
        </HeaderContainer>

        <TextArea
          value={content}
          onChangeText={setContent}
          placeholder="Note Content"
          multiline={true}
        />

        <Button onPress={handleSave}>
          <ButtonText>Save Changes</ButtonText>
        </Button>

        <Button onPress={handleReturn}>
          <ButtonText>Return</ButtonText>
        </Button>
      </Container>
    </>
  );
};

export default NoteDetailScreen;
