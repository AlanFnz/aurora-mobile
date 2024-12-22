import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'react-native'

import { RootState } from '@store/index'
import colors from '@theme/colors'

import {
  ButtonContainer,
  ButtonGroup,
  ButtonText,
  DialogContainer,
  DialogTitle,
  Dropdown,
  DropdownItem,
  DropdownText,
  NewFolderText,
  Overlay,
  TitleInput,
  ValidationErrorText,
} from './folder-selection-dialog.styled'

interface FolderSelectionDialogProps {
  visible: boolean
  selectedFolderId: number | null
  allowTitleEdit: boolean
  noteTitle?: string
  setNoteTitle?: (title: string) => void
  onFolderSelect: (folderId: number | null) => void
  onConfirm: () => void
  onCancel: () => void
}

const FolderSelectionDialog: React.FC<FolderSelectionDialogProps> = ({
  visible,
  selectedFolderId,
  allowTitleEdit = false,
  noteTitle,
  setNoteTitle,
  onFolderSelect,
  onConfirm,
  onCancel,
}) => {
  const [validationError, setValidationError] = useState(false)
  const folders = useSelector((state: RootState) => state.folders)

  const handleConfirm = () => {
    if (!selectedFolderId) return setValidationError(true)
    setValidationError(false)
    onConfirm()
  }

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}>
      <Overlay>
        <DialogContainer>
          <DialogTitle>Select a Folder</DialogTitle>
          {allowTitleEdit && (
            <TitleInput
              placeholder="Enter note title"
              placeholderTextColor={colors.lowOpacity.blackMid}
              value={noteTitle}
              onChangeText={setNoteTitle}
            />
          )}
          <Dropdown>
            {folders.map(folder => (
              <DropdownItem
                key={folder.id}
                isSelected={selectedFolderId === folder.id}
                onPress={() => onFolderSelect(folder.id)}>
                <DropdownText isSelected={selectedFolderId === folder.id}>
                  {folder.folderName}
                </DropdownText>
              </DropdownItem>
            ))}
            <DropdownItem
              onPress={() => console.log('Mock: Create New Folder')}>
              <NewFolderText>+ Create New Folder</NewFolderText>
            </DropdownItem>
          </Dropdown>
          {validationError && (
            <ValidationErrorText>Please select a folder.</ValidationErrorText>
          )}
          <ButtonGroup>
            <ButtonContainer onPress={onCancel}>
              <ButtonText>Cancel</ButtonText>
            </ButtonContainer>
            <ButtonContainer onPress={handleConfirm}>
              <ButtonText>Confirm</ButtonText>
            </ButtonContainer>
          </ButtonGroup>
        </DialogContainer>
      </Overlay>
    </Modal>
  )
}

export default FolderSelectionDialog
