import { TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import colors from '@theme/colors'

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

const TitleInput = styled(TextInput)`
  border-width: 1px;
  border-color: ${colors.common.lightGray};
  background-color: ${colors.lowOpacity.whiteMid};
  color: ${colors.common.black};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
`

const Dropdown = styled.View`
  margin-bottom: 15px;
`

const DropdownItem = styled(TouchableOpacity)<{ isSelected?: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ isSelected }) =>
    isSelected ? colors.common.offWhite : 'transparent'};
`

const DropdownText = styled.Text<{ isSelected?: boolean }>`
  font-size: 16px;
  color: ${({ isSelected }) =>
    isSelected ? colors.common.black : colors.common.offWhite};
`

const NewFolderText = styled(DropdownText)`
  color: ${colors.common.lightGray};
`

const ValidationErrorText = styled.Text`
  color: ${colors.feedback.negative};
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
`

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
  margin-left: 10px;
  background-color: ${colors.lowOpacity.blackLow};
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

export {
  Overlay,
  DialogContainer,
  BodyContainer,
  DialogTitle,
  TitleInput,
  Dropdown,
  DropdownItem,
  DropdownText,
  NewFolderText,
  ValidationErrorText,
  ButtonGroup,
  ButtonContainer,
  ButtonText,
}
