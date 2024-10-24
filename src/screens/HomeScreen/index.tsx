import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FolderList from './components/FolderList';
import BackgroundLayers from '../../components/BackgroundLayers';
import styled from 'styled-components/native';
import SearchBox from './components/SearchBox';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import NotesResultsList from './components/NotesResultsList';
import FloatingActionButton from '@components/FloatingActionButton';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const folders = useSelector((state: RootState) => state.folders.folders);

  // TODO: notes searching will be handled by the backend
  const allNotes = folders.flatMap(folder => folder.notes);
  const filteredNotes = allNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleNewNote = () => console.log('New note button pressed');

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
        <FloatingActionButton
          onPress={handleNewNote}
          icon="+"
          testID="new-note-button"
        />
      </Container>
    </>
  );
};

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  justify-content: center;
  padding-top: ${props => props.insets.top}px;
  padding-left: ${props => props.insets.left}px;
  padding-right: ${props => props.insets.right}px;
`;

export default HomeScreen;
