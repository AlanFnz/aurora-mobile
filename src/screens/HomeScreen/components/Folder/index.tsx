import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
  FolderContainer,
  FolderHeader,
  FolderTitle,
  MainContainer,
  NoteItem,
  NoteText,
} from './styles';
import GradientBackground from './GradientBackground';

export type Note = {
  id: number;
  title: string;
};

export type Folder = {
  id: number;
  folderName: string;
  notes: Note[];
};

interface FolderProps {
  folder: Folder;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <MainContainer>
      <GradientBackground expanded={expanded} />
      <FolderContainer>
        <FolderHeader onPress={() => setExpanded(!expanded)}>
          <FolderTitle>{folder.folderName}</FolderTitle>
        </FolderHeader>

        {expanded && (
          <FlatList
            data={folder.notes}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <NoteItem>
                <NoteText>{item.title}</NoteText>
              </NoteItem>
            )}
          />
        )}
      </FolderContainer>
    </MainContainer>
  );
};

export default Folder;
