import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Toast from 'react-native-toast-message';
import BackgroundLayers from '@root/src/components/BackgroundLayers';
import Header from '@root/src/components/Header';
import SaveButton from './components/SaveButton';
import { Modal, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '@navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import {
  useCreateNoteMutation,
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { addNoteToFolder } from '@store/foldersSlice';

type NoteDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'NoteDetails'
>;

const NoteDetailsScreen: React.FC<NoteDetailsScreenProps> = ({ route }) => {
  const { noteId = 0, isNew } = route.params;
  const insets = useSafeAreaInsets();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const dispatch = useDispatch();

  const { data: note, isLoading } = useFetchNoteDetailsQuery(noteId, {
    skip: isNew,
  });

  const [updateNote] = useUpdateNoteMutation();
  const [createNote] = useCreateNoteMutation();

  const [title, setTitle] = useState('');
  const [modifiedDate, setModifiedDate] = useState('');
  const [content, setContent] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);

  const handleSave = async () => {
    if (isNew) {
      setIsModalVisible(true);
    } else if (note) {
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
    } else if (isNew) {
      setTitle('');
      setContent('');
      setModifiedDate('');
    }
  }, [note, isNew]);

  const handleFolderSelect = (folderId: number | null) => {
    setSelectedFolderId(folderId);
  };

  const handleConfirmFolderSelection = async () => {
    if (selectedFolderId) {
      setIsModalVisible(false);
      try {
        const createdNote = await createNote({
          title,
          content,
          folderId: selectedFolderId,
        }).unwrap();

        dispatch(
          addNoteToFolder({
            folderId: selectedFolderId,
            note: {
              id: createdNote.id,
              title: createdNote.title,
              snippet: createdNote.content
                ? createdNote.content.slice(0, 50)
                : '',
              modifiedDate: createdNote.modifiedDate,
            },
          }),
        );

        showToast(true);
      } catch (error) {
        showToast(false);
      }
    }
  };
  if (!isNew && isLoading) {
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

      {isModalVisible && (
        <Modal
          transparent
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <Overlay>
            <ModalContainer>
              <ModalTitle>Select a Folder</ModalTitle>
              <Dropdown>
                {folders.map(folder => (
                  <DropdownItem
                    key={folder.id}
                    isSelected={selectedFolderId === folder.id}
                    onPress={() => handleFolderSelect(folder.id)}>
                    <DropdownText>{folder.folderName}</DropdownText>
                  </DropdownItem>
                ))}
                <DropdownItem
                  onPress={() => console.log('Mock: Create New Folder')}>
                  <NewFolderText>+ Create New Folder</NewFolderText>
                </DropdownItem>
              </Dropdown>
              <ConfirmButton onPress={handleConfirmFolderSelection}>
                <ConfirmButtonText>Confirm</ConfirmButtonText>
              </ConfirmButton>
            </ModalContainer>
          </Overlay>
        </Modal>
      )}
    </>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Dropdown = styled.View`
  margin-bottom: 15px;
`;

const DropdownItem = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#e0e0e0' : 'white')};
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const DropdownText = styled.Text`
  font-size: 16px;
`;

const NewFolderText = styled(DropdownText)`
  color: blue;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
`;

const ConfirmButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default NoteDetailsScreen;
