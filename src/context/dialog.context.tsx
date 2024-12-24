import React, { createContext, useContext, useState, ReactNode } from 'react'

import { FolderSelectionDialog } from '@components/dialog/folder-selection-dialog'
import { ConfirmationDialog } from '@components/dialog/confirmation-dialog'

interface DialogOptions {
  allowTitleEdit?: boolean
  confirmText?: string
  cancelText?: string
  message?: string
}

interface DialogContextProps {
  isDialogVisible: boolean
  dialogType: DialogType | null
  options: DialogOptions | null
  selectedFolderId: number | null
  showDialog: (
    type: DialogType,
    onConfirm: (folderId?: number, title?: string) => void,
    options?: DialogOptions,
  ) => void
  hideDialog: () => void
  handleFolderSelect: (folderId: number | null) => void
}

const DialogContext = createContext<DialogContextProps | null>(null)

export enum DialogType {
  FolderSelection = 'folderSelection',
  Confirmation = 'confirmation',
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('useDialog must be used within DialogProvider')
  return context
}

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const [noteTitle, setNoteTitle] = useState<string | undefined>()
  const [options, setOptions] = useState<DialogOptions | null>(null)
  const [onConfirmHandler, setOnConfirmHandler] = useState<
    ((folderId?: number | null, title?: string) => void) | null
  >(null)

  const showDialog = (
    type: DialogType,
    onConfirm: (folderId?: number, title?: string) => void,
    options: DialogOptions = {},
  ) => {
    setDialogType(type)
    setOnConfirmHandler(() => onConfirm)
    setOptions(options)
    setIsDialogVisible(true)
  }

  const hideDialog = () => {
    setIsDialogVisible(false)
    setDialogType(null)
    setSelectedFolderId(null)
    setNoteTitle('')
    setOptions(null)
  }

  const handleFolderSelect = (folderId: number | null) =>
    setSelectedFolderId(folderId)

  const handleConfirm = () => {
    if (onConfirmHandler) onConfirmHandler(selectedFolderId, noteTitle)
    hideDialog()
  }

  return (
    <DialogContext.Provider
      value={{
        isDialogVisible,
        dialogType,
        options,
        selectedFolderId,
        showDialog,
        hideDialog,
        handleFolderSelect,
      }}>
      {children}
      {isDialogVisible && dialogType === DialogType.FolderSelection && (
        <FolderSelectionDialog
          visible={isDialogVisible}
          selectedFolderId={selectedFolderId}
          allowTitleEdit={!!options?.allowTitleEdit}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          onFolderSelect={handleFolderSelect}
          onConfirm={handleConfirm}
          onCancel={hideDialog}
        />
      )}
      {isDialogVisible && dialogType === DialogType.Confirmation && (
        <ConfirmationDialog
          visible={isDialogVisible}
          title={options?.confirmText || 'Confirm Action'}
          message={options?.message || ''}
          confirmText={options?.confirmText || 'Confirm'}
          cancelText={options?.cancelText || 'Cancel'}
          onConfirm={handleConfirm}
          onCancel={hideDialog}
        />
      )}
    </DialogContext.Provider>
  )
}
