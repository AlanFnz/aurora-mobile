import styled from 'styled-components/native';
import colors from '@theme/colors';
import { TouchableOpacity } from 'react-native';

const HeaderContainer = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  height: 22px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled(TouchableOpacity)``;

const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  color: ${colors.common.offWhite};
  text-align: center;
`;

export { HeaderContainer, BackButton, HeaderTitle };
