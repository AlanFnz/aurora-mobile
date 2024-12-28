import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@store/index'
import colors from '@theme/colors'

import { Dialog, Emphasis } from './dialog'
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownText,
  ListContainer,
  NewFolderText,
  TitleInput,
  ValidationErrorText,
} from './folder-selection-dialog.styled'

interface FolderSelectionDialogProps {
  visible: boolean
  selectedFolderId: number | null
  allowTitleEdit: boolean
  noteTitle?: string
  newFolderName?: string
  setNoteTitle?: (title: string) => void
  setNewFolderName?: (name: string) => void
  onFolderSelect: (folderId: number | null, newFolderName?: string) => void
  onConfirm: () => void
  onCancel: () => void
}

export const FolderSelectionDialog: React.FC<FolderSelectionDialogProps> = ({
  visible,
  selectedFolderId,
  allowTitleEdit = false,
  noteTitle,
  newFolderName,
  setNewFolderName,
  setNoteTitle,
  onFolderSelect,
  onConfirm,
  onCancel,
}) => {
  const [validationError, setValidationError] = useState(false)
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false)
  const folders = useSelector((state: RootState) => state.folders)

  const handleConfirm = () => {
    if (
      (!isCreatingNewFolder && !selectedFolderId) ||
      (isCreatingNewFolder && !newFolderName?.trim())
    )
      return setValidationError(true)

    setValidationError(false)
    onConfirm()
  }

  const handleCreateNewFolder = () => {
    if (!setNewFolderName) return
    setIsCreatingNewFolder(true)
    setValidationError(false)
    setNewFolderName('')
  }

  const handleSelectFolder = (folderId: number) => {
    setIsCreatingNewFolder(false)
    setValidationError(false)
    if (setNewFolderName) setNewFolderName('')
    onFolderSelect(folderId)
  }

  return (
    <Dialog
      visible={visible}
      title="Select a Folder"
      onRequestClose={onCancel}
      buttons={[
        { text: 'Cancel', onPress: onCancel },
        {
          text: 'Confirm',
          onPress: handleConfirm,
          emphasis: Emphasis.POSITIVE,
        },
      ]}>
      {allowTitleEdit && (
        <TitleInput
          placeholder="Enter note title"
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholderTextColor={colors.lowOpacity.whiteLow}
        />
      )}
      <Dropdown>
        <ListContainer>
          {folders.map((folder, index) => (
            <>
              <DropdownItem
                key={folder.id}
                isSelected={selectedFolderId === folder.id}
                onPress={() => handleSelectFolder(folder.id)}>
                <DropdownText isSelected={selectedFolderId === folder.id}>
                  {folder.folderName}
                </DropdownText>
              </DropdownItem>
              {index !== folders.length - 1 && <Divider />}
            </>
          ))}
          {isCreatingNewFolder && (
            <DropdownItem>
              <TitleInput
                autoFocus
                placeholder="Enter folder name"
                value={newFolderName}
                onChangeText={setNewFolderName}
                placeholderTextColor={colors.lowOpacity.whiteLow}
              />
            </DropdownItem>
          )}
        </ListContainer>
        {!isCreatingNewFolder && (
          <DropdownItem onPress={handleCreateNewFolder}>
            <NewFolderText>+ Create New Folder</NewFolderText>
          </DropdownItem>
        )}
      </Dropdown>
      {validationError && (
        <ValidationErrorText>
          {isCreatingNewFolder
            ? 'Please enter a folder name.'
            : 'Please select a folder.'}
        </ValidationErrorText>
      )}
    </Dialog>
  )
}
