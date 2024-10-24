import colors from '@theme/colors';
import React from 'react';
import styled from 'styled-components/native';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: string;
  testID?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  testID,
}) => {
  return (
    <ButtonContainer onPress={onPress} testID={testID}>
      <ButtonText>{icon}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: ${colors.common.offWhite};
  border-radius: 30px;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.common.black};
  shadow-offset: { width: 0, height: 2 };
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
`;

const ButtonText = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
`;

export default FloatingActionButton;
