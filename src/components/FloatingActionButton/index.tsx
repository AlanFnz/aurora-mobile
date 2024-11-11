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

  return (
    <ButtonContainer
      onPress={onPress}
      onLongPress={() => {
        setIsLongPressed(true);
        onLongPress();
      }}
      onPressOut={() => setIsLongPressed(false)}
      testID={testID}
      isLongPressed={isLongPressed}>
      <ButtonText isLongPressed={isLongPressed}>
        {isLongPressed ? longPressIcon : icon}
      </ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity<{ isLongPressed: boolean }>`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-35px);
  background-color: ${({ isLongPressed }) =>
    isLongPressed ? colors.common.darkGray : colors.common.offWhite};
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

const ButtonText = styled.Text<{ isLongPressed: boolean }>`
  font-size: 30px;
  color: ${({ isLongPressed }) =>
    isLongPressed ? colors.common.offWhite : colors.common.darkGray};
  font-weight: 500;
`;

export default FloatingActionButton;
