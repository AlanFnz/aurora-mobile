import React, { createContext, useContext, ReactNode } from 'react'

import {
  useConfirmationDialog,
  ConfirmationDialog,
  FolderSelectionDialog,
  useFolderSelectionDialog,
} from '@components/dialog'

interface DialogContextProps {
  showDialog: (
    type: DialogType,
    onConfirm: (args: DialogArgs) => void,
    options?: DialogOptions,
  ) => void
  hideDialog: () => void
}

export enum DialogType {
  FolderSelection = 'folderSelection',
  Confirmation = 'confirmation',
}

interface DialogArgs {
  folderId?: number | null
  noteTitle?: string
  newFolderName?: string
}

export interface DialogOptions {
  allowTitleEdit?: boolean
  confirmText?: string
  cancelText?: string
  title?: string
  message?: string
}

const DialogContext = createContext<DialogContextProps | null>(null)

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('useDialog must be used within DialogProvider')
  return context
}

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isDialogVisible: isFolderSelectionDialogVisible,
    showDialog: showFolderSelectionDialog,
    hideDialog: hideFolderSelectionDialog,
    dialogProps: folderSelectionDialogProps,
  } = useFolderSelectionDialog()

  const {
    isDialogVisible: isConfirmationDialogVisible,
    showDialog: showConfirmationDialog,
    hideDialog: hideConfirmationDialog,
    dialogProps: confirmationDialogProps,
  } = useConfirmationDialog()

  const showDialog = (
    type: DialogType,
    onConfirm: ((args: DialogArgs) => void) | (() => void),
    options: DialogOptions = {},
  ) => {
    if (type === DialogType.FolderSelection) {
      showFolderSelectionDialog(
        onConfirm as (args: DialogArgs) => void,
        options,
      )
    } else if (type === DialogType.Confirmation) {
      showConfirmationDialog(() => (onConfirm as () => void)(), options)
    }
  }

  const hideDialog = () => {
    hideFolderSelectionDialog()
    hideConfirmationDialog()
  }

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        hideDialog,
      }}>
      {children}

      {isFolderSelectionDialogVisible && (
        <FolderSelectionDialog {...folderSelectionDialogProps} />
      )}

      {isConfirmationDialogVisible && (
        <ConfirmationDialog {...confirmationDialogProps} />
      )}
    </DialogContext.Provider>
  )
}
