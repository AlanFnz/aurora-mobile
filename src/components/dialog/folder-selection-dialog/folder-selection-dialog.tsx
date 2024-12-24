import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import { Dialog } from '../dialog'

import {
  Dropdown,
  DropdownItem,
  DropdownText,
  NewFolderText,
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

export const FolderSelectionDialog: React.FC<FolderSelectionDialogProps> = ({
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
    <Dialog
      visible={visible}
      title="Select a Folder"
      onRequestClose={onCancel}
      buttons={[
        { text: 'Cancel', onPress: onCancel },
        { text: 'Confirm', onPress: handleConfirm },
      ]}>
      {allowTitleEdit && (
        <TitleInput
          placeholder="Enter note title"
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
        <DropdownItem onPress={() => console.log('Mock: Create New Folder')}>
          <NewFolderText>+ Create New Folder</NewFolderText>
        </DropdownItem>
      </Dropdown>
      {validationError && (
        <ValidationErrorText>Please select a folder.</ValidationErrorText>
      )}
    </Dialog>
  )
}
