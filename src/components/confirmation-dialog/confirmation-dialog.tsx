import React from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native'

import colors from '@theme/colors'

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
          <DialogTitle>{title}</DialogTitle>
          {message && <DialogMessage>{message}</DialogMessage>}
          <ButtonGroup>
            <CancelButton onPress={onCancel}>
              <ButtonText>{cancelText}</ButtonText>
            </CancelButton>
            <ConfirmButton onPress={onConfirm}>
              <ButtonText>{confirmText}</ButtonText>
            </ConfirmButton>
          </ButtonGroup>
        </DialogContainer>
      </Overlay>
    </Modal>
  )
}

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

const DialogContainer = styled.View`
  width: 80%;
  border-width: 0.5px;
  background-color: ${colors.lowOpacity.whiteSuperLow};
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 20px;
  border-radius: 10px;
`

const DialogTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${colors.common.offWhite};
  text-align: center;
`

const DialogMessage = styled.Text`
  font-size: 16px;
  color: ${colors.common.lightGray};
  margin-bottom: 20px;
  text-align: center;
`

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  margin-right: 10px;
  background-color: ${colors.lowOpacity.black};
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.common.primaryGray};
  justify-content: center;
  align-items: center;
`

const ConfirmButton = styled.TouchableOpacity`
  flex: 1;
  margin-left: 10px;
  background-color: ${colors.lowOpacity.black};
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.common.primaryGray};
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`

export default ConfirmationDialog
