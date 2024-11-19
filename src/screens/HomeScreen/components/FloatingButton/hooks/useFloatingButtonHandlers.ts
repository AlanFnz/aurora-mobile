import { useRef, useState } from 'react';
import { Animated } from 'react-native';

const pressAnimationDuration = 190;
const releaseAnimationDuration = 150;

interface UseFloatingButtonHandlersProps {
  onPress: () => void;
  onLongPress: () => void;
}

export const useFloatingButtonHandlers = ({
  onPress,
  onLongPress,
}: UseFloatingButtonHandlersProps) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const bottomPositionAnim = useRef(new Animated.Value(25)).current;
  const opacityAnim = useRef(new Animated.Value(0.9)).current;
  const heightAnim = useRef(new Animated.Value(50)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

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
      Animated.timing(bottomPositionAnim, {
        toValue: 25,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: -5,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 70,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
    ]).start();

    onLongPress();
  };

  const handlePressOut = () => {
    if (!isLongPressed) onPress();

    Animated.parallel([
      Animated.timing(bottomPositionAnim, {
        toValue: 25,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 50,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
    ]).start();

    setIsLongPressed(false);
  };

  const animatedStyles = {
    height: heightAnim,
    bottom: bottomPositionAnim,
    opacity: opacityAnim,
    transform: [{ translateY: translateYAnim }, { translateX: -35 }],
  };

  return {
    isLongPressed,
    animatedStyles,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  };
};
