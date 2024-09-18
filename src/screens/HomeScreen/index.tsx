import React from 'react';
import { Container } from './styles';
import { Title } from 'react-native-paper';
import FolderList from './components/FolderList';

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <FolderList />
    </Container>
  );
};

export default HomeScreen;
