import React, { useRef, useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import colors from '@theme/colors';

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

  const borderRadiusAnim = useRef(new Animated.Value(25)).current;
  const bottomPositionAnim = useRef(new Animated.Value(25)).current;
  const opacityAnim = useRef(new Animated.Value(0.9)).current;
  const heightAnim = useRef(new Animated.Value(50)).current;

  const handlePressIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 0.2,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handleLongPress = () => {
    setIsLongPressed(true);
    Animated.parallel([
      Animated.timing(borderRadiusAnim, {
        toValue: 35,
        duration: 190,
        useNativeDriver: false,
      }),
      Animated.timing(bottomPositionAnim, {
        toValue: 35,
        duration: 190,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: 190,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 70,
        duration: 190,
        useNativeDriver: false,
      }),
    ]).start();

    onLongPress();
  };

  const handlePressOut = () => {
    !isLongPressed && onPress();
    Animated.parallel([
      Animated.timing(borderRadiusAnim, {
        toValue: 25,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(bottomPositionAnim, {
        toValue: 25,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 50,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();

    setIsLongPressed(false);
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}>
      <AnimatedButtonContainer
        style={{
          height: heightAnim,
          borderRadius: borderRadiusAnim,
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

export default FloatingActionButton;
