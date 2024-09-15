import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #e2dbd0;
  padding: 0 6%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f1b24;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #22262e;
  margin-top: 18px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: #2e2b36;
  justify-content: center;
  align-items: center;
`;

const SignOutText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

export { Container, Title, SignOutButton, SignOutText };
