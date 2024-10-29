import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import BackgroundLayers from '@root/src/components/BackgroundLayers';
import Header from '@root/src/components/Header';
import SaveButton from './components/SaveButton';
import { RootStackParamList } from '@navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useFetchNoteDetailsQuery,
  useUpdateNoteMutation,
} from '@store/queries/notes';
import {
  Container,
  StyledText,
  NoteTitleInput,
  TextArea,
  DateText,
  TitleContainer,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatTimestampToDateTime } from '@root/src/utils';

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

  const handleSave = async () => {
    if (note) {
      try {
        await updateNote({ id: note.id, title, content });
        showToast(true);
      } catch (error) {
        showToast(false);
      }
    }
  };

  const showToast = (isSuccess: boolean) => {
    Toast.show({
      type: isSuccess ? 'success' : 'error',
      text1: isSuccess ? 'Saved successfully!' : 'Something went wrong',
          position: 'bottom',
          bottomOffset: insets.bottom * 3,
          visibilityTime: 1750,
        });
  };

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setModifiedDate(formatTimestampToDateTime(note.modifiedDate));
      setContent(note.content || '');
    }
  }, [note]);

  if (isLoading) {
    return <StyledText>Loading...</StyledText>;
  }

  return (
    <>
      <BackgroundLayers />
      <Container insets={insets}>
        <Header rightColumnContent={<SaveButton handleSave={handleSave} />} />
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
      </Container>
    </>
  );
};

export default NoteDetailsScreen;
