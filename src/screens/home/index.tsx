import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import { RootState } from '@store/index'

import BackgroundLayers from '../../components/background-layers'
import FolderList from './components/folder-list'
import SearchBox from './components/search-box'
import NotesResultsList from './components/notes-results-list'
import FloatingButton from './components/floating-button'

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets()
  const folders = useSelector((state: RootState) => state.folders)
  const [searchQuery, setSearchQuery] = useState('')

  const allNotes = folders.flatMap(folder => folder.notes)
  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <FloatingButton testID="new-note-button" />
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

export default HomeScreen
