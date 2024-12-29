import { useState, useCallback } from 'react'

import { FolderSelectionDialogProps } from './folder-selection-dialog'

interface DialogArgs {
  folderId: number | null
  noteTitle?: string
  newFolderName?: string
}

interface DialogOptions {
  allowTitleEdit?: boolean
}

export const useFolderSelectionDialog = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const [noteTitle, setNoteTitle] = useState<string | undefined>()
  const [newFolderName, setNewFolderName] = useState<string | undefined>()
  const [allowTitleEdit, setAllowTitleEdit] = useState(false)
  const [onConfirmHandler, setOnConfirmHandler] = useState<
    ((args: DialogArgs) => void) | null
  >(null)

  const showDialog = useCallback(
    (onConfirm: (args: DialogArgs) => void, options: DialogOptions = {}) => {
      setOnConfirmHandler(() => onConfirm)
      setAllowTitleEdit(!!options.allowTitleEdit)
      setIsDialogVisible(true)
    },
    [],
  )

  const hideDialog = useCallback(() => {
    setIsDialogVisible(false)
    setSelectedFolderId(null)
    setNoteTitle(undefined)
    setNewFolderName(undefined)
  }, [])

  const handleFolderSelect = useCallback(
    (folderId: number | null, folderName?: string) => {
      setSelectedFolderId(folderId)
      setNewFolderName(folderName)
    },
    [],
  )

  const handleConfirm = useCallback(() => {
    if (onConfirmHandler) {
      onConfirmHandler({
        folderId: selectedFolderId,
        noteTitle,
        newFolderName,
      })
    }
    hideDialog()
  }, [onConfirmHandler, selectedFolderId, noteTitle, newFolderName, hideDialog])

  const dialogProps: FolderSelectionDialogProps = {
    visible: isDialogVisible,
    selectedFolderId,
    allowTitleEdit,
    noteTitle,
    newFolderName,
    setNoteTitle,
    setNewFolderName,
    onFolderSelect: handleFolderSelect,
    onConfirm: handleConfirm,
    onCancel: hideDialog,
  }

  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    dialogProps,
  }
}
