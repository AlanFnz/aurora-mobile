import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 6%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #f6f6f6;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 18px;
  padding-vertical: 10px;
  border-radius: 2px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.3);
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
