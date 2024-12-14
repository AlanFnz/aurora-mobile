import React from 'react'
import { useSelector } from 'react-redux'
import { StackScreenProps } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParamList } from '@navigation/types'

import BackgroundLayers from '@components/background-layers'
import Header from '@components/header'
import { RootState } from '@store/index'
import FolderSelectionModal from './components/folder-selection-modal'
import SaveButton from './components/save-button'
import { useNoteDetails } from './hooks/use-note-details'
import {
  Container,
  DateText,
  NoteTitleInput,
  StyledText,
  TextArea,
  TitleContainer,
} from './styles'

type NoteDetailsScreenProps = StackScreenProps<
  RootStackParamList,
  'NoteDetails'
>

const NoteDetailsScreen: React.FC<NoteDetailsScreenProps> = ({ route }) => {
  const { noteId = 0, isNew } = route.params
  const insets = useSafeAreaInsets()
  const folders = useSelector((state: RootState) => state.folders)

  const {
    title,
    modifiedDate,
    content,
    selectedFolderId,
    isModalVisible,
    isLoading,
    setTitle,
    setContent,
    setIsModalVisible,
    handleSave,
    handleFolderSelect,
    handleConfirmFolderSelection,
  } = useNoteDetails({ noteId, isNew })

  if (!isNew && isLoading) {
    return <StyledText>Loading...</StyledText>
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

      <FolderSelectionModal
        visible={isModalVisible}
        folders={folders}
        selectedFolderId={selectedFolderId}
        onFolderSelect={handleFolderSelect}
        onConfirm={handleConfirmFolderSelection}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default NoteDetailsScreen
