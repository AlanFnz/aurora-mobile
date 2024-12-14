import styled from 'styled-components/native'
import colors from '@theme/colors'
import { TouchableOpacity } from 'react-native'

const HeaderContainer = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number }
}>`
  height: 22px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`

const BackButton = styled(TouchableOpacity)``

const TitleContainer = styled.View`
  flex: 1;
`

const HeaderTitle = styled.Text`
  font-size: 18px;
  color: ${colors.common.offWhite};
  text-align: center;
`

export { HeaderContainer, BackButton, TitleContainer, HeaderTitle }
