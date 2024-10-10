import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {
  FolderContainer,
  FolderHeader,
  FolderTitle,
  MainContainer,
} from './styles';
import { FolderProps } from './types';
import GradientBackground from './components/GradientBackground';
import Icon from 'react-native-vector-icons/FontAwesome';
import Divider from '@root/src/components/Divider';
import NoteItem from './components/NoteItem';

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <FolderHeader onPress={() => setExpanded(!expanded)}>
        <FolderTitle>{folder.folderName}</FolderTitle>
        <Icon
          name={expanded ? 'angle-down' : 'angle-left'}
          style={!expanded ? { marginRight: 4 } : {}}
          size={20}
          color="#f6f6f6"
        />
      </FolderHeader>
      <MainContainer>
        {expanded ? (
          <>
            <GradientBackground expanded={expanded} />
            <FolderContainer>
              <FlatList
                data={folder.notes}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                  <NoteItem
                    index={index}
                    item={item}
                    notesLength={folder.notes.length}
                  />
                )}
              />
            </FolderContainer>
          </>
        ) : (
          <Divider
            color="#e0e0e0"
            opacity={0.2}
            height={1}
            marginHorizontal={2}
            marginVertical={2}
          />
        )}
      </MainContainer>
    </>
  );
};

export default Folder;
