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
import Divider from '@root/src/components/Divider';

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
    <>
      <FolderHeader onPress={() => setExpanded(!expanded)}>
        <FolderTitle>{folder.folderName}</FolderTitle>
      </FolderHeader>
      <MainContainer>
        <GradientBackground expanded={expanded} />
        <FolderContainer>
          {expanded && (
            <FlatList
              data={folder.notes}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item, index }) => (
                <>
                  <NoteItem>
                    <NoteText>{item.title}</NoteText>
                  </NoteItem>
                  {index < folder.notes.length - 1 && (
                    <Divider
                      color="#e0e0e0"
                      opacity={0.2}
                      height={1}
                      marginHorizontal={9}
                    />
                  )}
                </>
              )}
            />
          )}
        </FolderContainer>
      </MainContainer>
    </>
  );
};

export default Folder;
