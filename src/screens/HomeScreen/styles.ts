import styled from 'styled-components/native';

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #e2dbd0;
  padding-top: ${props => props.insets.top}px;
  padding-left: ${props => props.insets.left}px;
  padding-right: ${props => props.insets.right}px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #1f1b24;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export { Container, Title };
