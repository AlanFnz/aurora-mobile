import styled from 'styled-components/native';

const FolderContainer = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const FolderHeader = styled.TouchableOpacity`
  padding: 10px;
  background-color: #fafafa;
  border-radius: 5px;
`;

const FolderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const NoteItem = styled.View`
  margin-top: 5px;
  padding: 8px;
  background-color: #e0e0e0;
  border-radius: 3px;
`;

const NoteText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export { FolderContainer, FolderHeader, FolderTitle, NoteItem, NoteText };
