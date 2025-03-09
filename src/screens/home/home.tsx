import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { AppDispatch, RootState } from '@store/store'
import { fetchFolders } from '@services/folder'
import { setFolders } from '@store/slices'
import { useToast } from '@hooks/use-toast'

import { BackgroundLayers } from '../../components/background-layers'
import { FolderList } from './components/folder-list'
import { SearchBox } from './components/search-box'
import { NotesResultsList } from './components/notes-results-list'
import { CreateNoteButton } from './components/create-note-button'

export const Home: React.FC = () => {
  const insets = useSafeAreaInsets()
  const dispatch = useDispatch<AppDispatch>()
  const folders = useSelector((state: RootState) => state.folders) || []
  const [searchQuery, setSearchQuery] = useState('')
  const { showToast } = useToast()

  const allNotes = folders.flatMap(folder => folder.notes)
  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // TODO: Replace with react query
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const folders = await fetchFolders()
        dispatch(setFolders(folders))
      } catch (error) {
        console.error('Failed to load folders:', error)
        dispatch(setFolders([]))
        showToast({
          isSuccess: false,
          message: 'Failed to load folders.',
          additionalOffset: 70,
        })
      }
    }

    loadFolders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BackgroundLayers testID={'background-layers'} />
      <Container testID={'container'} insets={insets}>
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {searchQuery ? (
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
