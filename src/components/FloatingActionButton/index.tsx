import colors from '@theme/colors';
import React, { useState } from 'react';
import styled from 'styled-components/native';

interface FloatingActionButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  icon: string;
  longPressIcon: string;
  testID?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  onLongPress,
  icon,
  longPressIcon,
  testID,
}) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [opacity, setOpacity] = useState(0.9);

  const handlePressIn = () => {
    setOpacity(0.2);
    setIsLongPressed(false);
  };

  const handleLongPress = () => {
    setOpacity(0.9);
    setIsLongPressed(true);
    onLongPress();
  };

  const handlePressOut = () => {
    setOpacity(0.9);
    setIsLongPressed(false);
  };

  return (
    <ButtonContainer
      onPress={onPress}
      onLongPress={handleLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      isLongPressed={isLongPressed}
      opacity={opacity}
      testID={testID}>
      <ButtonText isLongPressed={isLongPressed}>
        {isLongPressed ? longPressIcon : icon}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{
  isLongPressed: boolean;
  opacity: number;
}>`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-35px);
  background-color: ${({ isLongPressed }) =>
    isLongPressed ? colors.lowOpacity.whiteMid : colors.common.offWhite};
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
  opacity: ${({ opacity }) => opacity};
`;

const ButtonText = styled.Text<{ isLongPressed: boolean }>`
  font-size: 30px;
  color: ${({ isLongPressed }) =>
    isLongPressed ? colors.lowOpacity.redMid : colors.common.darkGray};
  font-weight: 500;
`;

export default FloatingActionButton;
