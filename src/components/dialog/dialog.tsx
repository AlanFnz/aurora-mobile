import React from 'react'
import { Modal } from 'react-native'

import NoiseLayer from '@components/noise-layer'

import {
  BodyContainer,
  ButtonContainer,
  ButtonGroup,
  ButtonText,
  DialogContainer,
  DialogTitle,
  Overlay,
} from './dialog.styled'

export enum Emphasis {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export interface ButtonConfig {
  text: string
  onPress: () => void
  emphasis?: Emphasis
  warning?: boolean
}

interface DialogProps {
  visible: boolean
  title: string
  children?: React.ReactNode
  buttons: ButtonConfig[]
  onRequestClose: () => void
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  title,
  children,
  buttons,
  onRequestClose,
}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
      testID="Modal">
      <Overlay>
        <DialogContainer>
          <NoiseLayer opacity={0.15} customStyle={{ borderRadius: 10 }} />
          <BodyContainer>
            <DialogTitle>{title}</DialogTitle>
            {children}
            <ButtonGroup>
              {buttons.map((button, index) => (
                <ButtonContainer
                  key={index}
                  onPress={button.onPress}
                  emphasis={button.emphasis}
                  warning={button.warning}>
                  <ButtonText>{button.text}</ButtonText>
                </ButtonContainer>
              ))}
            </ButtonGroup>
          </BodyContainer>
        </DialogContainer>
      </Overlay>
    </Modal>
  )
}
