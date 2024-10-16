import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FolderList from './components/FolderList';
import BackgroundLayers from '../../components/BackgroundLayers';
import styled from 'styled-components/native';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <BackgroundLayers testID={'background-layers'} />
      <Container testID={'container'} insets={insets}>
        <FolderList testID={'folder-list'} />
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
