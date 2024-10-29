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
  bottom: 25px;
  left: 50%;
  transform: translateX(-35px);
  background-color: ${colors.common.offWhite};
  border-radius: 25px;
  width: 70px;
  height: 50px;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.lowOpacity.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
  opacity: 0.9;
`;

const ButtonText = styled.Text`
  font-size: 30px;
  color: ${colors.common.darkGray};
  font-weight: 500;
`;

export default FloatingActionButton;
