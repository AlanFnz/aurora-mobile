import React, { createContext, useContext, useState, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import FolderSelectionModal from '@screens/note-details/components/folder-selection-modal'
import { RootState } from '@store/index'

interface FolderSelectionContextProps {
  isModalVisible: boolean
  selectedFolderId: number | null
  showModal: (
    onConfirm: (folderId: number, title?: string) => void,
    options?: { allowTitleEdit?: boolean },
  ) => void
  hideModal: () => void
  handleFolderSelect: (folderId: number | null) => void
}

const FolderSelectionContext =
  createContext<FolderSelectionContextProps | null>(null)

export const useFolderSelection = () => {
  const context = useContext(FolderSelectionContext)
  if (!context) {
    throw new Error(
      'useFolderSelection must be used within FolderSelectionProvider',
    )
  }
  return context
}

export const FolderSelectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const [allowTitleEdit, setAllowTitleEdit] = useState(false)
  const [noteTitle, setNoteTitle] = useState<string | undefined>()
  const [onConfirmHandler, setOnConfirmHandler] = useState<
    ((folderId: number, noteTitle?: string) => void) | null
  >(null)

  const folders = useSelector((state: RootState) => state.folders)

  const showModal = (
    onConfirm: (folderId: number, noteTitle?: string) => void,
    options: { allowTitleEdit?: boolean } = {},
  ) => {
    setOnConfirmHandler(() => onConfirm)
    setAllowTitleEdit(!!options.allowTitleEdit)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
    setSelectedFolderId(null)
    setNoteTitle('')
  }

  const handleFolderSelect = (folderId: number | null) =>
    setSelectedFolderId(folderId)

  const handleConfirm = () => {
    if (onConfirmHandler && selectedFolderId !== null) {
      onConfirmHandler(selectedFolderId, noteTitle)
    }
    hideModal()
  }

  return (
    <FolderSelectionContext.Provider
      value={{
        isModalVisible,
        selectedFolderId,
        showModal,
        hideModal,
        handleFolderSelect,
      }}>
      {children}
      {isModalVisible && (
        <FolderSelectionModal
          visible={isModalVisible}
          selectedFolderId={selectedFolderId}
          folders={folders}
          allowTitleEdit={allowTitleEdit}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          onFolderSelect={handleFolderSelect}
          onConfirm={handleConfirm}
          onClose={hideModal}
        />
      )}
    </FolderSelectionContext.Provider>
  )
}
