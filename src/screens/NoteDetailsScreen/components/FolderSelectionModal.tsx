import React from 'react';
import styled from 'styled-components/native';
import { Modal, TouchableOpacity } from 'react-native';
import { Folder } from '@store/foldersSlice';

interface FolderSelectionModalProps {
  visible: boolean;
  folders: Folder[];
  selectedFolderId: number | null;
  onFolderSelect: (folderId: number | null) => void;
  onConfirm: () => void;
  onClose: () => void;
}

const FolderSelectionModal: React.FC<FolderSelectionModalProps> = ({
  visible,
  folders,
  selectedFolderId,
  onFolderSelect,
  onConfirm,
  onClose,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <Overlay>
        <ModalContainer>
          <ModalTitle>Select a Folder</ModalTitle>
          <Dropdown>
            {folders.map(folder => (
              <DropdownItem
                key={folder.id}
                isSelected={selectedFolderId === folder.id}
                onPress={() => onFolderSelect(folder.id)}>
                <DropdownText>{folder.folderName}</DropdownText>
              </DropdownItem>
            ))}
            <DropdownItem
              onPress={() => console.log('Mock: Create New Folder')}>
              <NewFolderText>+ Create New Folder</NewFolderText>
            </DropdownItem>
          </Dropdown>
          <ConfirmButton onPress={onConfirm}>
            <ConfirmButtonText>Confirm</ConfirmButtonText>
          </ConfirmButton>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Dropdown = styled.View`
  margin-bottom: 15px;
`;

const DropdownItem = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  padding: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#e0e0e0' : 'white')};
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const DropdownText = styled.Text`
  font-size: 16px;
`;

const NewFolderText = styled(DropdownText)`
  color: blue;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
`;

const ConfirmButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export default FolderSelectionModal;
