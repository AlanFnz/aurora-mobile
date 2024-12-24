import styled from 'styled-components/native'

import colors from '@theme/colors'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 6%;
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

export { Container, Title, Input, SignInButton, SignInText }
