import styled from 'styled-components/native'

import colors from '@theme/colors'

import { Emphasis } from './dialog'

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`

const DialogContainer = styled.View`
  width: 80%;
  border-width: 0.5px;
  background-color: ${colors.lowOpacity.blackMid};
  border-color: ${colors.lowOpacity.whiteLow};
  border-radius: 10px;
`

const BodyContainer = styled.View`
  width: 100%;
  padding: 20px;
`

const DialogTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: ${colors.common.offWhite};
`

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const ButtonContainer = styled.TouchableOpacity<{
  emphasis?: Emphasis
  warning?: boolean
}>`
  flex: 1;
  margin-left: 10px;
  background-color: ${({ emphasis }) =>
    emphasis === Emphasis.POSITIVE
      ? colors.lowOpacity.whiteMid
      : colors.lowOpacity.whiteSuperLow};
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${({ warning }) =>
    warning ? colors.feedback.negative : colors.lowOpacity.blackLow};
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`

export {
  Overlay,
  DialogContainer,
  BodyContainer,
  DialogTitle,
  ButtonGroup,
  ButtonContainer,
  ButtonText,
}
