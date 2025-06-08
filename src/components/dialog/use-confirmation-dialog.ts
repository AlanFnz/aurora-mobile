import { DialogOptions } from '@context/dialog'
import { useState } from 'react'

interface ConfirmationDialogProps {
  visible: boolean
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

export const useConfirmationDialog = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [dialogProps, setDialogProps] = useState<ConfirmationDialogProps>({
    visible: false,
    title: '',
    message: undefined,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: () => {},
    onCancel: () => hideDialog(),
  })

  const showDialog = (onConfirm: () => void, options: DialogOptions = {}) => {
    setDialogProps({
      ...dialogProps,
      visible: true,
      title: options.title || 'Are you sure?',
      message: options.message,
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      onConfirm: () => {
        onConfirm()
        hideDialog()
      },
    })
    setIsDialogVisible(true)
  }

  const hideDialog = () => {
    setIsDialogVisible(false)
    setDialogProps({ ...dialogProps, visible: false })
  }

  return { isDialogVisible, showDialog, hideDialog, dialogProps }
}
