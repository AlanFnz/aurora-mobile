import styled from 'styled-components/native';

const MainContainer = styled.View`
  width: 95%;
  margin-left: 2.5%;
  border-radius: 12px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const FolderContainer = styled.View`
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const FolderHeader = styled.TouchableOpacity`
  padding: 0 10px;
  margin-bottom: 12px;
`;

const FolderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #f6f6f6;
`;

const NoteItem = styled.View`
  margin-top: 5px;
  padding: 8px;
  border-radius: 3px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`;

export {
  MainContainer,
  FolderContainer,
  FolderHeader,
  FolderTitle,
  NoteItem,
  NoteText,
};
