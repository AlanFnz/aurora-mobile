import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { AppDispatch, RootState } from '@store/store'
import { fetchFolders } from '@services/folder'
import { setFolders } from '@store/slices'

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

  const allNotes = folders.flatMap(folder => folder.notes)
  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const folders = await fetchFolders()
        dispatch(setFolders(folders))
      } catch (error) {
        console.error('Failed to load folders:', error)
      }
    }

    loadFolders()
  }, [dispatch, folders.length])

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

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number }
}>`
  flex: 1;
  justify-content: center;
  padding-top: ${props => props.insets.top}px;
  padding-left: ${props => props.insets.left}px;
  padding-right: ${props => props.insets.right - 2}px;
`
