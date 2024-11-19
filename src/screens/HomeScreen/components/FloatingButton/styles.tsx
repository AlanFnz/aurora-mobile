import React from 'react';
import { Animated } from 'react-native';
import { Svg, Circle, Line } from 'react-native-svg';
import styled from 'styled-components/native';
import colors from '@theme/colors';

const FullCircleIcon = ({ color }: { color: string }) => (
  <Svg height="24" width="24" viewBox="0 0 30 30">
    <Circle cx="15" cy="15" r="14" fill={color} />
  </Svg>
);
const PlusIcon = ({ color }: { color: string }) => (
  <Svg height="24" width="24" viewBox="0 0 30 30">
    <Line
      x1="15"
      y1="5"
      x2="15"
      y2="25"
      stroke={color}
      strokeWidth="3  "
      strokeLinecap="round"
    />
    <Line
      x1="5"
      y1="15"
      x2="25"
      y2="15"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Svg>
);

const AnimatedButtonContainer = styled(Animated.View)`
  position: absolute;
  left: 50%;
  transform: translateX(-35px);
  background-color: ${colors.common.offWhite};
  width: 70px;
  height: 50px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.lowOpacity.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
`;

export { FullCircleIcon, PlusIcon, AnimatedButtonContainer };
