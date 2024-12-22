import React, { createContext, useContext, useState, ReactNode } from 'react'

import FolderSelectionModal from '@components/folder-selection-modal/folder-selection-modal'

interface ModalOptions {
  allowTitleEdit?: boolean
  confirmText?: string
}

interface ModalContextProps {
  isModalVisible: boolean
  modalType: ModalType | null
  options: ModalOptions | null
  selectedFolderId: number | null
  showModal: (
    type: ModalType,
    onConfirm: (folderId?: number, title?: string) => void,
    options?: ModalOptions,
  ) => void
  hideModal: () => void
  handleFolderSelect: (folderId: number | null) => void
}

const ModalContext = createContext<ModalContextProps | null>(null)

export enum ModalType {
  FolderSelection = 'folderSelection',
  Confirmation = 'confirmation',
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within ModalProvider')
  return context
}

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const [noteTitle, setNoteTitle] = useState<string | undefined>()
  const [options, setOptions] = useState<ModalOptions | null>(null)
  const [onConfirmHandler, setOnConfirmHandler] = useState<
    ((folderId?: number | null, title?: string) => void) | null
  >(null)

  const showModal = (
    type: ModalType,
    onConfirm: (folderId?: number, title?: string) => void,
    options: ModalOptions = {},
  ) => {
    setModalType(type)
    setOnConfirmHandler(() => onConfirm)
    setOptions(options)
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
    setModalType(null)
    setSelectedFolderId(null)
    setNoteTitle('')
    setOptions(null)
  }

  const handleFolderSelect = (folderId: number | null) =>
    setSelectedFolderId(folderId)

  const handleConfirm = () => {
    if (onConfirmHandler) onConfirmHandler(selectedFolderId, noteTitle)
    hideModal()
  }

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        modalType,
        options,
        selectedFolderId,
        showModal,
        hideModal,
        handleFolderSelect,
      }}>
      {children}
      {isModalVisible && modalType === ModalType.FolderSelection && (
        <FolderSelectionModal
          visible={isModalVisible}
          selectedFolderId={selectedFolderId}
          allowTitleEdit={!!options?.allowTitleEdit}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          onFolderSelect={handleFolderSelect}
          onConfirm={handleConfirm}
          onClose={hideModal}
        />
      )}
      {isModalVisible && modalType === ModalType.Confirmation && (
        <>{/* TODO: confirmation dialog */}</>
      )}
    </ModalContext.Provider>
  )
}
