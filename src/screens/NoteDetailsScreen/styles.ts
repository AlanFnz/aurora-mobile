import styled from 'styled-components/native';
import colors from '@theme/colors';

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  padding: 20px;
  padding-top: ${props => props.insets.top}px;
`;

const TitleContainer = styled.View`
  padding-bottom: 25px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${colors.common.offWhite};
`;

const NoteTitleInput = styled.TextInput.attrs({
  placeholderTextColor: colors.lowOpacity.whiteMid,
  autoCapitalize: 'none',
})`
  height: 40px;
  font-size: 22px;
  font-weight: bold;
  color: ${colors.common.offWhite};
  border-bottom-color: ${colors.lowOpacity.whiteLow};
  border-bottom-width: 1 px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${colors.common.primaryGray};
`;

const TextArea = styled.TextInput.attrs({
  placeholderTextColor: colors.lowOpacity.whiteMid,
  autoCapitalize: 'none',
})`
  height: '100%';
  color: ${colors.common.offWhite};
  border-bottom-color: ${colors.lowOpacity.whiteLow};
  border-bottom-width: 2px;
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  padding-bottom: 24px;
  margin-bottom: 20px;
  text-align-vertical: top;
  font-size: 16px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: ${colors.common.tertiaryGray};
`;

const ButtonText = styled.Text`
  color: ${colors.common.offWhite};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.lowOpacity.black};
  margin-bottom: 15px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.lowOpacity.whiteLow};
  justify-content: center;
  align-items: center;
`;

export {
  Container,
  TitleContainer,
  Label,
  NoteTitleInput,
  TextArea,
  DateText,
  StyledText,
  ButtonText,
  Button,
};
