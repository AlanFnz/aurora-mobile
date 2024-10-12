import styled from 'styled-components/native';
import colors from '@theme/colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 6%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.common.offWhite};
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.lowOpacity.black};
  margin-top: 18px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: ${colors.common.primaryGray};
  justify-content: center;
  align-items: center;
`;

const SignOutText = styled.Text`
  color: ${colors.common.offWhite};
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

export { Container, Title, SignOutButton, SignOutText };
