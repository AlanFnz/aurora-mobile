import { TextInput, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import colors from '@theme/colors'

const ListContainer = styled.View`
  border-width: 1px;
  border-radius: 5px;
  border-color: ${colors.lowOpacity.whiteLow};
  padding: 10px;
`

const TitleInput = styled(TextInput)`
  border-width: 1px;
  border-color: ${colors.lowOpacity.whiteLow};
  background-color: ${colors.lowOpacity.blackSuperLow};
  color: ${colors.common.offWhite};
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

const Divider = styled.View`
  height: 1px;
  background-color: ${colors.lowOpacity.whitePointOne};
  margin: 0 12%;
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

export {
  ListContainer,
  TitleInput,
  Dropdown,
  DropdownItem,
  DropdownText,
  Divider,
  NewFolderText,
  ValidationErrorText,
}
