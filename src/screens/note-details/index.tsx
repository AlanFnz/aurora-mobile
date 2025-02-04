import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { RootStackParamList } from '@navigation/types'
import { BackgroundLayers } from '@components/background-layers'
import { Header } from '@components/header'

import HeaderButton from './components/header-button'
import { useNoteDetailsScreen } from './hooks/use-note-details-screen'
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

const NoteDetails: React.FC<NoteDetailsScreenProps> = ({ route }) => {
  const { noteId = 0, isNew } = route.params
  const insets = useSafeAreaInsets()

  const {
    title,
    modifiedDate,
    content,
    isLoading,
    setTitle,
    setContent,
    handleSave,
    handleDelete,
  } = useNoteDetailsScreen({ noteId, isNew })

  if (!isNew && isLoading) {
    return <StyledText>Loading...</StyledText>
  }

  return (
    <>
      <BackgroundLayers />
      <Container insets={insets}>
        <Header
          rightColumnContent={
            <>
              <HeaderButton
                containerStyle={{ marginRight: 12 }}
                onPress={handleDelete}
                iconName="trash-outline"
              />
              <HeaderButton onPress={handleSave} iconName="save-sharp" />
            </>
          }
        />
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
          multiline
        />
      </Container>
    </>
  )
}

export default NoteDetails
