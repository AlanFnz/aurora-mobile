import React from 'react'
import { Modal } from 'react-native'

import NoiseLayer from '@components/noise-layer'

import {
  BodyContainer,
  ButtonContainer,
  ButtonGroup,
  ButtonText,
  DialogContainer,
  DialogMessage,
  DialogTitle,
  Overlay,
} from './confirmation-dialog.styled'

interface ConfirmationDialogProps {
  visible: boolean
  title: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}>
      <Overlay>
        <DialogContainer>
          <NoiseLayer opacity={0.1} customStyle={{ borderRadius: 10 }} />
          <BodyContainer>
            <DialogTitle>{title}</DialogTitle>
            {message && <DialogMessage>{message}</DialogMessage>}
            <ButtonGroup>
              <ButtonContainer onPress={onCancel}>
                <ButtonText>{cancelText}</ButtonText>
              </ButtonContainer>
              <ButtonContainer onPress={onConfirm}>
                <ButtonText>{confirmText}</ButtonText>
              </ButtonContainer>
            </ButtonGroup>
          </BodyContainer>
        </DialogContainer>
      </Overlay>
    </Modal>
  )
}

export default ConfirmationDialog
