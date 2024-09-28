import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from './styles';
import FolderList from './components/FolderList';
import BackgroundLayers from '../../components/BackgroundLayers';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <BackgroundLayers />
      <Container insets={insets}>
        <FolderList />
      </Container>
    </>
  );
};

export default HomeScreen;
