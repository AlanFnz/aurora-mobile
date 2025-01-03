import React from 'react'

import { Dialog, Emphasis } from './dialog'
import { DialogMessage } from './confirmation-dialog.styled'

interface ConfirmationDialogProps {
  visible: boolean
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      visible={visible}
      title={title}
      onRequestClose={onCancel}
      buttons={[
        { text: cancelText, onPress: onCancel },
        {
          text: confirmText,
          onPress: onConfirm,
          emphasis: Emphasis.POSITIVE,
          warning: true,
        },
      ]}>
      {message && <DialogMessage>{message}</DialogMessage>}
    </Dialog>
  )
}
