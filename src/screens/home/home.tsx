import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { Folder } from '@services/folder'
import { Note } from '@services/note'
import { useFetchFolders } from '@hooks/use-folders'
import { useToast } from '@hooks/use-toast'

import { BackgroundLayers } from '../../components/background-layers'
import { FolderList } from './components/folder-list'
import { SearchBox } from './components/search-box'
import { NotesResultsList } from './components/notes-results-list'
import { CreateNoteButton } from './components/create-note-button'
import { NoteListItem } from './components/folder/folder.types'

export const Home: React.FC = () => {
  const insets = useSafeAreaInsets()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: folders = [], isLoading, isError } = useFetchFolders()

  if (isError) {
    showToast({
      isSuccess: false,
      message: 'Failed to load folders.',
      additionalOffset: 70,
    })
  }

  const allNotes: Note[] = folders.flatMap(
    (folder: Folder) =>
      folder.notes.map((note: NoteListItem) => ({
        ...note,
        folderId: folder.id,
      })) as Note[],
  )
  const filteredNotes = allNotes
    .filter((note: Note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .map((note: Note) => ({
      ...note,
      snippet: note.content?.substring(0, 100) || '',
    }))

  return (
    <>
      <BackgroundLayers testID={'background-layers'} />
      <Container testID={'container'} insets={insets}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isLoading ? (
          <LoadingTextContainer>
            <LoadingText>Loading...</LoadingText>
          </LoadingTextContainer>
        ) : searchQuery ? (
          <NotesResultsList testID={'notes-results'} notes={filteredNotes} />
        ) : (
          <FolderList testID={'folder-list'} folders={folders} />
        )}
        <CreateNoteButton testID="new-note-button" />
      </Container>
    </>
  )
}

interface ContainerProps {
  insets: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

const Container = styled.View<ContainerProps>`
  flex: 1;
  justify-content: center;
  padding-top: ${(props: ContainerProps) => props.insets.top}px;
  padding-left: ${(props: ContainerProps) => props.insets.left}px;
  padding-right: ${(props: ContainerProps) => props.insets.right - 2}px;
`

const LoadingTextContainer = styled.View`
  flex: 1;
  padding: 10px;
  width: 100%;
`

const LoadingText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: white;
`
