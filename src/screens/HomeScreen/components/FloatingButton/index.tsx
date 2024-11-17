import React, { useRef, useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import colors from '@theme/colors';
import { useFloatingButtonHandlers } from './hooks/useFloatingButtonHandlers';

interface FloatingButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  icon: string;
  longPressIcon: string;
  testID?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  onLongPress,
  icon,
  longPressIcon,
  testID,
}) => {
  const {
    isLongPressed,
    bottomPositionAnim,
    opacityAnim,
    heightAnim,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  } = useFloatingButtonHandlers({ onPress, onLongPress });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}>
      <AnimatedButtonContainer
        style={{
          height: heightAnim,
          bottom: bottomPositionAnim,
          opacity: opacityAnim,
        }}
        testID={testID}>
        <ButtonText isLongPressed={isLongPressed}>
          {isLongPressed ? longPressIcon : icon}
        </ButtonText>
      </AnimatedButtonContainer>
    </TouchableWithoutFeedback>
  );
};

const AnimatedButtonContainer = styled(Animated.View)`
  position: absolute;
  left: 50%;
  transform: translateX(-35px);
  background-color: ${colors.common.offWhite};
  width: 70px;
  height: 50px;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.lowOpacity.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
`;

const ButtonText = styled.Text<{ isLongPressed: boolean }>`
  font-size: 30px;
  color: ${({ isLongPressed }) =>
    isLongPressed ? colors.lowOpacity.redMid : colors.common.darkGray};
  font-weight: 500;
`;

export default FloatingButton;
