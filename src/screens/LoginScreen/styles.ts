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

const Input = styled.TextInput.attrs({
  placeholderTextColor: '#54565b',
  autoCapitalize: 'none',
})`
  height: 40px;
  background-color: #e2dbd0;
  border-color: #22262e;
  border-radius: 2px;
  border-width: 2px;
  margin-bottom: 12px;
  padding: 0 10px;
  width: 100%;
`;

const SignInButton = styled.TouchableOpacity`
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

const SignInText = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
`;

export { Container, Title, Input, SignInButton, SignInText };
