import styled from 'styled-components/native'

import colors from '@theme/colors'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 6%;
`

const FooterContainer = styled.View`
  text-align: center;
  margin-top: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.common.offWhite};
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lowOpacity.whiteMid,
  autoCapitalize: 'none',
})`
  height: 40px;
  color: ${colors.common.offWhite};
  background-color: ${colors.lowOpacity.whiteSuperLow};
  border-color: ${colors.lowOpacity.whiteLow};
  border-radius: 5px;
  border-width: 0.5px;
  margin-bottom: 12px;
  padding: 0 10px;
  width: 100%;
`

const SignInButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.lowOpacity.blackLow};
  margin-top: 18px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.lowOpacity.whiteLow};
  justify-content: center;
  align-items: center;
`

const SignInText = styled.Text`
  color: ${colors.common.offWhite};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`

const SignUpPromptText = styled.Text`
  color: ${colors.common.offWhite};
  font-size: 16px;
`

const SignUpPromptLink = styled.Text`
  color: ${colors.common.lightGray};
  font-size: 16px;
  font-weight: bold;
  padding-left: 8px;
`

const ErrorMessage = styled.Text`
  color: ${colors.feedback.negative};
  font-size: 14px;
  padding-bottom: 5px;
`

export {
  Container,
  FooterContainer,
  Title,
  Input,
  SignInButton,
  SignInText,
  SignUpPromptText,
  SignUpPromptLink,
  ErrorMessage,
}
