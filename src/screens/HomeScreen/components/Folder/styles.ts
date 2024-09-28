import styled from 'styled-components/native';

const FolderContainer = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const FolderHeader = styled.TouchableOpacity`
  padding: 10px;
`;

const FolderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f6f6f6;
`;

const NoteItem = styled.View`
  margin-top: 5px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #f6f6f6;
`;

export { FolderContainer, FolderHeader, FolderTitle, NoteItem, NoteText };
