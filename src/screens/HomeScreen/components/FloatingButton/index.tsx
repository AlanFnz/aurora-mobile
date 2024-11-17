import React from 'react';
import colors from '@theme/colors';
import { TouchableWithoutFeedback } from 'react-native';
import { useFloatingButtonHandlers } from './hooks/useFloatingButtonHandlers';
import { AnimatedButtonContainer, FullCircleIcon, PlusIcon } from './styles';

interface FloatingButtonProps {
  onPress: () => void;
  onLongPress: () => void;
  testID?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  onLongPress,
  testID,
}) => {
  const {
    isLongPressed,
    animatedStyles,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  } = useFloatingButtonHandlers({ onPress, onLongPress });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}>
      <AnimatedButtonContainer style={animatedStyles} testID={testID}>
        {isLongPressed ? (
          <FullCircleIcon color={colors.lowOpacity.redMid} />
        ) : (
          <PlusIcon color={colors.common.darkGray} />
        )}
      </AnimatedButtonContainer>
    </TouchableWithoutFeedback>
  );
};

export default FloatingButton;
