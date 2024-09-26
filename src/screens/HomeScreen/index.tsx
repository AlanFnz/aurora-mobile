import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from './styles';
import FolderList from './components/FolderList';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Container insets={insets}>
      <FolderList />
    </Container>
  );
};

export default HomeScreen;
